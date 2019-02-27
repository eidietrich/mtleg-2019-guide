import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import styles from './App.module.css'
import logo from './../images/mtfp-logo-letters-only.png'

import './App.css'

import Home from './Home'
import SingleLawmakerView from './SingleLawmakerView'
import SingleBillView from './SingleBillView'
import AllBillsView from './AllBillsView'
// import AllVotesView from './AllVotesView'
import AllLawmakersView from './AllLawmakersView'

import { getLawmakerByURLName, getBillByURLId } from '../js/handling'

class App extends Component {
  render() {
    return (<Router>
      <div className={styles.app}>
        {/* <img class={styles.logo} src={logo} /> */}
        {/* <span className={styles.betaTag}>Beta</span> */}
          <div className={styles.mtfpLogo}><img className={styles.logo} alt='MTFP logo' src={logo} />| The Montana Free Press</div>
          <div className={styles.linkContainer}>
            <Link className={styles.headerLink} to="/">Tracking MTLeg 2019</Link>
            <Link className={styles.headerLink} to="/lawmakers">✓All Lawmakers</Link>
            <Link className={styles.headerLink} to="/bills">✓All Bills</Link>
          </div>

        <hr className={styles.rule}/>

        <Route exact path="/" component={Home} />

        <Route path="/bills" component={AllBillsView} />
        <Route path="/bill/:id" component={BillByUrl} />

        <Route path="/lawmakers" component={AllLawmakersView} />
        <Route path="/lawmaker/:name" component={LawmakerByUrl} />

        {/* <Route path="/votes" component={AllVotesView} /> */}

        <hr className={styles.rule}/>
        <br />
        <div className={styles.footer}>See an error or have a suggestion? Email Data Reporter Eric Dietrich at <a href="mailto:edietrich@mtfp.org">edietrich@mtfp.org</a>.</div>
        <br />
        <div className={styles.mtfpLogo}><img className={styles.logo} alt='MTFP logo' src={logo} />| The Montana Free Press</div>
      </div>
    </Router>)
  }
}



const BillByUrl = ({ match }) => {
  return <SingleBillView bill={getBillByURLId(match.params.id)} />
}
const LawmakerByUrl = ({ match }) => {
  return <SingleLawmakerView lawmaker={getLawmakerByURLName(match.params.name)}/>
}

export default App;
