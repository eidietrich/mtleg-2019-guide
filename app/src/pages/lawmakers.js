import React, { Component } from 'react'
import { Link } from 'gatsby'
import Layout from "../components/layout"
import HeroImage from "../components/HeroImage"
import SEO from '../components/seo'

import DistrictFromAddressForm from '../components/DistrictFromAddressForm'
import SearchForm from '../components/SearchForm'

import styles from './lawmakers.module.css'

import {lawmakers} from './../data/2019-lawmakers.json'

import { sortByDistrict,
    getLawmakerUrlName,
    lawmakerTitle,
   } from '../process/handling'

class AllLawmakersView extends Component {
    constructor(props){
        super(props)

        this.state = {
            filterLawmakers: [],
            message: null,
            nameFilter: d => true,
        }

        this.setDistrictFilter = this.setDistrictFilter.bind(this)
        this.setMessage = this.setMessage.bind(this)
        this.resetFilter = this.resetFilter.bind(this)
        this.setNameFilter = this.setNameFilter.bind(this)
    }

    resetFilter(){
        this.setState({
            filterLawmakers: [],
            message: null,
            nameFilter: d => true,
        })
    }

    setDistrictFilter(lawmakers){
        this.setState({ filterLawmakers: lawmakers})
    }
    setMessage(message){
        this.setState({message: message})
    }

    setNameFilter(input){
        if (input === '') {
            // set input to true
            this.setState({nameFilter: d => true})
        } else {
            this.setState({nameFilter: d => d.name.toUpperCase().includes(input.toUpperCase())})
        }
    }
    
    render(){
        const renderLawmakers = this.state.filterLawmakers.length > 0 ? 
            lawmakers
                .filter(l => this.state.filterLawmakers.map(d => d.name).includes(l.name))
                .filter(this.state.nameFilter)    
            :
            lawmakers
                .filter(this.state.nameFilter)
        const house = renderLawmakers
            .filter(d => d.chamber === 'house')
            .sort(sortByDistrict)
            .map(Lawmaker)
        const senate = renderLawmakers
            .filter(d => d.chamber === 'senate')
            .sort(sortByDistrict)
            .map(Lawmaker)
        const resetButton = (this.state.filterLawmakers.length > 0) ?
            (<div>
                <button onClick={this.resetFilter}>Reset</button>
                <div className={styles.sourcing}>Address lookup via <a href="https://leg.mt.gov/map/">Montana legislature lookup</a>.</div>
            </div>) : null
            
        return <Layout>
            <SEO
                title="News App: Tracking the 2019 Legislature"
                description="Search 2019 Montana Lawmakers"
            />
            <h1>2019 Montana Lawmakers</h1>

            <HeroImage
                filename='house-floor.jpg'
                alt="House chamber floor"
                credit="Photo by Eliza Wiley"
            />  

            <div className={styles.searchLabel}>Look up legislative districts by address</div>
            <DistrictFromAddressForm setFilter={this.setDistrictFilter} setMessage={this.setMessage}/>
            <div className={styles.searchMessage}>{this.state.message}</div>
            
            <div className={styles.searchLabel}>Search lawmakers by name</div>
            <SearchForm 
                handleInput={this.setNameFilter}
                placeholder='e.g. Greg Hertz'
            />

            <div className={styles.chambers}>
                <div className={styles.chamber}>
                    <h2 className={styles.chamberHeader}>House</h2>
                    <div className={styles.lawmakerContainer}>
                        {house}
                    </div>
                </div>
                <div className={styles.chamber}>
                    <h2 className={styles.chamberHeader}>Senate</h2>
                    <div className={styles.lawmakerContainer}>
                        {senate}
                    </div>
                </div>
                
            </div>
            
            <br/>
            {resetButton}
            
        </Layout>
    }
  
}

const Lawmaker = (lawmaker, i) => {
    const title = lawmakerTitle(lawmaker)
    const url = getLawmakerUrlName(lawmaker)
    // const plural = (length) => (length === 1) ? '' : 's'
    return <Link to={`/lawmaker/${url}`} key={String(i)} className={styles.lawmaker}>
        <div className={styles.district}>{lawmaker.district}</div>
        <div className={styles.name}>{title} {lawmaker.name}</div>
        <div className={styles.locale}>{lawmaker.party}-{lawmaker.city}</div>
        {/* <div className={styles.data}>{lawmaker.numSponsoredBills} bill{plural(lawmaker.numSponsoredBills)} sponsored</div> */}
    </Link>
}
  
export default AllLawmakersView