// globals


// functions
const getUniqueActions = (bills) => {
    return [... new Set(bills.reduce((list, bill) => bill.actions.map(d => d.description).concat(list), []))].sort()
} 
const getUniqueStatuses = (bills) => {
    return [... new Set(bills.map(d => d.extras.status))].sort()
}
const getUniqueCategories = (bills) => {
    return [... new Set(bills.map(d => d.extras['category:']))].sort()
}
const getUniqueSubjects = (bills) => {
    return [... new Set(bills.reduce((list, bill) => bill.subject.concat(list), []))].sort()
}

const getSecondReadingVotesForLawmaker = (votes, lawmaker) => {
    return getSecondReadingVotes(votes)
        .filter(d => d.votes.filter(e => e.voter_name === lawmaker.laws_vote_name).length > 0)
}

const getSecondReadingVotes = (votes) => {
    const include = ['2nd Reading Passed','2nd Reading Concurred', '2nd Reading Not Passed',
    '2nd Reading Not Concurred', '2nd Reading Passed as Amended', '2nd Reading Pass Motion Failed',
    '2nd Reading Concur Motion Failed',
    ]
    return votes
        .filter(vote => vote.bill_action !== null) // floor votes
        .filter(vote => include.includes(vote.bill_action)) // 2nd reading votes
}

const getVotesForBill = (bill, votes) => {
    return votes.filter(d => d.bill === bill._id)
}

module.exports = {
    getUniqueActions, getUniqueStatuses, getUniqueCategories, getUniqueSubjects,
    getSecondReadingVotesForLawmaker, getSecondReadingVotes, getVotesForBill
}