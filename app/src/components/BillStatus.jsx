import React from 'react'

import styles from './BillStatus.module.css'

import { getBillStatus } from '../process/handling'

const BillStatus = (props) => {
    const bill = props.bill
    const billStatus = getBillStatus(bill)
    
    return <div className={styles.statusIndicator}
            style={{backgroundColor: billStatus.color}}>
        {billStatus.label}
    </div>
}

export default BillStatus