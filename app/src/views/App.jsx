import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// import './App.css';
import styles from './App.module.css'
// import BillsTable from '../components/BillsTable'
import BillsProcessViz from '../components/BillsProcessViz'


import LawmakerView from './LawmakerView'
import SingleBillView from './SingleBillView'
import AllBillsView from './AllBillsView'
import AllVotesView from './AllVotesView'


import { getBillsForLawmaker, getBillsSample, getAllBills, getBillByURLId,
   getAllLawmakers, getLawmakerUrlName, getLawmakerByURLName, lawmakerTitle
  } from '../js/handling'



import * as d3 from 'd3'

const f = d3.format(',')
const selLawmaker = 'Mary Ann Dunwell'
const votes = []

class App extends Component {
  render() {
    return (<Router>
      <div className={styles.app}>
      <Link to="/">Home</Link>
      {' - '} 
      <Link to="/lawmakers">All Lawmakers</Link>
      {' - '} 
      <Link to="/bills">All Bills</Link>

      <hr />

      <Route exact path="/" component={Home} />

      <Route path="/bills" component={AllBillsView} />
      <Route path="/bill/:id" component={BillByUrl} />

      <Route path="/lawmakers" component={LawmakerList} />
      <Route path="/lawmaker/:name" component={LawmakerByUrl} />

      <Route path="/votes" component={AllVotesView} />
      </div>
    </Router>)
  }
}

const Home = () => {
  return(
    <div>
      <h1>What Montana legislators have done in 2019 (so far)</h1>
      <div>(Work in progress, data current as of Feb. 23)</div>
      <div>TK introduction, explanation</div>
     <ul>
        {/* <li><Link to="/">Home</Link></li> */}
        <li><Link to="/lawmakers">See lawmakers</Link></li>
        <li><Link to="/bills">See bills</Link></li>
        <li><Link to="/bill/hb3">See specific bill (e.g. HB 3)</Link></li>
        <li><Link to="/lawmaker/DavidBedey">See specific lawmaker (e.g. David Bedey)</Link></li>
        
        {/* <li><Link to="/votes">Votes</Link></li> */}
      </ul>
    </div>
  )
}

const BillByUrl = ({ match }) => {
  return <SingleBillView bill={getBillByURLId(match.params.id)} />
}
const LawmakerByUrl = ({ match }) => {
  return <LawmakerView lawmaker={getLawmakerByURLName(match.params.name)}/>
}

const LawmakerList = () => {
  const lawmakers = getAllLawmakers()
  const rows = lawmakers.map((lawmaker,i) => {
    const name = lawmaker.name
    const title = lawmakerTitle(lawmaker)
    const url = getLawmakerUrlName(lawmaker)
    return (
      <li key={String(i)}>
        <Link to={`/lawmaker/${url}`}>{title} {name}, {lawmaker.party}-{lawmaker.city}</Link>
      </li>
    )
  })
  return <div>
    <h1>Lawmakers</h1>
    <div>Formatting TK</div>
    <div>Search reps by address/city TK</div>
    <ul>
      {rows}
    </ul>
  </div>
    
}

export default App;
