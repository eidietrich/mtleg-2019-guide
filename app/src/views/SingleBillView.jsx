import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import BillActionsViz from '../components/BillActionsViz'
import BillVotesViz from '../components/BillVotesViz'
import BillStatus from '../components/BillStatus'

import styles from './SingleBillView.module.css'
import { getBillSponsor, getLawmakerUrlName, getBillLawsUrl} from './../js/handling'

class SingleBillView extends Component {
    render() {
        const bill = this.props.bill
        const sponsor = getBillSponsor(bill)
        return (<div>
            
            <h1>{bill.identifier}</h1>
            <div className={styles.title}>{bill.title}</div>
            <div className={styles.sponsor}>Sponsor: <Link to={`/lawmaker/${getLawmakerUrlName(sponsor)}`}>{sponsor.name}</Link>, {sponsor.party}-{sponsor.city}</div>
            <BillStatus bill={bill} />
            
            <h2>Process</h2>
            <BillActionsViz bill={bill} />

            <h2>Votes</h2>
            {(bill.votes > 0) ? <BillVotesViz bill={bill} /> : <div>No floor votes</div>}

            <br />
            <div>Data: The <a href={getBillLawsUrl(bill)}>official bill page</a> in the Montana LAWS system.</div>
        </div>);
    }
  }

export default SingleBillView