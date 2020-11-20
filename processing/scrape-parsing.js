
/* Run with
    node scrape-parsing.js
*/

const fs = require('fs')
const glob = require('glob')
const moment = require('moment')

const { runTests, processing } = require('./data-processing.js')

const GLOB_BILLS = "./_data/mt/bill_*.json"
const GLOB_VOTES = "./_data/mt/vote_event_*.json"
const ROSTER_PATH = './data-static/leg-roster-2019.json'

const OUT_PATH_APP = './app/src/data/mtleg-2019.json'

const OUT_PATH_LAWMAKERS = './analysis/lawmakers-2019.json'
const OUT_PATH_ANALYSIS = './analysis/bills-2019.json'

// Utility functions
const getJson = (path) => JSON.parse(fs.readFileSync(path))

const writeJson = (path, data) => {
    fs.writeFile (path, JSON.stringify(data), function(err) {
        if (err) throw err;
        console.log('Written to', path);
        }
    );
}

function main(){
    console.log('Pulling in', GLOB_BILLS, GLOB_VOTES)
    const bill_files = glob.sync(GLOB_BILLS)
    const vote_files = glob.sync(GLOB_VOTES)

    const bills = bill_files.map(getJson)
    const votes = vote_files.map(getJson)
    const lawmakers = getJson(ROSTER_PATH)
 
    processing(bills, votes, lawmakers)
    runTests(bills, votes, lawmakers)

    writeJson(OUT_PATH_APP, {
        updateDate: moment().format('YYYY-MM-DD'),
        votes: votes,
        bills: bills,
        lawmakers: lawmakers,
    })
    writeJson(OUT_PATH_LAWMAKERS, {
        lawmakers: lawmakers,
    })
    writeJson(OUT_PATH_ANALYSIS, {
        updateDate: moment().format('YYYY-MM-DD'),
        votes: votes,
        bills: bills,
        lawmakers: lawmakers,
    })
}
  
main()