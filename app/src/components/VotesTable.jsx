import React, { Component } from 'react'
import ReactTable from "react-table";
import 'react-table/react-table.css'

// import { getLastBillAction } from './../js/handling'

class VotesTable extends Component {
    render() {
        const data = this.props.votes
        const columns = []
    
        return (<div>
            <div>Showing votes table. It has {data.length} votes.</div>
            <ReactTable
                data={data}
                columns={columns}
            />
        </div>);
    }
  }

export default VotesTable