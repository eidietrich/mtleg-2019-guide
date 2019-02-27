import React, { Component } from 'react'

import styles from './LawmakerVotesSummary.module.css'

import {
    cap, percentVotesWithMajority, percentVotesWithGopCaucus, percentVotesWithDemCaucus
} from './../js/handling'

class LawmakerVotesSummary extends Component {
    render() {    
        const votes = this.props.votes
        const lawmaker = this.props.lawmaker

        return (<div className={styles.lawmakerVotesSummary}>
            <div className={styles.header}></div>
            <div className={styles.stats}>
                <div className={styles.stat}>
                    <div className={styles.percent}>{percentVotesWithMajority(votes, lawmaker)}</div>
                    <div className={styles.label}>of votes with {cap(lawmaker.chamber)} majority</div>
                </div>
                <div className={styles.stat}>
                    <div className={styles.percent}>{percentVotesWithGopCaucus(votes, lawmaker)}</div>
                    <div className={styles.label}>of votes with Republican caucus</div>
                </div>
                <div className={styles.stat}>
                    <div className={styles.percent}>{percentVotesWithDemCaucus(votes, lawmaker)}</div>
                    <div className={styles.label}>of votes with Democratic caucus</div>
                </div>
            </div>
            
        </div>);
    }
}

export default LawmakerVotesSummary