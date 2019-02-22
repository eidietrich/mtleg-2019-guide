import React, { Component } from 'react'

// import { getLastBillAction } from './../js/handling'

class BillsProcessViz extends Component {
    render() {
        const bills = this.props.bills
        const rows = bills.map(bill => BillProcessRow(bill))
    
        return (<div>
            <div>This will return a bills viz. Header material here</div>
            <div>
                {rows}
            </div>
        </div>);
    }
  }

const BillProcessRow = (bill) => {
    return 'This will be a bill process row'
}

export default BillsProcessViz