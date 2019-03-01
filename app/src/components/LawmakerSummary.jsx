import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import styles from './LawmakerSummary.module.css';

import { getBillsForLawmaker, getLawmakerUrlName, getSecondReadingVotesForLawmaker, sortByDistrict,
    percentVotesWithMajority, percentVotesWithGopCaucus, percentVotesWithDemCaucus, percentFormat
 } from './../js/handling'

class LawmakerSummary extends Component {
    render() {
        const lawmakers = this.props.lawmakers
            .sort(sortByDistrict)
        // const actions = getImportantActions(bill)
        const rows = lawmakers.map((action,i) => Row(action, i))
        return (<div className={styles.table}>
            <div className={styles.header}>
                <div className={styles.nameCol}>Lawmaker</div>
                <div className={styles.districtCol}>District</div>
                <div className={styles.billNumCol}>Bills</div>
                <div className={styles.votePercentCol}>Votes with majority of body</div>
                <div className={styles.votePercentCol}>Votes with GOP caucus</div>
                <div className={styles.votePercentCol}>Votes with Dem. caucus</div>
            </div>
            <div className={styles.rowsContainer}>
                {rows}
            </div>
        </div>);
    }
  }

const Row = (lawmaker, i) => {
    const bills = getBillsForLawmaker(lawmaker)
    const url = getLawmakerUrlName(lawmaker)
    // const votes = getSecondReadingVotesForLawmaker(lawmaker)
    const majority = percentVotesWithMajority('', lawmaker)
    const gopVotes = percentVotesWithGopCaucus('', lawmaker)
    const demVotes = percentVotesWithDemCaucus('', lawmaker)
    
    const bgColor = (lawmaker.party === 'R') ? '#f4a582' : '#92c5de'
    const color = (lawmaker.party === 'R') ? '#b2182b' : '#2166ac'

    return (<Link
        to={`${process.env.PUBLIC_URL}/lawmaker/${url}`}
        key={String(i)}
        className={styles.row}
        style={{color: color}}>
        <div className={styles.nameCol}>{lawmaker.name} ({lawmaker.party})</div>
        <div className={styles.districtCol}>{lawmaker.district} / {lawmaker.city}   </div>
        <div className={styles.billNumCol}>{bills.length}</div>
        <div className={styles.votePercentCol}>{majority}</div>
        <div className={styles.votePercentCol}>{gopVotes}</div>
        <div className={styles.votePercentCol}>{demVotes}</div>
    </Link>
    )
}

export default LawmakerSummary