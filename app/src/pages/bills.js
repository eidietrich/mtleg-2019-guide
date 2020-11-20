import React, { Component } from 'react'
// import { Link } from 'gatsby'
import Layout from "../components/layout"
import SEO from '../components/seo'
import HeroImage from "../components/HeroImage"

import BillsProcessViz from '../components/BillsProcessViz'
import SearchForm from '../components/SearchForm'

// import { getAllBills } from './../process/handling'

import {bills} from './../data/2019-bills.json'

import styles from './bills.module.css'

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
        const renderBills = bills
            .filter(this.state.billIdFilter)
        return (<Layout>
            <SEO
                title="News App: Tracking the 2019 Legislature"
                description="Search 2019 Montana bills"
            />
            <h1>2019 Montana Bills</h1>
            <HeroImage
                filename='committee.jpg'
                alt="Legislative committee"
                credit="Photo by Eliza Wiley"
            /> 

            <div className={styles.searchLabel}>Search bills by number</div>
            <SearchForm 
                handleInput={this.setBillFilter}
                placeholder='e.g. HB 658'
            />

            <BillsProcessViz bills={renderBills}/>
            <br/>
            <div>Source: LAWS system <a href='http://laws.leg.mt.gov/legprd/LAW0217W$BAIV.return_all_bills?P_SESS=20191'>bills page</a>.</div>
        </Layout>);
    }
  }

export default AllBillsView