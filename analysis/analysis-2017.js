
/* Run with
    node scrape-parsing.js
*/

const fs = require('fs')
const glob = require('glob')
const moment = require('moment')

const { runTests, processing } = require('./../processing/data-processing.js')

const { getVotesForBill } = require('./../processing/functions.js')

// const includeVotes = ['2nd Reading Passed','2nd Reading Concurred', '2nd Reading Not Passed',
//     '2nd Reading Not Concurred', '2nd Reading Concurred as Amended', '2nd Reading Passed as Amended', '2nd Reading Not Passed as Amended',
//     '2nd Reading Pass Motion Failed', '2nd Reading Concur Motion Failed',
// ]
const includeVotes = ['2nd Reading Passed', '2nd Reading Passed as Amended']

// Utility functions
const getJson = (path) => JSON.parse(fs.readFileSync(path))

const writeJson = (path, data) => {
    fs.writeFile (path, JSON.stringify(data), function(err) {
        if (err) throw err;
        console.log('Written to', path);
        }
    );
}

let bothCount = 0
let neitherCount = 0
let demCount = 0
let gopCount = 0

function classifyVote(vote){
    // console.log('vote', vote.bill_action)
    // console.log('gop', vote.gopCaucus.caucus)
    // console.log('dem', vote.gopCaucus.caucus)

    let voteClass = 'ERR'
    if (vote.gopCaucus.caucus == 'yes' && vote.demCaucus.caucus == 'yes') {
        voteClass = 'both'
        bothCount++
    }
    else if (vote.gopCaucus.caucus == 'no' && vote.demCaucus.caucus == 'no') {
        voteClass = 'neither'
        neitherCount++
    }
    else if (vote.gopCaucus.caucus == 'no' && vote.demCaucus.caucus == 'yes') {
        voteClass = 'only dem'
        demCount++
    }
    else if (vote.gopCaucus.caucus == 'yes' && vote.demCaucus.caucus == 'no') {
        voteClass = 'only GOP'
        gopCount++
    } else {
        console.log(`${vote.bill_action}: ${voteClass} ${vote.gopCaucus.yes}-${vote.gopCaucus.no}R/${vote.demCaucus.yes}-${vote.demCaucus.no}D`)
    }

    // console.log(`${vote.bill_action}: ${voteClass} ${vote.gopCaucus.yes}-${vote.gopCaucus.no}R/${vote.demCaucus.yes}-${vote.demCaucus.no}D`)
}

function main(){

    const file = './../app/src/data/mtleg-2017.json'
    console.log('loading', file)
    const data = getJson(file)

    console.log('## 2017 ##')

    const bills = data.bills
    const lawmakers = data.lawmakers
    const votes = data.votes

    console.log('Bills', bills.length)
    console.log('Votes', votes.length)
    console.log('Lawmakers', lawmakers.length)

    // console.log('bill', bills[0])
    // console.log('votes for bill', getVotesForBill(bills[10], votes).length)
    // console.log('vote', votes[0])

    console.log('## Number of bills passed in 2017')
    const filtered = bills
        // .filter(d => d.identifier.slice(0,2) == 'HB') // house bills only
        .filter(d => d.extras.status == 'Became Law') // passed only
    console.log('2017 bills', bills.length)
    console.log('2017 Passed', filtered.length)

    console.log('## Number of bills passed with bipartisan majorities')
    // votes.forEach(vote => {

    // })
    filtered.forEach(bill => {
        // console.log('\n#', bill.identifier, bill.title)
        bill.votes = getVotesForBill(bill, votes)
            .filter(d => includeVotes.includes(d.bill_action))
        // use last vote
        
        bill.votes.slice(-1).forEach(vote => {
            classifyVote(vote)
        })
    })
    console.log('passed with both', bothCount)
    console.log('passed with GOP', gopCount)
    console.log('passed with Dem', demCount)
    console.log('passed with neither', neitherCount)
    
    // console.log(bills[10])



    console.log('## Number of votes with bipartisan support')



}
  
main()