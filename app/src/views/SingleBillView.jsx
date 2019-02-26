import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import BillActionsViz from '../components/BillActionsViz'
import BillVotesViz from '../components/BillVotesViz'
import BillStatus from '../components/BillStatus'

import VotesViz from '../components/VotesViz'

import { getBillSponsor, getLawmakerUrlName, getBillLawsUrl, getBillVotes, getBillStatus } from './../js/handling'

class SingleBillView extends Component {
    render() {
        const bill = this.props.bill
        const sponsor = getBillSponsor(bill)
        const votes = getBillVotes(bill)
        return (<div>
            
            <h1>{bill.identifier}</h1>
            <div>{bill.title}</div>
            <BillStatus bill={bill} />
            <div>Sponsor: <Link to={`/lawmaker/${getLawmakerUrlName(sponsor)}`}>{sponsor.name}</Link>, {sponsor.party}-{sponsor.city}</div>
            
            <h2>Process</h2>
            <BillActionsViz bill={bill} />

            <h2>Votes</h2>
            <BillVotesViz bill={bill} />

            <br />
            <div>See also: The <a href={getBillLawsUrl(bill)}>official bill page</a> in the state LAWS system.</div>
        </div>);
    }
  }

//   const Votes = (props) => {
//     const bill = props.bill
//     const votes = getBillVotes(bill)
//     // TODO - break this out into handling
//     // TODO: Add second chamber
    
//     const secondReadings = ['2nd Reading Passed', '2nd Reading Failed', '2nd Reading Passed as Amended']
//     const firstChamberVote = votes.find(v => secondReadings.includes(v.bill_action))
//     if (!firstChamberVote) return <div>No floor vote recorded</div>

//     return <div>
//         {/* <div>Second reading</div> */}
//         {/* <SingleVoteViz vote={firstChamberVote}/> */}
//     </div>
//   }

export default SingleBillView