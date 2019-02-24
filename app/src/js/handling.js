/*

Definitions for data management functions

TODO: Go through here and make sure terminology is constand

- bill: bill object
- billId: bill id string
- lawmaker: lawmaker name (NB: Votes and sponsor names are different forms out of scrape)
- action: action type

*/

import data from './../data/scrape-2019-02-21.json'
import { IMPORTANT_ACTIONS, UNIMPORTANT_ACTIONS } from './config'

export const getCommittees = (bill) => {
    return [... new Set(bill.actions.map(d => d.extras.committee))].filter(d => d !== "")
  }

export const getSponsor = bill => bill.sponsorships.find(d => d.classification === 'primary').name

export const getVotes = billId => data.votes.filter(d => d.bill === billId)
    .sort((a,b) => new Date(a.start_date) - new Date(b.start_date))

export const getBillById = id => data.bills.find(d => d.identifier === id)
export const getBillByScrapeId = id => data.bills.find(d => d._id === id)

export const getBillByURLId = urlid => {
    // urlID is condensed, e.g. 'hb3','sb94'
    const letters = urlid.substring(0,2).toUpperCase()
    const digits = urlid.substring(2,)
    const id = `${letters} ${digits}`
    return getBillById(id)
}
export const getBillURLId = bill => bill.identifier.substring(0,2) + bill.identifier.substring(3,)

// BILL HANDLING

export const getBillsSample = () => data.bills.slice(50,150)

export const getAllBills = () => data.bills

export const getBillsForCommittee = committee => {
    return data.bills.filter(bill => getCommittees(bill).includes(committee))
}

export const getBillsWithAction = action => {
    return data.bills.filter(bill => bill.actions.map(d => d.description).includes(action))
}

export const getBillsForLawmaker = lawmaker => {
    return data.bills.filter(bill => getSponsor(bill) === lawmaker.name)
}

export const sortByBillNumber = (a,b) => {
    const aType = a.identifier.slice(0,2)
    const bType = b.identifier.slice(0,2)
    const aNum = +a.identifier.slice(3,)
    const bNum = +b.identifier.slice(3,)
    if (aType !== bType) return aType.localeCompare(bType)
    else return aNum - bNum
}

// ACTION HANDLING

// export const getLastCommitteeAction = bill => {
//     const actions = bill.actions
//       .filter(action => action.extras.committee === selCommittee)
//       .reverse()
//       .sort((a,b) => new Date(b.date) - new Date(a.date))
//     return actions[0]
// }

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

// LAWMAKER HANDLING

// only returns lawmakers who have sponsored bills, names only too
export const getAllLawmakers = () => {
    // TODO: hook up more sophisticated date to this,
    // set this up so it runs once at initializatio (or do preprocessing)
    // Currently just names
    const names = [...new Set(data.bills.map(bill => getSponsor(bill)).flat())]
    return names.map(name => ({name: name}))
} 
export const getLawmakerUrlName = (lawmaker) => lawmaker.name.replace(/\s/g, '')
export const getLawmakerByURLName = (urlName) => {
    const lawmakers = getAllLawmakers()
    const lawmaker = lawmakers.find(d => getLawmakerUrlName(d) === urlName)
    return lawmaker
}

// VOTES HANDLING

export const getAllVotes = () => data.votes.sort(sortVoteByBillAndDate)
export const getFloorVotes = () => {
    // by inspection, it looks like "bill_action" field is null for committee votes
    // note that votes to table aren't recorded in LAWS at all 
    return data.votes.filter(vote => vote.bill_action !== null)
        .sort(sortVoteByBillAndDate)
}
    

export const sortVoteByBillAndDate = (a,b) => {
    const aBill = getVoteBill(a)
    const bBill = getVoteBill(b)
    if (aBill.identifier === bBill.identifier) return new Date(a.start_date) - new Date(b.start_date)
    else return sortByBillNumber(aBill, bBill)
}

export const getVoteAyes = (vote) => vote.counts.find(d => d.option === 'yes').value
export const getVoteNays = (vote) => vote.counts.find(d => d.option === 'no').value
export const getVoteBill = (vote) => getBillByScrapeId(vote.bill)
export const getVoteAbsentExcused = (vote) => vote.counts.find(d => ['excused','absent'].includes(d.option)).value