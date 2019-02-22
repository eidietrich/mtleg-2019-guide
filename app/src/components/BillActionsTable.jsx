import React, { Component } from 'react'
import ReactTable from "react-table";
import 'react-table/react-table.css'

// import { getLastBillAction } from './../js/handling'

class BillActionsTable extends Component {
    render() {
        const bill = this.props.bill
        const actions = bill.actions
        const columns = []
    
        return (<div>
            <div>Showing X bill table. It has {actions.length} actions.</div>
            <ReactTable
                data={actions}
                columns={columns}
            />
        </div>);
    }
  }

export default BillActionsTable