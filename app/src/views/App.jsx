import React, { Component } from 'react';
import './App.css';
import BillsTable from '../components/BillsTable'
import StoryView from './StoryView'

import { getBillsForLawmaker } from '../js/handling'

import * as d3 from 'd3'

class App extends Component {
  render() {
    const f = d3.format(',')
    const selLawmaker = 'Mary Ann Dunwell'
    const bills = getBillsForLawmaker(selLawmaker)
    return (
      <div className="App">
        {/* <header className="App-header">
          <p>
            {`Data for ${f(data.bills.length)} bills and ${f(data.votes.length)} separate votes.`}
          </p>
        </header> */}
        <StoryView />
        <div>Showing {bills.length} bills sponsored by {selLawmaker}</div>
        <BillsTable bills={bills}/>
      </div>
    );
  }
}

export default App;
