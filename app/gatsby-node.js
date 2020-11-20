/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

// const source = require('./src/data/2019-legislature.json')

const {updateDate, bills} = require('./src/data/2019-bills.json')
const {lawmakers} =require('./src/data/2019-lawmakers.json')
const {votes} = require('./src/data/2019-votes.json')

const getBillURLId = bill => (bill.identifier.substring(0,2) + bill.identifier.substring(3,)).toLowerCase()
const getLawmakerUrlName = (lawmaker) => lawmaker.name.replace(/\s/g, '-').toLowerCase()

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
const getLawmakerVote = (vote, lawmaker) => {
    return vote.votes.find(d => d.name === lawmaker.laws_vote_name).option
}
function getVotesForLawmaker(votes, lawmaker){
    return votes
        .filter(vote => vote.action !== null) // filter to floor votes
        .filter(vote => secondReadingActions.includes(vote.action)) // filter to second reading votes
        .filter(d => d.votes.find(e => e.name === lawmaker.laws_vote_name) !== undefined) // filter to votes with lawmaker
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

exports.createPages = async({ actions: { createPage } }) => {

    // bills pages
    bills.forEach(bill => {
        createPage({
            path: `/bill/${getBillURLId(bill)}`,
            component: require.resolve('./src/templates/single-bill-page.js'),
            context: { bill },
        })
    })

    // lawmaker pages
    lawmakers.forEach(lawmaker => {
        createPage({
            path: `/lawmaker/${getLawmakerUrlName(lawmaker)}`,
            component: require.resolve('./src/templates/single-lawmaker-page.js'),
            context: {
                lawmaker,
                bills: bills.filter(bill => bill.sponsor === lawmaker.name),
                // votes: getVotesForLawmaker(votes, lawmaker), // crashes build process
            },
        })
    })
}
