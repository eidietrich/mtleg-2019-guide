import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { HashRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom"

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

// Analytics
// See https://zeph.co/google-analytics-react-router
// import createHistory from 'history/createBrowserHistory'
import ReactGA from 'react-ga'
const gaAppLoc = '/apps/track-mtleg-2019'
// const history = createHistory()
// history.listen(location => {
// 	ReactGA.set({ page: location.pathname })
// 	ReactGA.pageview(location.pathname)
// })


class App extends Component {
  componentDidMount(){
    ReactGA.pageview(gaAppLoc + window.location.pathname)
  }
  render() {
    return (<Router>
      <ScrollToTop>
        <div className={styles.app}>
          {/* <img class={styles.logo} src={logo} /> */}
          {/* <span className={styles.betaTag}>Beta</span> */}
            <div className={styles.mtfpLogo}>
              <a href="https://montanafreepress.org">
                <img className={styles.logo} alt='MTFP logo' src={logo} />
              </a>
              The Montana Free Press
              </div>
            <div className={styles.linkContainer}>
              <Link className={styles.headerLink} to={`/`}>Tracking MTLeg 2019</Link>
              <Link className={styles.headerLink} to={`/lawmakers`}>✓All Lawmakers</Link>
              <Link className={styles.headerLink} to={`/bills`}>✓All Bills</Link>
            </div>

          <hr className={styles.rule}/>

          <Switch>
            <Route exact path={`/`} component={Home} />
            
            <Route path={`/bills`} component={AllBillsView} />
            <Route path={`/bill/:id`} component={BillByUrl} />

            <Route path={`/lawmakers`} component={AllLawmakersView} />
            <Route path={`/lawmaker/:name`} component={LawmakerByUrl} />

            {/* route error handling */}
            <Redirect to="/" />
          </Switch>

          <hr className={styles.rule}/>
          <br />
          <div className={styles.footer}>
            <h2><a href="https://www.montanafreepress.org/donate/">Support this work</a></h2>
            <p>As a nonprofit news site, we rely on reader support to make projects like this possible.</p>
            <p>You can donate <a href="https://www.montanafreepress.org/donate/">here</a>.</p>
            <br />
            <div className={styles.mtfpLogo}>
              <a href="https://montanafreepress.org">
                <img className={styles.logo} alt='MTFP logo' src={logo} />
              </a>The Montana Free Press
            </div>
          </div>
        </div>
      </ScrollToTop>
    </Router>)
  }
}

const BillByUrl = ({ match }) => {
  return <SingleBillView bill={getBillByURLId(match.params.id)} />
}
const LawmakerByUrl = ({ match }) => {
  return <SingleLawmakerView lawmaker={getLawmakerByURLName(match.params.name)}/>
}

// To avoid pages loading with non-zero scroll bug
// See https://stackoverflow.com/questions/36904185/react-router-scroll-to-top-on-every-transition
class Scroller extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0)
    }
    // Google Analytics call
    const newPath = gaAppLoc + window.location.pathname + '#' + this.props.location.pathname
    ReactGA.pageview(newPath)
  }

  render() {
    return this.props.children
  }
}
const ScrollToTop = withRouter(Scroller)

export default App;
