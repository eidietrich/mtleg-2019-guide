import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import styles from './App.module.css'
import './App.css'

import LawmakerView from './LawmakerView'
import SingleBillView from './SingleBillView'
import AllBillsView from './AllBillsView'
import AllVotesView from './AllVotesView'
import AllLawmakersView from './AllLawmakersView'


import { getLawmakerByURLName, getBillByURLId } from '../js/handling'

class App extends Component {
  render() {
    return (<Router>
      <div className={styles.app}>
      <Link className={styles.headerLink} to="/">Home</Link>
      {' - '} 
      <Link className={styles.headerLink} to="/lawmakers">All Lawmakers</Link>
      {' - '} 
      <Link className={styles.headerLink} to="/bills">All Bills</Link>

      <hr className={styles.rule}/>

      <Route exact path="/" component={Home} />

      <Route path="/bills" component={AllBillsView} />
      <Route path="/bill/:id" component={BillByUrl} />

      <Route path="/lawmakers" component={AllLawmakersView} />
      <Route path="/lawmaker/:name" component={LawmakerByUrl} />

      <Route path="/votes" component={AllVotesView} />

      <hr className={styles.rule}/>
      <div>Source: Montana <a href='http://laws.leg.mt.gov/legprd/law0203w$.startup?P_SESS=20191'>LAWS system</a>. Data obtained using web scrapers adapted from <a href="https://openstates.org/">OpenState.org</a>.</div>
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

export default App;
