import React, { Component } from 'react'
import { Link } from "react-router-dom";

import DistrictFromAddressForm from '../components/DistrictFromAddressForm'

import styles from './AllLawmakersView.module.css'

import { sortBySponsorshipCounts, sortByDistrict,
    getAllLawmakers, getLawmakerUrlName,
    lawmakerTitle,
   } from '../js/handling'
 

class AllLawmakersView extends Component {
    constructor(props){
        super(props)

        this.state = {
            filterLawmakers: [],
            // filterLawmakers: [{name: 'Kimberly Dudik'}]
        }

        this.setFilter = this.setFilter.bind(this)
        this.resetFilter = this.resetFilter.bind(this)
    }

    resetFilter(){
        this.setState({ filterLawmakers: [] })
    }

    setFilter(lawmakers){
        this.setState({ filterLawmakers: lawmakers})
    }
    
    render(){
        const lawmakers = this.state.filterLawmakers.length > 0 ? 
            getAllLawmakers().filter(l => this.state.filterLawmakers.map(d => d.name).includes(l.name)) :
            getAllLawmakers()
        const house = lawmakers
            .filter(d => d.chamber === 'house')
            .sort(sortByDistrict)
            .map(Lawmaker)
        const senate = lawmakers
            .filter(d => d.chamber === 'senate')
            .sort(sortByDistrict)
            .map(Lawmaker)
        console.log(lawmakers)
        return <div>
            <h1>2019 Montana Lawmakers</h1>
            <h3>Find who represents your address</h3>
            <DistrictFromAddressForm setFilter={this.setFilter}/>
            <button onClick={this.resetFilter}>Show all</button>
            <h2>House</h2>
            <div className={styles.lawmakerContainer}>
                {house}
            </div>
            <h2>Senate</h2>
            <div className={styles.lawmakerContainer}>
                {senate}
            </div>
            <div>Address lookup via <a href="https://leg.mt.gov/map/">Montana legislature lookup</a>.</div>
        </div>
    }
  
}

const Lawmaker = (lawmaker, i) => {
    const name = lawmaker.name
    const title = lawmakerTitle(lawmaker)
    const url = getLawmakerUrlName(lawmaker)
    return <Link to={`/lawmaker/${url}`} key={String(i)} className={styles.lawmaker}>
        <div className={styles.district}>{lawmaker.district}</div>
        <div className={styles.name}>{title} {lawmaker.name}</div>
        <div className={styles.locale}>{lawmaker.party}-{lawmaker.city}</div>
        
    </Link>
}
  
export default AllLawmakersView