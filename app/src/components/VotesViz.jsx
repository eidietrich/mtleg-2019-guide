/*
    Component for doing comparative vote visualizations 
    e.g. compare all 

*/

import React, { Component } from 'react'

import styles from './VotesViz.module.css'

import { getVoteAyes, getVoteNays, getVoteBill } from './../js/handling'

class VotesViz extends Component {
    render() {    
        const votes = this.props.votes
        console.log(votes)
        const rows = votes.map((vote, i) => Vote(vote, i))
        return (<div>
            <div>This will list out several votes, compare who voted how on them</div>
            <div className={styles.rowContainer}>
                {rows}
            </div>
        </div>);
    }
  }

const Vote = (vote, i) => {
    console.log(vote)
    const bill = getVoteBill(vote)
    return <div key={String(i)}>
        <div className={styles.voteRow}>
            <div className={styles.billCol}>{bill.identifier}</div>
            <div className={styles.voteCol}>{` ${getVoteAyes(vote)}-${getVoteNays(vote)}`}</div>
            <div className={styles.resultCol}>({vote.result})</div>
            <div className={styles.motionCol}>{vote.bill_action} </div>
            <div className={styles.dateCol}>{vote.start_date} </div>
        </div>
    </div>
}
export default VotesViz