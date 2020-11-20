import React, { Component } from 'react'
import Layout from "../components/layout"
import SEO from '../components/seo'

import BillsProcessViz from '../components/BillsProcessViz'
import LawmakerVotesViz from '../components/LawmakerVotesViz'

import PullStats from '../components/PullStats'
import ButtonBar from '../components/ButtonBar'

import styles from './single-lawmaker-page.module.css'

import { cap, lawmakerTitle, getSecondReadingVotesForLawmaker,
    sortVoteByMargin, sortByBillNumber,
    gopCaucusVote, demCaucusVote, 
    filterToLastBillVote,
    percentFormat,
    } from '../process/handling'

import { KEY_BILLS } from '../process/config'

class LawmakerView extends Component {
    constructor(props){
        super(props)
        this.state = {
            voteFilter: vote => KEY_BILLS.includes(vote.identifier),
            voteSort: sortByBillNumber
        }
    }
    render(){
        const { lawmaker } = this.props.pageContext
        const { bills } = this.props.pageContext

        const votes = getSecondReadingVotesForLawmaker(lawmaker)
            .sort(this.state.voteSort)

        return (<Layout>
            <SEO
                title={`${lawmaker.name} | Tracking the 2019 Legislature`}
                description={`2019 votes and bill sponsorships for ${lawmakerTitle(lawmaker)} ${lawmaker.name}, {lawmaker.party}-{lawmaker.city}`}
            />
            <h1>{`${lawmakerTitle(lawmaker)} ${lawmaker.name}`}</h1>
            <div className={styles.locale}>{lawmaker.party}-{lawmaker.city} / {lawmaker.district}</div>
            
            <h2>Sponsored bills</h2>
            {/* <div>TK summary stats: Passed into law, dead, tabled, in process</div> */}
            <BillsProcessViz bills={bills} />
            <br />

            <h2>Floor votes</h2>
            <div className={styles.label}>Second readings on {cap(lawmaker.chamber)} floor</div>
            <PullStats data={[
                {
                    value: percentFormat(lawmaker.percentVotesWithMajority),
                    label: 'of votes with majority of body',
                },
                {
                    value: percentFormat(lawmaker.percentVotesWithGopCaucus),
                    label: 'of votes with Republican caucus',
                },
                {
                    value: percentFormat(lawmaker.percentVotesWithDemCaucus),
                    label: 'of votes with Democratic caucus',
                }
            ]} />
            <div className={styles.note}>
                <p>Statistics calculated for second reading floor votes only. The majority vote percentage figure indicates how often the lawmaker has voted with at least half their fellow lawmakers in both parties. Party vote statistics indicate how often the lawmaker has voted with a majority of members in that party's caucus.</p>
                <p>Votes here represent second readings. Some bills are subject to multiple rounds of votes in a given chamber, e.g., an initial "do pass" vote in the House and then a "do concur" on a version of the bill with Senate amendments. All second reading votes are included in statistics, but only the final chamber vote on a bill is shown in the list below.</p>
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
            <ButtonBar
                buttons={[
                    {
                        id: 'key',
                        label: 'Select votes',
                        action: (id) => {this.setState({voteFilter: vote => KEY_BILLS.includes(vote.identifier)})}
                    },
                    {
                        id: 'all',
                        label: 'All votes',
                        action: (id) => {this.setState({voteFilter: (vote) => true})}
                    },
                    // {
                    //     id: 'gopYes',
                    //     label: 'R caucus yes',
                    //     action: (id) => {this.setState({voteFilter: (vote) => gopCaucusVote(vote).caucus === 'yes'})}
                    // },
                    // {
                    //     id: 'demYes',
                    //     label: 'D caucus yes',
                    //     action: (id) => {this.setState({voteFilter: (vote) => demCaucusVote(vote).caucus === 'yes'})}
                    // },
                    {
                        id: 'split',
                        label: 'Parties split',
                        action: (id) => {this.setState({voteFilter: (vote) => demCaucusVote(vote).caucus !== gopCaucusVote(vote).caucus})}
                    },
                ]}
                initial='key'
            />
            <LawmakerVotesViz lawmaker={lawmaker} votes={votes.filter(this.state.voteFilter).filter(filterToLastBillVote)} />
            <br/>
            
        </Layout>);
    }
  }


export default LawmakerView