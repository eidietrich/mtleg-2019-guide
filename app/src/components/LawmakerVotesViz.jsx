/*
    Component for doing comparative vote visualizations 
    e.g. compare all 

*/

import React, { Component } from 'react'

import styles from './LawmakerVotesViz.module.css'

import { getVoteAyes, getVoteNays, getVoteBill, 
    getLawmakerVote, gopLeadershipVote, demLeadershipVote } from './../js/handling'

class LawmakerVotesViz extends Component {
    render() {    
        const votes = this.props.votes
        const lawmaker = this.props.lawmaker
        console.log(votes)
        const rows = votes.map((vote, i) => Vote(vote, i, lawmaker))
        return (<div>
            <div className={styles.tableHeader}>
                <div className={styles.billCol}>Bill</div>
                <div className={styles.billTitleCol}>Title</div>
                <div className={styles.outcomeCol}>Motion (yes-no)</div>
                <div className={styles.lawmakerVoteCol}>{lawmaker.name}</div>
                <div className={styles.lawmakerVoteCol}>GOP majority leader</div>
                <div className={styles.lawmakerVoteCol}>Dem minority leader</div>
            </div>
            <div className={styles.rowContainer}>
                {rows}
            </div>
        </div>);
    }
  }

const Vote = (vote, i, lawmaker) => {
    // console.log(vote)
    const color = (d) => {
        if (d === 'yes') return '#91cf60'
        if (d === 'no') return '#fc8d59'
        else return '#ddd'
    }
    const bill = getVoteBill(vote)
    const lawmakerVote = getLawmakerVote(vote, lawmaker)
    const gopVote = gopLeadershipVote(vote, lawmaker)
    const demVote = demLeadershipVote(vote, lawmaker)
    return <div key={String(i)}>
        <div className={styles.voteRow}>
            <div className={styles.billCol}>{bill.identifier}</div>
            <div className={styles.billTitleCol}>{bill.title}</div>
            <div className={styles.outcomeCol}>{`${vote.bill_action} ${getVoteAyes(vote)}-${getVoteNays(vote)}`}</div>
            <div className={styles.lawmakerVoteCol}
                style={{backgroundColor: color(lawmakerVote)}}>
                {lawmakerVote.toUpperCase()}
            </div>
            <div className={styles.lawmakerVoteCol}
                style={{backgroundColor: color(gopVote), opacity: 0.7}}>
                {gopVote.toUpperCase()}
            </div>
            <div className={styles.lawmakerVoteCol}
                style={{backgroundColor: color(demVote), opacity: 0.7}}>
                {demVote.toUpperCase()}
            </div>
            {/* <div className={styles.motionCol}>{} </div> */}
            {/* <div className={styles.dateCol}>{vote.start_date} </div> */}
        </div>
    </div>
}
export default LawmakerVotesViz