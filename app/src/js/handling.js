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
    return [... new Set(bill.actions.map(d => d.extras.committee))].filter(d => d != "")
  }

export const getSponsor = bill => bill.sponsorships.find(d => d.classification === 'primary').name

export const getVotes = billId => data.votes.filter(d => d.bill === billId)
    .sort((a,b) => new Date(a.start_date) - new Date(b.start_date))

export const getBillById = id => data.bills.find(d => d.identifier === id)

export const getBillsForCommittee = committee => {
    return data.bills.filter(bill => getCommittees(bill).includes(committee))
}

export const getBillsWithAction = action => {
    return data.bills.filter(bill => bill.actions.map(d => d.description).includes(action))
}

export const getBillsForLawmaker = lawmaker => {
    return data.bills.filter(bill => getSponsor(bill) === lawmaker)
}

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

export const getLastBillAction = bill => getImportantActions(bill).slice(-1)[0].description