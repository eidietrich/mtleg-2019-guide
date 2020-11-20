import React, { Component } from 'react'
import { Link } from 'gatsby'

import './tableStyles.css';
import styles from './GovActionViz.module.css'; 

import { 
    sortByBillNumber,
    voteCountText,
    getBillURLId,
    getVoteYesCount,
    getLawmakerUrlName,
    } from '../process/handling'

const keyCleaning = {
    "In Process to Attempt Override of Governor 's Veto": "Veto override vote in process",
    "Veto Override Failed in Legislature": "Veto override vote failed",
    // ??? key for veto override vote passed
    "Probably Dead": "Vetoed"
}
const labelKey = key => (key in keyCleaning) ? keyCleaning[key] : key

const colors = [
    {label: 'Passed with enough votes to override a veto', color: '#57a817' },
    {label: 'Passed without votes to override a veto', color: '#91cf60' },
]
const vetoColor = '#fc8d59'
// const passColor = '#57a817'

const getLastVote = (bill, chamber) => {
    const votes = bill.actions
        .filter(a => a.vote !== null)
        .filter(a => a.chamber === chamber)
        .sort((a,b) => new Date(a.date) - new Date(b.date))
    return votes.slice(-1)[0]
}

const voteAboveTwoThirds = action => {
    if (action.chamber === 'House') return (getVoteYesCount(action.vote) >= 67)
    if (action.chamber === 'Senate') return (getVoteYesCount(action.vote) >= 34)
}

class GovActionViz extends Component {
    render() {
        const bills = this.props.bills

        const groupKeys = Array.from(new Set(bills.map(d => d.status)))
            .sort()

        const tableHeader = <div className="tableHeader">
            <div className="billCol">Bill</div>
            <div className="billTitleCol">Title</div>
            <div className="billSponsorCol">Sponsor</div>
            <div className="outcomeCol">Final House vote</div>
            <div className="outcomeCol">Final Senate vote</div>
            <div className="outcomeCol"></div>
        </div>

        const groups = groupKeys.map(key => {
            const rows = bills.filter(d => d.status === key)
                .sort(sortByBillNumber)
                .map(bill => Row(bill, key))
            return <div key={key}>
                <h2>{labelKey(key)}</h2>
                <div className="table">
                    {tableHeader}
                    <div className="rowContainer">{rows}</div>
                </div>
                
            </div>
        })

        const billCount = <div className={styles.billCount}>Showing {bills.length} bills</div> 

        const legend = <div className={styles.legend}>
            Votes: {colors.map((c,i) => <span key={'color-' + i}style={{backgroundColor: c.color}}>{c.label}</span>)}
        </div> 
    
        return (<div className={styles.billProcessViz}>
            {legend}
            {billCount}    
            {groups}
        </div>);
    }
  }

const Row = (bill, key) => {

    const finalVoteHouse = getLastVote(bill, 'House')
    const finalVoteSenate = getLastVote(bill, 'Senate')

    return (<div key={bill.identifier} className="tableRow">

        <div className="billCol">
           <Link to={`/bill/${getBillURLId(bill)}`}>{bill.identifier}</Link>
        </div>
        <div className="billTitleCol">
           {bill.title}
        </div>
        <div className="billSponsorCol">
           <Link to={`/lawmaker/${getLawmakerUrlName({name: bill.sponsor})}`}>{bill.sponsor} ({bill.sponsorParty})</Link>
        </div>
        <div className="outcomeCol"
            style={{
                backgroundColor: voteAboveTwoThirds(finalVoteHouse) ? colors[0].color : colors[1].color
            }}
        >
            {voteCountText(finalVoteHouse.vote)}
        </div>
        <div className="outcomeCol"
            style={{
                backgroundColor: voteAboveTwoThirds(finalVoteSenate) ? colors[0].color : colors[1].color
            }}
        >
            {voteCountText(finalVoteSenate.vote)}
        </div>
        <div className="outcomeCol"style={{
                backgroundColor: bill.vetoMemoUrl ? vetoColor : 'none'
            }}
        >
            {bill.vetoMemoUrl ? <a href={bill.vetoMemoUrl}>Veto memo</a> : null }
        </div>
    </div>)
}

export default GovActionViz