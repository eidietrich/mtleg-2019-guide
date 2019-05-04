import React, { Component } from 'react'

import BillsProcessViz from '../components/BillsProcessViz'
import SearchForm from '../components/SearchForm'

import image from './../images/committee.jpg'

import styles from './AllBillsView.module.css'

import { getAllBills } from './../js/handling'

class AllBillsView extends Component {
    constructor(props){
        super(props)

        this.state = {
            billIdFilter: d => true
        }

        this.setBillFilter = this.setBillFilter.bind(this)
    }
    
    setBillFilter(input){
        if (input === '') {
            // set input to true
            this.setState({billIdFilter: d => true})
        } else {
            this.setState({billIdFilter: d => d.identifier.toUpperCase().includes(input.toUpperCase())})
        }
    }

    render() {
        const bills = getAllBills()
            .filter(this.state.billIdFilter)
        return (<div>
            <h1>2019 Montana Bills</h1>
            <div className='image'>
                <img src={image} alt=''/>
                <div className="image-credit">Photo by Eliza Wiley</div>
            </div>

            <div className={styles.searchLabel}>Search bills by number</div>
            <SearchForm 
                handleInput={this.setBillFilter}
                placeholder='e.g. HB 658'
            />

            <BillsProcessViz bills={bills}/>
            <br/>
            <div>Source: LAWS system <a href='http://laws.leg.mt.gov/legprd/LAW0217W$BAIV.return_all_bills?P_SESS=20191'>bills page</a>.</div>
        </div>);
    }
  }

export default AllBillsView