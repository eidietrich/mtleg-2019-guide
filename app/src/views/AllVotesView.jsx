import React, { Component } from 'react'

import VotesViz from '../components/VotesViz'

import { getSecondReadingVotes, sortVoteByMargin } from './../js/handling'

class AllVotesView extends Component {
    render() {
        const votes = getSecondReadingVotes()
            .sort(sortVoteByMargin)
        return (<div>
            <div>Showing second reading floor votes</div>
            <div>TODO: Separate by chamber</div>
            <div>TK: Filtering options</div>
            <div>TK: Sorting options: By bill number, by vote date, by margin (default)</div>
            <br/>
            <VotesViz votes={votes} />
            
        </div>);
    }
  }

export default AllVotesView