
/* Run with
    node scrape-parsing.js
*/

const fs = require('fs')
const glob = require('glob')
const moment = require('moment')

// const { runTests, processing } = require('./data-processing.js')

const IN_PATH = './analysis/bills-2019.json'
const OUT_PATH = './analysis/bills-2019-cleaned.json'
const FILTERED_OUT_PATH = './analysis/filtered-bills-2019-cleaned.json'

// const GATSBY_APP_OUT_PATH = './app-gatsby/src/data/2019-legislature.json'
const GATSBY_APP_OUT_PATH_BILLS = './app-gatsby/src/data/2019-bills.json'
const GATSBY_APP_OUT_PATH_LAWMAKERS = './app-gatsby/src/data/2019-lawmakers.json'
const GATSBY_APP_OUT_PATH_VOTES = './app-gatsby/src/data/2019-votes.json'

// Utility functions
const getJson = (path) => JSON.parse(fs.readFileSync(path))

const writeJson = (path, data) => {
    fs.writeFile (path, JSON.stringify(data), function(err) {
        if (err) throw err;
        console.log('Written to', path);
        }
    );
}

function matchActionToVote(action, votes) {
    return votes
        .find(v => v.date === action.date && v.action === action.description) || null
        
}

function getChamber(action){
    const govActions = ['Vetoed by Governor','Returned with Governor\'s Proposed Amendments','Signed by Governor',]
    // edge case -- looks like error in scraper script
    if (action.description === '3rd Reading Passed as Amended by Senate') {
        return 'House'
    }
    if (govActions.includes(action.description)) return 'Governor'
    if (action.organization_id === '~{"classification": "upper"}') return 'Senate'
    if (action.organization_id === '~{"classification": "lower"}') return 'House'
    if (action.organization_id === '~{"classification": "legislature"}') return 'Staff'
    else console.log('Classify plz', action.organization_id, action.description)
}
const secondReadingActions = [
    '2nd Reading Passed',
    '2nd Reading Concurred',
    '2nd Reading Not Passed',
    '2nd Reading Not Concurred',
    '2nd Reading Concurred as Amended',
    '2nd Reading Passed as Amended', 
    '2nd Reading Not Passed as Amended',
    '2nd Reading Pass Motion Failed',
    '2nd Reading Concur Motion Failed',
    '2nd Reading Concur as Amended Motion Failed',
    '2nd Reading Senate Amendments Concurred',
    '2nd Reading House Amendments Concurred',
    '2nd Reading Pass as Amended Motion Failed',
    '2nd Reading Conference Committee Report Adopted',
    '2nd Reading Free Conference Committee Report Adopted',
    '2nd Reading Conference Committee Report Adopt Motion Failed',
    '2nd Reading Governor\'s Proposed Amendments Adopted',
    '2nd Reading Governor\'s Proposed Amendments Adopt Motion Failed',
    '2nd Reading Governor\'s Proposed Amendments Not Adopted',
]
function getVotesForLawmaker(votes, lawmaker){
    return votes
        .filter(vote => vote.action !== null) // filter to floor votes
        .filter(vote => secondReadingActions.includes(vote.action)) // filter to second reading votes
        .filter(d => d.votes.find(e => e.name === lawmaker.laws_vote_name) !== undefined) // filter to votes with lawmaker
        // return only necessary info to keep file size low
        .map(vote => ({
            action: vote.action,
            motion: vote.motion,
            billId: vote.billId,
            date: vote.date,
            identifier: vote.identifier,
            counts: vote.counts,
            lawmaker: {
                name: lawmaker.name,
                vote: getLawmakerVote(vote, lawmaker),
            },
            source: vote.source,
        }))
}

const testForVeto = bill => bill.actions.find(d => d.description === 'Vetoed by Governor') !== undefined

// TODO: Add test to make sure this works on any bill w/ veto
const getVetoMemoUrl = (bill) => {
    const billDigits = bill.identifier.slice(3,)
    const billDigitsPadded = "0000".substring(0, "0000".length - billDigits.length) + billDigits
    const type = bill.identifier.slice(0,2)
    return `https://leg.mt.gov/bills/2019/AmdHtm${type[0]}/${type}${billDigitsPadded}GovVeto.pdf`
}

