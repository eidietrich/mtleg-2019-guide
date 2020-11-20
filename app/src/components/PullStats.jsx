import React, { Component } from 'react'

import styles from './PullStats.module.css'

class PullStats extends Component {
    render() {    
        const data = this.props.data

        const pullStats = data.map((d,i) =>
            <div className={styles.stat} key={'stat-' + i}>
                <div className={styles.percent}>{d.value}</div>
                <div className={styles.label}>{d.label}</div>
            </div>
        )

        return (<div className={styles.lawmakerVotesSummary}>
            <div className={styles.header}></div>
            <div className={styles.stats}>
                {pullStats}
            </div>
            
        </div>);
    }
}

export default PullStats