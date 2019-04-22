// used by scrape-processing

// Hacky pathing
var { BILL_STATUSES, IMPORTANT_ACTIONS, UNIMPORTANT_ACTIONS,
    LEG_NAME_CLEANING,
 } = require('../app/src/js/config.js')
var { 
    getUniqueActions, getUniqueStatuses, getUniqueCategories, getUniqueSubjects,
    getSecondReadingVotesForLawmaker,
    } = require('./functions.js')

var Data = require('./Data.js')

module.exports.test = () => console.log('dp loaded'),

// Data integrity tests
module.exports.runTests = (bills, votes, lawmakers) => {
    checkActionCategorization(bills)
    checkStatusCategorization(bills)
    // checkBillTypeCategorization(bills)
    checkVoterNamesMatch(votes, lawmakers)
}

// Server-side-processing
module.exports.processing = (bills, votes, lawmakers) => {
    const Processor = new Data(bills, votes, lawmakers)
    // functions here change underlying data
    // Long-term TODO: find a better way to structure this whole process
    voteProcessing(Processor, votes)
    lawmakerProcessing(Processor, lawmakers, votes)
    billProcessing(Processor, bills)
}

// PROCESSING
const voteProcessing = (Processor, votes) => {
    votes.forEach(vote => {
        // // cleaning vote names, inconsistent between floor/committee votes
        vote.votes.forEach(v => {
            if (v.voter_name in LEG_NAME_CLEANING) v.voter_name = LEG_NAME_CLEANING[v.voter_name]
        })
        
        vote.result = Processor.votePassed(vote) ? 'yes' : 'no'
        vote.gopCaucus = Processor.gopCaucusVote(vote)
        vote.demCaucus = Processor.demCaucusVote(vote)
    })
}
const lawmakerProcessing = (Processor, lawmakers, votes) => {
    lawmakers.forEach(lawmaker => {        
        const lawmakerVotes = getSecondReadingVotesForLawmaker(votes, lawmaker)
        // These need to be called after gopCaucus and demCaucus are added to votes
        lawmaker.percentVotesWithMajority = Processor.percentVotesWithMajority(lawmakerVotes, lawmaker)
        lawmaker.percentVotesWithGopCaucus = Processor.percentVotesWithGopCaucus(lawmakerVotes, lawmaker)
        lawmaker.percentVotesWithDemCaucus = Processor.percentVotesWithDemCaucus(lawmakerVotes, lawmaker)
    })
}
const billProcessing = (Processor, bills) => {
    // TK as necessary
}

// TESTS
const checkActionCategorization = (bills) => {
    const actions = getUniqueActions(bills)
    const uncategorized = actions
        .filter(action => !IMPORTANT_ACTIONS.map(d => d.key).includes(action))
        .filter(action => !UNIMPORTANT_ACTIONS.includes(action))
    if (uncategorized.length > 0) {
        console.log("Missing bill actions", uncategorized)
    } else {
        console.log("All bill actions categorized")
    }
}

const checkStatusCategorization = (bills) => {
    const statuses = getUniqueStatuses(bills)
    const uncategorized = statuses
        .filter(status => !BILL_STATUSES.map(d => d.key).includes(status))
    if (uncategorized.length > 0) {
        console.log("Missing bill statuses", uncategorized)
    } else {
        console.log("All bill statuses categorized")
    }
}

const checkBillTypeCategorization = (bills) => {
    const categories = getUniqueCategories(bills)
    const subjects = getUniqueSubjects(bills)
    console.log(categories)
    console.log(subjects)
    // TODO: Finish this
}

const checkVoterNamesMatch = (votes, lawmakers) => {
    
    const lawmakerNames = lawmakers.map(d => d.laws_vote_name)
    // console.log('lawmakerNames', lawmakerNames)
    let unmatchedVoteNames = votes.reduce((array, vote) => {
        const voterNames = vote.votes.map(d => d.voter_name)
        const unmatchedVoteNames = voterNames
            .filter(name => !lawmakerNames.includes(name))
        return unmatchedVoteNames.concat(array)
    }, [])
    unmatchedVoteNames = [...new Set(unmatchedVoteNames)]

    if (unmatchedVoteNames.length > 0) {
        console.log("Missing lawmaker vote names", unmatchedVoteNames)
    } else {
        console.log("All lawmaker vote names matched")
    }

}

// module.exports.test = 'xxx'