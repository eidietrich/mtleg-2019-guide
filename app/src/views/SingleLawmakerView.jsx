import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import BillsProcessViz from '../components/BillsProcessViz'
import LawmakerVotesViz from '../components/LawmakerVotesViz'
import LawmakerVotesSummary from '../components/LawmakerVotesSummary'
import ButtonBar from '../components/ButtonBar'

import styles from './SingleLawmakerView.module.css'

import { cap, getBillsForLawmaker, lawmakerTitle, getSecondReadingVotesForLawmaker,
     sortVoteByMargin, sortByBillNumber,
    //  gopCaucusVote, demCaucusVote,
    
    } from '../js/handling'

class LawmakerView extends Component {
    constructor(props){
        super(props)
        this.state = {
            voteFilter: (vote) => true,
            voteSort: sortByBillNumber
        }
    }
    render() {
        const lawmaker = this.props.lawmaker
        if (!lawmaker) return (<div>
            <p>No legislator here.</p>
            <p><Link className={styles.headerLink} to={`/lawmakers`}>See all legislators</Link>.</p>
        </div>)
        
        const votes = getSecondReadingVotesForLawmaker(lawmaker)
            .sort(this.state.voteSort)
            
        const bills = getBillsForLawmaker(lawmaker)

        return (<div>
            <h1>{`${lawmakerTitle(lawmaker)} ${lawmaker.name}`}</h1>
            <div className={styles.locale}>{lawmaker.party}-{lawmaker.city} / {lawmaker.district}</div>
            <h2>Sponsored bills</h2>
            {/* <div>TK summary stats: Passed into law, dead, tabled, in process</div> */}
            <BillsProcessViz bills={bills} />
            <br />
            <h2>Floor votes</h2>
            <div className={styles.label}>Second readings on {cap(lawmaker.chamber)} floor</div>
            <LawmakerVotesSummary lawmaker={lawmaker} votes={votes} />
            <div className={styles.note}>
                <p>Statistics calculated for second reading floor votes only. The majority vote percentage figure indicates how often the lawmaker has voted with at least half their fellow lawmakers in both parties. Party vote statistics indicate how often the lawmaker has voted with a majority of members in that party's caucus.</p>
                <p>Votes here represent second readings. Some bills are subject to multiple rounds of votes in a given chamber, e.g., an initial "do pass" vote in the House and then a "do concur" on a version of the bill with Senate amendments. </p>
            </div>
            <ButtonBar
                buttons={[
                    {
                        id: 'number',
                        label: 'Sort by bill number',
                        action: (id) => {this.setState({voteSort: sortByBillNumber})}
                    },
                    {
                        id: 'margin',
                        label: 'Sort by vote margin',
                        action: (id) => {this.setState({voteSort: sortVoteByMargin})}
                    }
                ]}
                initial='number'
            />
            {/* <ButtonBar
                buttons={[
                    {
                        id: 'all',
                        label: 'All votes',
                        action: (id) => {this.setState({voteFilter: (vote) => true})}},
                    {
                        id: 'gopYes',
                        label: 'R caucus yes',
                        action: (id) => {this.setState({voteFilter: (vote) => gopCaucusVote(vote).caucus === 'yes'})}
                    },
                    {
                        id: 'demYes',
                        label: 'D caucus yes',
                        action: (id) => {this.setState({voteFilter: (vote) => demCaucusVote(vote).caucus === 'yes'})}
                    },
                    {
                        id: 'split',
                        label: 'Parties split',
                        action: (id) => {this.setState({voteFilter: (vote) => demCaucusVote(vote).caucus !== gopCaucusVote(vote).caucus})}
                    },
                ]}
                initial='all'
            /> */}
            <LawmakerVotesViz lawmaker={lawmaker} votes={votes.filter(this.state.voteFilter)} />
            <br/>
            
        </div>);
    }
  }


export default LawmakerView