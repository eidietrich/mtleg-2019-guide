import React, { Component } from 'react'

import BillsProcessViz from './../components/BillsProcessViz'

import { getBillsForLawmaker } from './../js/handling'


class LawmakerView extends Component {
    render() {
        const lawmaker = this.props.lawmaker
        const bills = getBillsForLawmaker(lawmaker)
        return (<div>
            <div>This is a view for {lawmaker.name}</div>
            <div>TK district, committee assignments, etc.</div>
            <br/>
            <div>TK: Key votes</div>
            <br/>
            <div>Bills sponsored ({bills.length})</div>
            <BillsProcessViz bills={bills} />
        </div>);
    }
  }


export default LawmakerView