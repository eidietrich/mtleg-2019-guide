import React, { Component } from 'react'

import BillActionsViz from '../components/BillActionsViz'

// import { getLastBillAction } from './../js/handling'

class SingleBillView extends Component {
    render() {
        const bill = this.props.bill
        return (<div>
            <div>{bill.identifier}</div>
            <div>{bill.title}</div>
            <br />
            <div>TK Sponsor</div>
            <div>TK Link to LAWS</div>
            <div>TK Bill status</div>
            <BillActionsViz bill={bill} />
        </div>);
    }
  }

export default SingleBillView