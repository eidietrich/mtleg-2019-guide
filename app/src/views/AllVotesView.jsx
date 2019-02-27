import React, { Component } from 'react'

import VotesViz from '../components/VotesViz'

import { getSecondReadingVotes, sortByBillNumber } from './../js/handling'

class AllVotesView extends Component {
    render() {
        const votes = getSecondReadingVotes()
            .sort(sortByBillNumber)
        return (<div>
            <div>Second reading floor votes</div>
            <VotesViz votes={votes} />
            
        </div>);
    }
  }

export default AllVotesView