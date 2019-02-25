import React, { Component } from 'react'

import BillsProcessViz from './../components/BillsProcessViz'
import LawmakerVotesViz from './../components/LawmakerVotesViz'

import styles from './LawmakerView.module.css'

import { getBillsForLawmaker, lawmakerTitle, getSecondReadingVotesForLawmaker, sortVoteByMargin } from './../js/handling'


class LawmakerView extends Component {
    render() {
        const lawmaker = this.props.lawmaker
        const votes = getSecondReadingVotesForLawmaker(lawmaker)
            .sort(sortVoteByMargin)
        const bills = getBillsForLawmaker(lawmaker)

        return (<div>
            <div className={styles.header}>
                {`${lawmakerTitle(lawmaker)} ${lawmaker.name}, ${lawmaker.party}-${lawmaker.city}`}
            </div>
            <div>TK other lawmaker info</div>
            <br/>
            <div className={styles.subHead}>Bills sponsored ({bills.length})</div>
            <div>TK summary stats: Passed into law, dead, tabled, in process</div>
            <BillsProcessViz bills={bills} />
            <br />
            <div className={styles.subHead}>Floor votes</div>
            <div>Showing 2nd reading</div>
            <div>TK summary stats: % with majority, % with party</div>
            <div>TK Filtering options (All, with party, against party, tight votes, newsworthy votes)</div>
            <LawmakerVotesViz lawmaker={lawmaker} votes={votes} />
            <br/>
            
        </div>);
    }
  }


export default LawmakerView