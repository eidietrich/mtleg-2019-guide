import React, { Component } from 'react'

import styles from './SingleVoteViz.module.css'

import {  } from './../js/handling'

class SingleVoteViz extends Component {
    render() {    
        const vote = this.props.vote
        console.log(vote)
        
        return (<div className={styles.SingleVoteViz}>
            This is a single vote viz.
        </div>);
    }
  }
export default SingleVoteViz