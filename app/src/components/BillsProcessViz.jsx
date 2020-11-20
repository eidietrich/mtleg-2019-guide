import React, { Component } from 'react'
import { Link } from 'gatsby'

import BillStatus from './BillStatus'
// import BillAction from './BillAction'

import './tableStyles.css';
import styles from './BillsProcessViz.module.css'; 

import { 
    sortByBillNumber, 
    // getImportantActions, 
    // getBillSponsor,
    getBillURLId
    } from '../process/handling'

class BillsProcessViz extends Component {
    render() {
        const bills = this.props.bills
        const rows = bills
            .sort(sortByBillNumber)
            .map(bill => Row(bill))
    
        return (<div className={styles.billProcessViz}>
            <div className={styles.billCount}>Showing {bills.length} bills</div>
            <div className="rowContainer">
                {rows}
            </div>
        </div>);
    }
  }

const Row = (bill) => {
    // const actions = getImportantActions(bill)
        // .map((action, i) => BillAction(action, i))

    return (<div key={bill.identifier} className="tableRow">
        <div className="statusCol">
            <BillStatus bill={bill} />
        </div>
        <div className="billCol">
           <Link to={`/bill/${getBillURLId(bill)}`}>{bill.identifier}</Link>
        </div>
        <div className="billTitleCol">
           {bill.title}
        </div>

        {/* <div className={styles.actionsCol}>
            {actions}
        </div> */}
    </div>)
}

export default BillsProcessViz