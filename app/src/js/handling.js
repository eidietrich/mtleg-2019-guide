/*

Definitions for data management functions

TODO: Go through here and make sure terminology is constand

- bill: bill object
- billId: bill id string
- lawmaker: lawmaker name (NB: Votes and sponsor names are different forms out of scrape)
- action: action type

*/

// import data from './../data/scrape-2019-02-23.json'
import bills from './../data/scrape-2019-02-23-bills.json'
import votes from './../data/scrape-2019-02-23-votes.json'
import lawmakers from './../data/leg-roster.json'
import { IMPORTANT_ACTIONS, UNIMPORTANT_ACTIONS, BILL_STATUSES } from './config'

export const getCommittees = (bill) => {
    return [... new Set(bill.actions.map(d => d.extras.committee))].filter(d => d !== "")
  }

export const getSponsor = bill => bill.sponsorships.find(d => d.classification === 'primary').name

// export const getVotes = billId => votes.filter(d => d.bill === billId)
//     .sort((a,b) => new Date(a.start_date) - new Date(b.start_date))

export const getBillById = id => bills.find(d => d.identifier === id)
export const getBillByScrapeId = id => bills.find(d => d._id === id)

export const getBillByURLId = urlid => {
    // urlID is condensed, e.g. 'hb3','sb94'
    const letters = urlid.substring(0,2).toUpperCase()
    const digits = urlid.substring(2,)
    const id = `${letters} ${digits}`
    return getBillById(id)
}
export const getBillURLId = bill => bill.identifier.substring(0,2) + bill.identifier.substring(3,)

// BILL HANDLING

export const getBillsSample = () => bills.slice(50,150)

export const getAllBills = () => bills

export const getBillsForCommittee = committee => {
    return bills.filter(bill => getCommittees(bill).includes(committee))
}

export const getBillsWithAction = action => {
    return bills.filter(bill => bill.actions.map(d => d.description).includes(action))
}

export const getBillsForLawmaker = lawmaker => {
    return bills.filter(bill => getSponsor(bill) === lawmaker.name)
}
export const getBillSponsor = bill => {
    const sponsorName = bill.sponsorships.find(d => d.classification === 'primary').name
    const sponsor = getLawmakerByName(sponsorName)
    return sponsor
}
export const getBillLawsUrl = bill => bill.sources[0].url

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

export const getBillStatus = bill => {
    const lastAction = IMPORTANT_ACTIONS.find(d => d.key === getLastBillAction(bill))
    if (!lastAction) console.log('No match for ' + getLastBillAction(bill))
    const status = BILL_STATUSES.find(d => d.key === lastAction.status)
    if (!status) console.log('No match for ' + lastAction.status)
    return status
}

// LAWMAKER HANDLING

// only returns lawmakers who have sponsored bills, names only too
export const getAllLawmakers = () => {
    // TODO: hook up more sophisticated date to this,
    // set this up so it runs once at initializatio (or do preprocessing)
    // Currently just names
    // const names = [...new Set(bills.map(bill => getSponsor(bill)).flat())]
    // return names.map(name => ({name: name}))
    return lawmakers
}
export const sortBySponsorshipCounts = (a,b) => getBillsForLawmaker(b).length - getBillsForLawmaker(a).length
export const sortByDistrict = (a,b) => +a.district.slice(3,) - +b.district.slice(3,)


export const getLawmakerByName = (name) => lawmakers.find(d => d.name === name) 
export const getLawmakerByDistrict = (district) => {
    const clean = (s) => s.replace(/\s/g, '').toUpperCase()
    return lawmakers.find(d => clean(d.district) === clean(district))
}

export const getLawmakerUrlName = (lawmaker) => lawmaker.name.replace(/\s/g, '')
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
    // by inspection, it looks like "bill_action" field is null for committee votes
    // note that votes to table aren't recorded in LAWS at all 
    return votes.filter(vote => vote.bill_action !== null)
        .sort(sortVoteByBillAndDate)
}
export const getBillVotes = (bill) => votes.filter(v => v.bill === bill._id)


