import React, { Component } from 'react'

import BillsProcessViz from '../components/BillsProcessViz'

import { getAllBills } from './../js/handling'

class AllBillsView extends Component {
    render() {
        const bills = getAllBills()
        return (<div>
            <div>All Bills View</div>
            <div>TK: Filtering options</div>
            <BillsProcessViz bills={bills}/>
        </div>);
    }
  }

export default AllBillsView