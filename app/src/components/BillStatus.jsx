import React, { Component } from 'react'

import styles from './BillStatus.module.css'

import { getBillStatus } from './../js/handling'

const BillStatus = (props) => {
    const bill = props.bill
    const billStatus = getBillStatus(bill)
    
    return <div className={styles.statusIndicator}
            style={{backgroundColor: billStatus.color}}>
        {billStatus.key}
    </div>
}

export default BillStatus