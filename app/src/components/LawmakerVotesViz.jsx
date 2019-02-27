/*
    Component for doing comparative vote visualizations 
    e.g. compare all 

*/

import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import styles from './LawmakerVotesViz.module.css'

import { getBillURLId, getVoteLawsUrl,
    voteCountText, getVoteBill, votePassed,
    getLawmakerVote, gopCaucusVote, demCaucusVote } from './../js/handling'

class LawmakerVotesViz extends Component {
    render() {    
        const votes = this.props.votes
        const lawmaker = this.props.lawmaker
        const rows = votes.map((vote, i) => Vote(vote, i, lawmaker))
        return (<div className={styles.table}>
            <div className={styles.votesCount}>Showing {votes.length} votes</div>
            <div className={styles.tableHeader}>
                <div className={styles.firstColGroup}></div>
                <div className={styles.billCol}>Bill</div>
                <div className={styles.billTitleCol}>Title</div>
                <div className={styles.outcomeCol}>Outcome (Yes&#8209;No)</div>
                <div className={styles.lawmakerVoteCol}>{lawmaker.name}</div>
                <div className={styles.compareVoteCol}>GOP caucus</div>
                <div className={styles.compareVoteCol}>Dem caucus</div>
            </div>
            <div className={styles.rowContainer}>
                {rows}
            </div>
        </div>);
    }
  }

const Vote = (vote, i, lawmaker) => {
    console.log(vote)
    const color = (d) => {
        if (d === 'yes') return '#91cf60'
        if (d === 'no') return '#fc8d59'
        else return '#ddd'
    }
    const glyph = (vote) => votePassed(vote) ? '✓': '✗'

    const bill = getVoteBill(vote)
    const lawmakerVote = getLawmakerVote(vote, lawmaker)
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
                <a href={getVoteLawsUrl(vote)} target="_blank" rel="noopener noreferrer">
                    {`${glyph(vote)}${voteCountText(vote)}`}
                </a>
            </div>
            <div className={styles.lawmakerVoteCol}
                style={{backgroundColor: color(lawmakerVote)}}>
                {lawmakerVote}
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
            {/* <div className={styles.dateCol}>{vote.start_date} </div> */}
        </div>
    </div>
}
export default LawmakerVotesViz