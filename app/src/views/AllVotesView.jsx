import React, { Component } from 'react'

import VotesViz from '../components/VotesViz'

import { getFloorVotes, getAllVotes } from './../js/handling'

class AllVotesView extends Component {
    render() {
        const votes = getAllVotes() // excludes committee votes; votes to table aren't tabulated in LAWS
        return (<div>
            <div>All Votes View</div>
            <div>TK: Filtering options</div>
            <br/>
            <VotesViz votes={votes} />
            
        </div>);
    }
  }

export default AllVotesView