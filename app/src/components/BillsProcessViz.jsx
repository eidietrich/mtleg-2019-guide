import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import styles from './BillsProcessViz.module.css'; 

import { getImportantActions, getActionColor, sortByBillNumber, getActionGlyph,
     getBillURLId
    } from './../js/handling'

class BillsProcessViz extends Component {
    render() {
        const bills = this.props.bills
        const rows = bills
            .sort(sortByBillNumber)
            .map(bill => Row(bill))
    
        return (<div className={styles.billProcessViz}>
            {/* <div className={styles.header}></div> */}
            <div className={styles.rowsContainer}>
                {rows}
            </div>
        </div>);
    }
  }

const Row = (bill) => {
    // console.log(getImportantActions(bill))
    const actions = getImportantActions(bill)
        .map((action, i) => Action(action, i))
    return (<div key={bill.identifier} className={styles.row}>
        <div className={styles.idCol}>
           <Link to={`/bill/${getBillURLId(bill)}`}>{bill.identifier}</Link>
        </div>
        <div className={styles.titleCol}>
           {bill.title}
        </div>
        <div className={styles.actionsCol}>
            {actions}
        </div>
    </div>)
}

const Action = (action, i) => {
    return <div
        key={String(i)}
        className={styles.action}
        style={{backgroundColor: getActionColor(action)}}
        onClick={d => console.log(action.description, action.date)}
        >
    {getActionGlyph(action)}
    </div>
}

export default BillsProcessViz