import React, { Component } from 'react'

import styles from './BillVotesViz.module.css'

import {getBillVotes, sortVoteByBillAndDate, getVoteLawsUrl,
    voteCountText, votePassed,
    gopCaucusVote, demCaucusVote } from './../js/handling'

class BillVotesViz extends Component {
    render() {    
        // const votes = this.props.votes
        const bill = this.props.bill
        const votes = getBillVotes(bill)
            .sort(sortVoteByBillAndDate)
        const rows = votes.map((vote, i) => Vote(vote, i))
        return (<div className={styles.table}>
            <div className={styles.tableHeader}>
                <div className={styles.dateCol}>Date</div>
                <div className={styles.descriptionCol}>Action</div>
                <div className={styles.outcomeCol}>Vote</div>
                <div className={styles.compareVoteCol}>GOP caucus</div>
                <div className={styles.compareVoteCol}>Dem. caucus</div>
            </div>
            <div className={styles.rowContainer}>
                {rows}
            </div>
            <div className={styles.note}>
                <p>Note: Coloring in the vote outcome column does not currently account for votes that require more than a simple majority to pass. Putting a constitutional amendment before voters, for example, takes approval from two-thirds of lawmakers across both houses. Additionally, bills that authorize state debt must pass with two-thirds supermajorities in each legislative chamber.</p>
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

    const gopVote = gopCaucusVote(vote)
    const demVote = demCaucusVote(vote)
    return <div key={String(i)}>
        <div className={styles.voteRow}>
            <div className={styles.dateCol}>{vote.start_date} </div>
            <div className={styles.descriptionCol}>{vote.bill_action || 'Committee Action'}</div>
            <div className={styles.outcomeCol}
                style={{backgroundColor: votePassed(vote) ? '#91cf60' : '#fc8d59'}}>
                <a href={getVoteLawsUrl(vote)} target="_blank" rel="noopener noreferrer">
                    {`${glyph(vote)}${voteCountText(vote)}`}
                </a>
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
            
        </div>
    </div>
}
export default BillVotesViz