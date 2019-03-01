import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import styles from './SingleVoteViz.module.css'

import { votePassed, filterVotes, voteCountText, 
    getLawmakerUrlName,
    getAbsentExcusedVotes, getLawmakerByVoteName } from './../js/handling'

class SingleVoteViz extends Component {
    render() {    
        const vote = this.props.vote
        // console.log(vote)
        // const yesVotes = getYesVotes(vote)
        // const noVotes = getNoVotes(vote)

        const excusedVotes = getAbsentExcusedVotes(vote)
        const result = votePassed(vote) ? 'Passed': 'Failed'
        
        return (<div className={styles.SingleVoteViz}>
            <div className={styles.voteHeader}>{`Second Reading, ${vote.start_date}`}</div>
            <div className={styles.result}>
                {`${result} ${voteCountText(vote)}`}
            </div>
            <div className={styles.tableHeader}>
                <div className={styles.yesCol}>GOP for</div>
                <div className={styles.yesCol}>Dem. for</div>
                <div className={styles.noCol}>GOP against</div>
                <div className={styles.noCol}>Dem. against</div>
            </div>
            <div className={styles.tableRows}>
                <div className={styles.yesCol}>
                    <Column votes={filterVotes(vote, 'yes', 'R')} />
                </div>
                <div className={styles.yesCol}>
                    <Column votes={filterVotes(vote, 'yes', 'D')} />
                </div>
                <div className={styles.noCol}>
                    <Column votes={filterVotes(vote, 'no', 'R')} />
                </div>
                <div className={styles.noCol}>
                    <Column votes={filterVotes(vote, 'no', 'D')} />
                </div>
            </div>
        </div>);
    }
  }

const Column = (props) => {
    const votes = props.votes
    if (votes.length === 0) return <div>(None)</div>
    return <div>
        {votes.map(v => Lawmaker(v.voter_name))}
    </div>
}
const Lawmaker = (laws_vote_name) => {
    const lawmaker = getLawmakerByVoteName(laws_vote_name)
    return <div key={lawmaker.laws_vote_name}>
        <Link to={`${process.env.PUBLIC_URL}/lawmaker/${getLawmakerUrlName(lawmaker)}`}>{lawmaker.name}</Link>
    </div>
}

export default SingleVoteViz