/*
    Component for doing comparative vote visualizations 
    e.g. compare all 

*/

import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import styles from './VotesViz.module.css'

import { getBillURLId, 
    voteCountText, getVoteBill, votePassed,
    getLawmakerVote, gopLeadershipVote, demLeadershipVote, gopCaucusVote, demCaucusVote } from './../js/handling'

class VotesViz extends Component {
    render() {    
        const votes = this.props.votes
        const rows = votes.map((vote, i) => Vote(vote, i))
        return (<div className={styles.table}>
            <div className={styles.tableHeader}>
                <div className={styles.billCol}>Bill</div>
                <div className={styles.billTitleCol}>Title</div>
                <div className={styles.outcomeCol}>2nd Reading (Yes-No)</div>
                <div className={styles.compareVoteCol}>GOP caucus</div>
                <div className={styles.compareVoteCol}>Dem caucus</div>
                <div className={styles.dateCol}>Vote date</div>
            </div>
            <div className={styles.rowContainer}>
                {rows}
            </div>
        </div>);
    }
  }

const Vote = (vote, i) => {
    // console.log(vote)
    const color = (d) => {
        if (d === 'yes') return '#91cf60'
        if (d === 'no') return '#fc8d59'
        else return '#ddd'
    }
    const glyph = (vote) => votePassed(vote) ? '✓': '✗'
    const passGlyph = (pass) => (pass === 'yes') ? '✓': '✗'

    const bill = getVoteBill(vote)
    const gopVote = gopCaucusVote(vote)
    const demVote = demCaucusVote(vote)
    // console.log(gopVote, demVote)
    return <div key={String(i)}>
        <div className={styles.voteRow}>
            <div className={styles.billCol}>
                <Link to={`/bill/${getBillURLId(bill)}`}>{bill.identifier}</Link>
            </div>
            
            <div className={styles.billTitleCol}>{bill.title}</div>
            <div className={styles.outcomeCol}
                style={{backgroundColor: votePassed(vote) ? '#91cf60' : '#fc8d59'}}>
                {`${glyph(vote)}${voteCountText(vote)}`}
            </div>
            <div className={styles.compareVoteCol}
                style={{backgroundColor: color(gopVote.caucus)}}>
                {/* {gopVote.caucus} */}
                {`${gopVote.yes}-${gopVote.no}`}
            </div>
            <div className={styles.compareVoteCol}
                style={{backgroundColor: color(demVote.caucus)}}>
                {/* {gopVote.caucus} */}
                {`${demVote.yes}-${demVote.no}`}
            </div>
            {/* <div className={styles.motionCol}>{} </div> */}
            <div className={styles.dateCol}>{vote.start_date} </div>
        </div>
    </div>
}
export default VotesViz