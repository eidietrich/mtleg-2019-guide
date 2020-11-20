/*

Definitions for data management functions

*/

// import {updateDate, bills, votes, lawmakers} from './../data/2019-legislature.json'
import {updateDate, bills} from './../data/2019-bills.json'
import {votes} from './../data/2019-votes.json'
import {lawmakers} from './../data/2019-lawmakers.json'

import { IMPORTANT_ACTIONS, UNIMPORTANT_ACTIONS, BILL_STATUSES } from './config'

import {format, timeFormat, timeParse} from 'd3'

export const percentFormat = format('.0%')
export const apStyleDate = timeFormat('%b %-d, %Y')
export const dateFormat = timeFormat('%-m/%-d/%y')
export const parseDate = timeParse('%Y-%m-%d')


export const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1)
export const getUpdateDate = () => apStyleDate(parseDate(updateDate))
export const getCommittees = (bill) => {
    return [...new Set(bill.actions.map(d => d.extras.committee))].filter(d => d !== "")
  }

// export const getSponsor = bill => bill.sponsorships.find(d => d.classification === 'primary').name
export const getSponsor = bill => bill.sponsor

// export const getVotes = billId => votes.filter(d => d.bill === billId)
//     .sort((a,b) => new Date(a.start_date) - new Date(b.start_date))

// export const getBillById = id => bills.find(d => d.identifier === id)
export const getBillByScrapeId = id => bills.find(d => d.id === id)

// export const getBillByURLId = urlid => {
//     // urlID is condensed, e.g. 'hb3','sb94'
//     const letters = urlid.substring(0,2).toLowerCase()
//     const digits = urlid.substring(2,)
//     const id = `${letters} ${digits}`
//     return getBillById(id)
// }
export const getBillURLId = bill => bill.identifier.substring(0,2).toLowerCase() + bill.identifier.substring(3,)

// BILL HANDLING

// export const getBillsSample = () => bills.slice(50,150)

// export const getAllBills = () => bills

// export const getBillsForCommittee = committee => {
//     return bills.filter(bill => getCommittees(bill).includes(committee))
// }

// export const getBillsWithAction = action => {
//     return bills.filter(bill => bill.actions.map(d => d.description).includes(action))
// }

export const getBillsForLawmaker = lawmaker => {
    return bills.filter(bill => getSponsor(bill) === lawmaker.name)
}
export const getBillSponsor = bill => {
    const sponsorName = bill.sponsor
    const sponsor = getLawmakerByName(sponsorName)
    return sponsor
}
export const getBillLawsUrl = bill => bill.source
export const getBillTextType = bill => bill.textType
export const getBillTextUrl = bill => bill.textUrl

export const sortByBillNumber = (a,b) => {
    // console.log('a',a)
    const aType = a.identifier.slice(0,2)
    const bType = b.identifier.slice(0,2)
    const aNum = +a.identifier.slice(3,)
    const bNum = +b.identifier.slice(3,)
    if (aType !== bType) return aType.localeCompare(bType)
    else return aNum - bNum
}

// ACTION HANDLING

export const getImportantActions = bill => {
    return bill.actions.filter(d => !UNIMPORTANT_ACTIONS.includes(d.description))
}

export const getActionColor = action => {
    const match = IMPORTANT_ACTIONS.find(d => d.key === action.description)
    const color = match ? match.color : '#fff'
    return color
}

export const getActionGlyph = action => {
    const match = IMPORTANT_ACTIONS.find(d => d.key === action.description)
    const glyph = match ? match.glyph : '[]'
    return glyph
}

export const getLastBillAction = bill => getImportantActions(bill).slice(-1)[0].description

export const getBillStatus = bill => {
    const statusKey = bill.status
    const status = BILL_STATUSES.find(d => d.key === statusKey)
    return status
}

// LAWMAKER HANDLING

export const getAllLawmakers = () => lawmakers
export const getSenateLawmakers = () => lawmakers.filter(l => l.chamber === 'senate')
export const getHouseLawmakers = () => lawmakers.filter(l => l.chamber === 'house')
export const sortBySponsorshipCounts = (a,b) => getBillsForLawmaker(b).length - getBillsForLawmaker(a).length

export const sortByDistrict = (a,b) => +a.district.slice(3,) - +b.district.slice(3,)
export const sortByLawmakerName = (a,b) => a.laws_vote_name.localeCompare(b.laws_vote_name)
export const sortByLawmakerValue = (key) => {
    return (a,b) => a[key] - b[key]
}

