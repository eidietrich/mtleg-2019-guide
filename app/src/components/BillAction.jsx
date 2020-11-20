import React from 'react'

import styles from './BillAction.module.css'

import { getActionColor, getActionGlyph } from './../process/handling'

const BillAction = (action, i) => {
    return <div
        key={String(i)}
        className={styles.action}
        style={{backgroundColor: getActionColor(action)}}
        onClick={d => console.log(action.description, action.date)}
        >
    {getActionGlyph(action)}
    </div>
}

export default BillAction