import React, { Component } from 'react'

import BillsProcessViz from '../components/BillsProcessViz'

import { getAllBills } from './../js/handling'

class AllBillsView extends Component {
    render() {
        const bills = getAllBills()
        return (<div>
            <h1>2019 Montana Legislature Bills</h1>
            <div>{bills.length} of them introduced.</div>
            <div>TK: Filtering options</div>
            <BillsProcessViz bills={bills}/>
            <br/>
            <div>See also: LAWS system <a href='http://laws.leg.mt.gov/legprd/LAW0217W$BAIV.return_all_bills?P_SESS=20191'>bills page</a>.</div>
        </div>);
    }
  }

export default AllBillsView