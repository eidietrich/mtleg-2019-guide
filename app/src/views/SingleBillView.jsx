import React, { Component } from 'react'

import BillActionsViz from '../components/BillActionsViz'
import SingleVoteViz from '../components/SingleVoteViz'

import VotesViz from '../components/VotesViz'

import { getBillSponsor, getBillLawsUrl, getBillVotes, getBillStatus } from './../js/handling'

class SingleBillView extends Component {
    render() {
        const bill = this.props.bill
        const sponsor = getBillSponsor(bill)
        const votes = getBillVotes(bill)
        return (<div>
            <div>{bill.identifier}</div>
            <div>{bill.title}</div>
            <br />
            <div>{`Sponsor: ${sponsor.name}, ${sponsor.party}-${sponsor.city}`}</div>
            <div><a href={getBillLawsUrl(bill)} target="_blank">Official LAWS page</a></div>
            <br/>
            <BillActionsViz bill={bill} />
            <br/>
            <VotesViz votes={votes} />
            {/* <Votes bill={bill} /> */}
            
        </div>);
    }
  }

  const Votes = (props) => {
    const bill = props.bill
    const votes = getBillVotes(bill)
    // TODO - break this out into handling
    // TODO: Add second chamber
    
    const secondReadings = ['2nd Reading Passed', '2nd Reading Failed', '2nd Reading Passed as Amended']
    const firstChamberVote = votes.find(v => secondReadings.includes(v.bill_action))
    if (!firstChamberVote) return <div>No floor vote recorded</div>

    return <div>
        {/* <div>Second reading</div> */}
        <SingleVoteViz vote={firstChamberVote}/>
    </div>
  }

export default SingleBillView