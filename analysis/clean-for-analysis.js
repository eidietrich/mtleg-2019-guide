
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
    if (govActions.includes(action.description)) return 'Governor'
    if (action.organization_id === '~{"classification": "upper"}') return 'Senate'
    if (action.organization_id === '~{"classification": "lower"}') return 'House'
    if (action.organization_id === '~{"classification": "legislature"}') return 'Staff'
    else console.log('Classify plz', action.organization_id, action.description)
}

function main(){
    console.log('Reading', IN_PATH)

    const raw = getJson(IN_PATH)
    const votes = raw.votes.map(vote => {
        return {
            billId: vote.bill,
            date: vote.start_date,
            motion: vote.motion_text,
            action: vote.bill_action,
            votes: vote.votes.map(v => ({
                name: v.voter_name,
                option: v.option,
            })),
            counts: vote.counts,
            source: vote.sources[0].url,
        }
    })
    const bills = raw.bills.map(d => {
        // console.log(d)
        billVotes = votes.filter(v => v.billId === d._id)
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
            sponsor: d.sponsorships.find(s => s.classification === 'primary').name,
            requestor: d.extras.requester,
            source: d.sources[0].url,
            status: d.extras.status,
        }
    })
    const lawmakers = raw.lawmakers
    // const votes = raw.votes

    // console.log(raw.bills[1].identifier, raw.bills[1].actions)
    // console.log(bills[100].actions)
    

    // console.log(bills)

    writeJson(OUT_PATH, {
        date: raw.date,
        bills: bills,
        lawmakers: lawmakers,
    })

    const incBills = ["HB 658", "HB 661", "HB 694", "SB 338", "HB 652", "HB 318", "HB 575", "HB 302", "SB 217", "HB 332", "HB 290", "HB 553", "HB 159", "HB 21", "HB 175", "HB 293", "SB 266", "HB 2", "HB 219", "SB 331"]
    writeJson(FILTERED_OUT_PATH, {
        bills: bills.filter(b => incBills.includes(b.identifier)),
    })
}
  
main()