export const getLawmakerByName = (name) => lawmakers.find(d => d.name === name) 
export const getLawmakerByDistrict = (district) => {
    const clean = (s) => s.replace(/\s/g, '').toUpperCase()
    return lawmakers.find(d => clean(d.district) === clean(district))
}

export const getLawmakerUrlName = (lawmaker) => lawmaker.name.replace(/\s/g, '-').toLowerCase()
export const getLawmakerByURLName = (urlName) => {
    // const lawmakers = getAllLawmakers()
    const lawmaker = lawmakers.find(d => getLawmakerUrlName(d) === urlName)
    return lawmaker
}
export const getLawmakerByVoteName = (voteName) => {
    const match = lawmakers.find(d => d.laws_vote_name === voteName) 
    if (!match) console.log('getLawmakerByVoteName, No match for ' + voteName)
    return match
}
export const lawmakerTitle = (lawmaker) => {
    if (lawmaker.chamber === 'house') return 'Rep.'
    if (lawmaker.chamber === 'senate') return 'Sen.'
}
export const gopCaucus = () => lawmakers.filter(d => d.party === 'R')
export const demCaucus = () => lawmakers.filter(d => d.party === 'D')

// VOTES HANDLING

export const getAllVotes = () => votes.sort(sortVoteByBillAndDate)
export const getFloorVotes = () => {
    // console.log(votes)
    // by inspection, it looks like "action" field is null for committee votes
    // note that votes to table aren't recorded in LAWS at all 
    return votes.filter(vote => vote.action !== null)
        .sort(sortVoteByBillAndDate)
}
export const getBillVotes = (bill) => bill.actions.filter(d => d.vote).map(d => d.vote)

export const getVoteLawsUrl = (vote) => vote.source

export const getMajorFloorVotes = () => {
    // exclude procedural things
    const exclude = ['3rd Reading Passed','3rd Reading Concurred']
    return getFloorVotes().filter(vote => !exclude.includes(vote.action))
}

export const getSecondReadingVotes = () => {
    const include = [
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
    return getFloorVotes().filter(vote => include.includes(vote.action))
}

export const filterToLastBillVote = (d,i, array) => {
    if (i === 0) return true
    return array[i-1].identifier !== d.identifier
}
    
export const sortVoteByBillAndDate = (a,b) => {
    
    const aBill = getVoteBill(a)
    const bBill = getVoteBill(b)
    if (aBill.identifier === bBill.identifier) return new Date(a.start_date) - new Date(b.start_date)
    else return sortByBillNumber(aBill, bBill)
}
export const sortVoteByMargin = (a,b) => {
    const aMargin = getVoteYesCount(a) - getVoteNoCount(a)
    const bMargin = getVoteYesCount(b) - getVoteNoCount(b)
    return aMargin - bMargin
}
// export const getYesVotes = (vote) => vote.votes.filter(d => d.option === 'yes')
// export const getNoVotes = (vote) => vote.votes.filter(d => d.option === 'no')
export const filterVotes = (vote, option, party) => {
    if (!party) return vote.votes.filter(d => d.option === option)
    return vote.votes.filter(d => d.option === option && getLawmakerByVoteName(d.voter_name).party === party)   
}
export const getAbsentExcusedVotes = (vote) => vote.votes.filter(d => ['excused','absent'].includes(d.option))
// TODO: Change these to counts
export const getVoteYesCount = (vote) => vote.counts.find(d => d.option === 'yes').value
export const getVoteNoCount = (vote) => vote.counts.find(d => d.option === 'no').value
export const getVoteBill = (vote) => getBillByScrapeId(vote.billId)
export const getVoteAbsentExcused = (vote) => vote.counts.find(d => ['excused','absent'].includes(d.option)).value
export const votePassed = (vote) => (getVoteYesCount(vote) > getVoteNoCount(vote))
export const voteCountText = (vote) => {
    return `${getVoteYesCount(vote)}-${getVoteNoCount(vote)}`
}


export const getSecondReadingVotesForLawmaker = (lawmaker) => {
    return getSecondReadingVotes()
        .filter(d => d.votes.filter(e => e.name === lawmaker.laws_vote_name).length > 0)
}

export const getLawmakerVote = (vote, lawmaker) => {
    return vote.votes.find(d => d.name === lawmaker.laws_vote_name).option
}

export const gopCaucusVote = (vote) => vote.caucusCounts.gop
export const demCaucusVote = (vote) => vote.caucusCounts.dem