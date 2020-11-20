import React, { Component } from 'react'
// import ReactTable from "react-table";
// import 'react-table/react-table.css'

// import styles from './BillActionsViz.module.css';

import './tableStyles.css'

import BillAction from './BillAction'

import { getImportantActions , dateFormat, parseDate, votePassed,
    gopCaucusVote, demCaucusVote, getVoteLawsUrl,
    voteCountText } from './../process/handling'

class BillActionsViz extends Component {
    render() {
        const bill = this.props.bill
        const actions = getImportantActions(bill)
        const rows = actions.map((action,i) => Row(action, i))
        return (<div className="table">
            <div className="tableHeader">
                <div className="actionCol"></div>
                <div className="dateCol">Date</div>
                <div className="descriptionCol">Action</div>
                <div className="locationCol">Body</div>
                <div className="outcomeCol">Floor vote</div>
                <div className="compareVoteCol">GOP Caucus</div>
                <div className="compareVoteCol">Dem. Caucus</div>
            </div>
            <div className="rowContainer">
                {rows}
            </div>
        </div>);
    }
  }

const color = (d) => {
    if (d === 'yes') return '#91cf60'
    if (d === 'no') return '#fc8d59'
    else return '#ddd'
}
const glyph = (vote) => votePassed(vote) ? '✓': '✗'

const Row = (action, i) => {
    let outcomeCol, demCol, gopCol
    if (action.vote) {
        const vote = action.vote
        outcomeCol = (<div className="outcomeCol"
            style={{backgroundColor: votePassed(vote) ? '#91cf60' : '#fc8d59'}}>
            <a href={getVoteLawsUrl(vote)} target="_blank" rel="noopener noreferrer">
                {`${glyph(vote)}${voteCountText(vote)}`}
            </a>
        </div>)
    } else {
        outcomeCol = <div className="outcomeCol"></div>
    }
    if (action.vote) {
        const gopVote = gopCaucusVote(action.vote)
        gopCol = <div className="compareVoteCol"
            style={{backgroundColor: color(gopVote.caucus)}}>
            {`${gopVote.yes}-${gopVote.no}`}
        </div>
    } else {
        gopCol = <div className="compareVoteCol"></div>
    }
    if (action.vote) {
        const demVote = demCaucusVote(action.vote)
        demCol = <div className="compareVoteCol"
            style={{backgroundColor: color(demVote.caucus)}}>
            {`${demVote.yes}-${demVote.no}`}
        </div>
    } else {
        demCol = <div className="compareVoteCol"></div>
    }

    let location = action.committee
    if (['House','Senate'].includes(location)) location += ' Floor'

    return (<div key={String(i)} className="tableRow">
        <div className="actionCol">
            {BillAction(action, i)}
        </div>
        <div className="dateCol">{dateFormat(parseDate(action.date))}</div>
        <div className="descriptionCol">{action.description}</div>
        <div className="locationCol">{location}</div>
        {outcomeCol}
        {gopCol}
        {demCol}
    </div>)
}

export default BillActionsViz