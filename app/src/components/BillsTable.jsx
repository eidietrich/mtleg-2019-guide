import React, { Component } from 'react'
import ReactTable from "react-table";
import 'react-table/react-table.css'

import { getLastBillAction } from './../js/handling'

class BillsTable extends Component {
    render() {
        console.log(this.props.bills[0])
        // const data = [
        //     {
        //         name: 'Tanner Linsley',
        //         age: 26,
        //         friend: {
        //             name: 'Jason Maurer',
        //             age: 23,
        //         }
        //     }
        // ]
        const data = this.props.bills
            
        const columns = [
            {
            Header: 'Bill',
            accessor: 'identifier', // String-based value accessors!
            maxWidth: 100,
            }, {
            Header: 'Short title',
            accessor: 'title',
            // Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
            }, 
            {
                id: 'lastAction',
                Header: 'Last action',
                accessor: getLastBillAction,
            }
            // {
            // id: 'friendName', // Required because our accessor is not a string
            // Header: 'Friend Name',
            // accessor: d => d.friend.name // Custom value accessors!
            // }, 
            // {
            // // Header: props => <span>Friend Age</span>, // Custom header components!
            // accessor: 'friend.age'
            // }
        ]
    
        return (<div>
            <div>This is a bills table. It has {data.length} bills.</div>
            <ReactTable
                data={data}
                columns={columns}
            />
        </div>);
        
    //   return (
    //     
    //   );
    }
  }

export default BillsTable