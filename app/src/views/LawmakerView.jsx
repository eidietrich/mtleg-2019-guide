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
            <h1>{`${lawmakerTitle(lawmaker)} ${lawmaker.name}`}</h1>
            <div>{lawmaker.party}-{lawmaker.city}</div>
            <div>TK other lawmaker info</div>
            <br/>
            <h2>Sponsored bills</h2>
            <div>TK summary stats: Passed into law, dead, tabled, in process</div>
            <BillsProcessViz bills={bills} />
            <br />
            <h2>Floor votes</h2>
            <div>Showing 2nd reading</div>
            <div>TK summary stats: % with majority, % with party</div>
            <div>TK Filtering options (All, with party, against party, tight votes, newsworthy votes)</div>
            <LawmakerVotesViz lawmaker={lawmaker} votes={votes} />
            <br/>
            
        </div>);
    }
  }


export default LawmakerView