export const getMajorFloorVotes = () => {
    // exclude procedural things
    const exclude = ['3rd Reading Passed','3rd Reading Concurred']
    return getFloorVotes().filter(vote => !exclude.includes(vote.bill_action))
}

export const getSecondReadingVotes = () => {
    const include = ['2nd Reading Passed','2nd Reading Concurred', '2nd Reading Not Passed',
    '2nd Reading Not Concurred', '2nd Reading Passed as Amended', ]
    return getFloorVotes().filter(vote => include.includes(vote.bill_action))
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
export const getVoteBill = (vote) => getBillByScrapeId(vote.bill)
export const getVoteAbsentExcused = (vote) => vote.counts.find(d => ['excused','absent'].includes(d.option)).value
export const votePassed = (vote) => (getVoteYesCount(vote) > getVoteNoCount(vote))
export const voteCountText = (vote) => {
    return `${getVoteYesCount(vote)}-${getVoteNoCount(vote)}`
}


export const getSecondReadingVotesForLawmaker = (lawmaker) => {
    return getSecondReadingVotes()
        .filter(d => d.votes.filter(e => e.voter_name === lawmaker.laws_vote_name).length > 0)
}

export const getLawmakerVote = (vote, lawmaker) => {
    return vote.votes.find(d => d.voter_name === lawmaker.laws_vote_name).option
}

const gopLeaders =  ["Tschida, Brad", "Thomas, Fred"]
export const gopLeadershipVote = (vote) => vote.votes.find(d => gopLeaders.includes(d.voter_name)).option
export const voteWithGOPLeader = (vote, lawmaker) => {
    // only works for floor votes
    const lawmakerVote = getLawmakerVote(vote, lawmaker)
    const gop = gopLeadershipVote(vote)
    if (lawmakerVote === 'excused' || lawmakerVote === 'absent') return 'yes'
    if (gop === 'excused' || lawmakerVote === 'absent') return 'n/a'
    return (lawmakerVote === gop) ? 'yes' : 'no'
}
const demLeaders = ["Schreiner, Casey", "Sesso, Jon"]
export const demLeadershipVote = (vote) => vote.votes.find(d => demLeaders.includes(d.voter_name)).option
export const voteWithDemLeader = (vote, lawmaker) => {
    // only works for floor votes
    const lawmakerVote = getLawmakerVote(vote, lawmaker)
    const demLeadershipVote = demLeadershipVote(vote)
    if (lawmakerVote === 'excused' || lawmakerVote === 'absent') return 'yes'
    if (demLeadershipVote === 'excused' || lawmakerVote === 'absent') return 'n/a'
    return (lawmakerVote === demLeadershipVote) ? 'yes' : 'no'
}

export const gopCaucusVote = (vote) => {
    const gopNames = gopCaucus().map(d => d.laws_vote_name)
    const caucusVotes = vote.votes.filter(v => gopNames.includes(v.voter_name))
    const ayes = caucusVotes.filter(v => v.option === 'yes').length
    const nays = caucusVotes.filter(v => v.option === 'no').length
    const absent = caucusVotes.filter(v => ['absent','excused'].includes(v.option)).length
    return {
        yes: ayes,
        no: nays,
        absent: absent,
        caucus: (ayes > nays) ? 'yes' : 'no',
    }
}
export const demCaucusVote = (vote) => {
    const demNames = demCaucus().map(d => d.laws_vote_name)
    const caucusVotes = vote.votes.filter(v => demNames.includes(v.voter_name))
    const ayes = caucusVotes.filter(v => v.option === 'yes').length
    const nays = caucusVotes.filter(v => v.option === 'no').length
    const absent = caucusVotes.filter(v => ['absent','excused'].includes(v.option)).length
    return {
        yes: ayes,
        no: nays,
        absent: absent,
        caucus: (ayes > nays) ? 'yes' : 'no',
    }
}

// export const getLawmakerVote = (vote, name) => {
//     const laws_vote_name = lawmakers.find(d => d.name === name).laws_vote_name
// }