const getLawmakerVote = (vote, lawmaker) => {
    if (!vote.votes) console.log('xx', vote)
    return vote.votes.find(d => d.name === lawmaker.laws_vote_name).option
}

function main(){
    console.log('Reading', IN_PATH)

    const raw = getJson(IN_PATH)

    const votes = raw.votes.map(vote => {
        const bill = raw.bills.find(b => b._id === vote.bill)
        return {
            billId: vote.bill,
            identifier: bill.identifier,
            billTitle: bill.title,
            
            date: vote.start_date,
            motion: vote.motion_text,
            action: vote.bill_action,
            votes: vote.votes.map(v => ({
                name: v.voter_name,
                option: v.option,
            })),
            counts: vote.counts,
            caucusCounts: {
                gop: vote.gopCaucus,
                dem: vote.demCaucus,
            },
            source: vote.sources[0].url,
        }
    })
    const bills = raw.bills.map(d => {
        // console.log(d)
        const billVotes = votes.filter(v => v.billId === d._id)
        const billSponsorName = d.sponsorships.find(s => s.classification === 'primary').name
        const billSponsor = raw.lawmakers.find(l => l.name === billSponsorName)
        const vetoMemoUrl = testForVeto(d) ? getVetoMemoUrl(d) : null
        return {
            id: d._id,
            session: d.legislative_session,
            identifier: d.identifier,
            title: d.title,
            subjects: d.subject,
            actions: d.actions.map(a => ({
                    date: a.date,
                    description: a.description,
                    chamber: getChamber(a),
                    committee: a.extras.committee || getChamber(a),
                    vote: matchActionToVote(a, billVotes)
                })
            ),
            // votes: billVotes,
            sponsor: billSponsorName,
            sponsorParty: billSponsor.party,
            requestor: d.extras.requester,
            source: d.sources[0].url,
            textUrl: d.versions[0].links[0].url,
            textType: d.versions[0].note.toLowerCase(),
            vetoMemoUrl: vetoMemoUrl,
            status: d.extras.status,
        }
    })
    const lawmakers = raw.lawmakers.map(d => {
        const sponsoredBills = bills.filter(b => b.sponsor === d.name)
        return {
            laws_vote_name: d.laws_vote_name,
            name: d.name,
            chamber: d.chamber,
            city: d.city,
            district: d.district,
            district_num: d.distric_num,
            district_acres: +(String(d.district_acres).replace(',','')),
            party: d.party,
            percentVotesWithDemCaucus: d.percentVotesWithDemCaucus,
            percentVotesWithGopCaucus: d.percentVotesWithGopCaucus,
            percentVotesWithMajority: d.percentVotesWithMajority,
            // votes: getVotesForLawmaker(votes, d), // crashes gatsby develop
            // sponsoredBills: sponsoredBills,
            numSponsoredBills: sponsoredBills.length,
            
        }
        
    })

    writeJson(OUT_PATH, {
        date: raw.updateDate,
        bills: bills,
        lawmakers: lawmakers,
    })

    writeJson(GATSBY_APP_OUT_PATH_BILLS, {
        updateDate: raw.updateDate,
        bills: bills,
    })
    writeJson(GATSBY_APP_OUT_PATH_LAWMAKERS, {
        updateDate: raw.updateDate,
        lawmakers: lawmakers,
    })
    writeJson(GATSBY_APP_OUT_PATH_VOTES, {
        updateDate: raw.updateDate,
        votes: votes,
    })

    const incBills = ["HB 658", "HB 661", "HB 694", "SB 338", "HB 652", "HB 318", "HB 575", "HB 302", "SB 217", "HB 332", "HB 290", "HB 553", "HB 159", "HB 21", "HB 175", "HB 293", "SB 266", "HB 2", "HB 219", "SB 331"]
    writeJson(FILTERED_OUT_PATH, {
        bills: bills.filter(b => incBills.includes(b.identifier)),
    })
}
  
main()