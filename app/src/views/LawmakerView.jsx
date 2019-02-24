import React, { Component } from 'react'

import BillsProcessViz from './../components/BillsProcessViz'
import LawmakerVotesViz from './../components/LawmakerVotesViz'

import styles from './LawmakerView.module.css'

import { getBillsForLawmaker, getMajorFloorVotesForLawmaker } from './../js/handling'


class LawmakerView extends Component {
    render() {
        const lawmaker = this.props.lawmaker
        const votes = getMajorFloorVotesForLawmaker(lawmaker)
        const bills = getBillsForLawmaker(lawmaker)

        console.log(votes)
        
        return (<div>
            <div className={styles.header}>{lawmaker.name}, {lawmaker.party}-{lawmaker.city}</div>
            <br/>
            <div className={styles.subHead}>Bills sponsored ({bills.length})</div>
            <BillsProcessViz bills={bills} />
            <br />
            <div className={styles.subHead}>Floor votes ({votes.length})</div>
            <LawmakerVotesViz lawmaker={lawmaker} votes={votes} />
            <br/>
            
        </div>);
    }
  }


export default LawmakerView