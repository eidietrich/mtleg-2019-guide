
/* Run with
    node scrape-parsing.js
*/

const fs = require('fs')
const glob = require('glob')
const moment = require('moment')

const { runTests, processing } = require('./processing/data-processing.js')

// const GLOB_BILLS = "_data/mt-02-23-2019/bill_*.json"
// const GLOB_VOTES = "_data/mt-02-23-2019/vote_event_*.json"

const GLOB_BILLS = "_data/mt-02-23-2019/bill_*.json"
const GLOB_VOTES = "_data/mt-02-23-2019/vote_event_*.json"

const OUT_PATH_APP_VOTES = 'app/src/data/scrape-2019-votes.json'
const OUT_PATH_APP_BILLS = 'app/src/data/scrape-2019-bills.json'
const OUT_PATH_APP = 'app/src/data/scrape-2019-all.json'

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
    const lawmakers = getJson('./app/src/data/leg-roster-2019.json')

    // Processing
    // console.log(configs)

    runTests(bills, votes)
    processing(bills, votes, lawmakers)

    writeJson(OUT_PATH_APP, {
        updateDate: moment().format('YYYY-MM-DD'),
        votes: votes,
        bills: bills,
        lawmakers: lawmakers,
    })
    // writeJson(OUT_PATH_APP_VOTES, votes)
    // writeJson(OUT_PATH_APP_BILLS, bills)
}
  
main()