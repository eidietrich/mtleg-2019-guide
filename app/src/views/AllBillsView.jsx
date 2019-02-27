import React, { Component } from 'react'

import BillsProcessViz from '../components/BillsProcessViz'

import image from './../images/committee.jpg'

import { getAllBills } from './../js/handling'

class AllBillsView extends Component {
    render() {
        const bills = getAllBills()
        return (<div>
            <h1>2019 Montana Bills</h1>
            <div className='image'>
                <img src={image} alt=''/>
                <div className="image-credit">Photo by Eliza Wiley</div>
            </div>
            <BillsProcessViz bills={bills}/>
            <br/>
            <div>Source: LAWS system <a href='http://laws.leg.mt.gov/legprd/LAW0217W$BAIV.return_all_bills?P_SESS=20191'>bills page</a>.</div>
        </div>);
    }
  }

export default AllBillsView