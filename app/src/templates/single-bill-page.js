import React, { Component } from 'react'
import Layout from "../components/layout"
import { Link } from 'gatsby'
import SEO from '../components/seo'

import BillActionsViz from '../components/BillActionsViz'
import BillStatus from '../components/BillStatus'

import styles from './single-bill-page.module.css'

import { getLawmakerUrlName } from '../process/handling'

class SingleBillView extends Component {
    render() {
        const { bill } = this.props.pageContext
        const sponsor = bill.sponsor
        return (<Layout>
            <SEO
                title={`${bill.identifier} | News App: Tracking the 2019 Legislature`}
                description={`${bill.identifier}: ${bill.title}`}
            />
            
            <h1>{bill.identifier}</h1>
            <div className={styles.title}>{bill.title}</div>
            <div className={styles.sponsor}>Sponsor: <Link to={`/lawmaker/${getLawmakerUrlName({name: sponsor})}`}>{sponsor}</Link></div>
            <div className={styles.billText}>Bill text: <a href={bill.textUrl} target="_blank" rel="noopener noreferrer">As {bill.textType}</a></div>
            <BillStatus bill={bill} />
            
            <h2>Bill Process</h2>
            <BillActionsViz bill={bill} />
            <div className={styles.note}>
                <p>Note: Coloring in the vote outcome column does not currently account for votes that require more than a simple majority to pass. Putting a constitutional amendment before voters, for example, takes approval from two-thirds of lawmakers across both houses. Additionally, bills that authorize state debt must pass with two-thirds supermajorities in each legislative chamber.</p>
            </div>

            <br />
            <div className={styles.note}>Data: The <a href={bill.source}>official bill page</a> in the Montana LAWS system.</div>
        </Layout>);
    }
  }

export default SingleBillView