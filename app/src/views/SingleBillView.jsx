import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import BillActionsViz from '../components/BillActionsViz'
import BillVotesViz from '../components/BillVotesViz'
import BillStatus from '../components/BillStatus'

import styles from './SingleBillView.module.css'
import { getBillSponsor, getBillVotes, getLawmakerUrlName,
     getBillLawsUrl, getBillTextType, getBillTextUrl} from './../js/handling'

class SingleBillView extends Component {
    render() {
        const bill = this.props.bill
        if (!bill) return (<div>
            <p>No bill here.</p>
            <p><Link className={styles.headerLink} to={`/bills`}>See all bills</Link>.</p>
        </div>)
        
        const sponsor = getBillSponsor(bill)
        return (<div>
            
            <h1>{bill.identifier}</h1>
            <div className={styles.title}>{bill.title}</div>
            <div className={styles.sponsor}>Sponsor: <Link to={`/lawmaker/${getLawmakerUrlName(sponsor)}`}>{sponsor.name}</Link>, {sponsor.party}-{sponsor.city}</div>
            <div className={styles.billText}>Bill text: <a href={getBillTextUrl(bill)} target="_blank" rel="noopener noreferrer">As {getBillTextType(bill)}</a></div>
            <BillStatus bill={bill} />
            
            <h2>Process</h2>
            <BillActionsViz bill={bill} />

            <h2>Votes</h2>
            {(getBillVotes(bill).length > 0) ? <BillVotesViz bill={bill} /> : <div>No votes recorded</div>}

            <br />
            <div className={styles.note}>Data: The <a href={getBillLawsUrl(bill)}>official bill page</a> in the Montana LAWS system.</div>
        </div>);
    }
  }

export default SingleBillView