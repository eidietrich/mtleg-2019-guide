import React from 'react'

import styles from './BillStatus.modules.css'

import { getBillStatus } from './../js/handling'

const BillStatus = (bill) => {
    const billStatus = getBillStatus(bill)
    return <div className={styles.statusIndicator} 
            style={{backgroundColor: billStatus.color}}>
        {billStatus.key}
    </div>
}

export default BillStatus