import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import './App.css';
// import BillsTable from '../components/BillsTable'
import BillsProcessViz from '../components/BillsProcessViz'


import LawmakerView from './LawmakerView'
import SingleBillView from './SingleBillView'
import AllBillsView from './AllBillsView'
import AllVotesView from './AllVotesView'


import { getBillsForLawmaker, getBillsSample, getAllBills, getBillByURLId,
   getAllLawmakers, getLawmakerUrlName, getLawmakerByURLName
  } from '../js/handling'



import * as d3 from 'd3'

const f = d3.format(',')
const selLawmaker = 'Mary Ann Dunwell'
const votes = []

class App extends Component {
  render() {
    return (<Router>
      <div>
        <div>Views</div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/bills">Bills</Link></li>
          <li><Link to="/lawmakers">Lawmakers</Link></li>
          <li><Link to="/votes">Votes</Link></li>
        </ul>

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

const Home = () => (
  <div>
    <h2>This is the home page</h2>
    <div>TK summary stuff</div>
  </div>
);

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
    const url = getLawmakerUrlName(lawmaker)
    return (
      <li key={String(i)}>
        <Link to={`/lawmaker/${url}`}>{name}</Link>
      </li>
    )
  })
  return <ul>{rows}</ul>
}

export default App;
