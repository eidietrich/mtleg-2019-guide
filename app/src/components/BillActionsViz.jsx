import React, { Component } from 'react'
// import ReactTable from "react-table";
// import 'react-table/react-table.css'

import styles from './BillActionsViz.module.css';

import BillAction from './BillAction'

import { getImportantActions } from './../js/handling'

class BillActionsViz extends Component {
    render() {
        const bill = this.props.bill
        const actions = getImportantActions(bill)
        const rows = actions.map((action,i) => Row(action, i))
        return (<div>
            <div className={styles.header}>
                <div className={styles.actionCol}></div>
                <div className={styles.dateCol}>Date</div>
                <div className={styles.descriptionCol}>Action</div>
            </div>
            <div className={styles.rowsContainer}>
                {rows}
            </div>
        </div>);
    }
  }

const Row = (action, i) => {
    return (<div key={String(i)} className={styles.row}>
        <div className={styles.actionCol}>
            {BillAction(action, i)}
        </div>
        <div className={styles.dateCol}>{action.date}</div>
        <div className={styles.descriptionCol}>{action.description}</div>
    </div>)
}

export default BillActionsViz