import React, { Component } from 'react'
import { Link } from "react-router-dom";

import DistrictFromAddressForm from '../components/DistrictFromAddressForm'

import image from './../images/house-floor.jpg'

import styles from './AllLawmakersView.module.css'

import { sortByDistrict,
    getAllLawmakers, getLawmakerUrlName,
    lawmakerTitle, getBillsForLawmaker,
   } from '../js/handling'
 

class AllLawmakersView extends Component {
    constructor(props){
        super(props)

        this.state = {
            filterLawmakers: [],
            message: null,
        }

        this.setFilter = this.setFilter.bind(this)
        this.setMessage = this.setMessage.bind(this)
        this.resetFilter = this.resetFilter.bind(this)
    }

    resetFilter(){
        this.setState({
            filterLawmakers: [],
            message: null,
        })
    }

    setFilter(lawmakers){
        this.setState({ filterLawmakers: lawmakers})
    }
    setMessage(message){
        this.setState({message: message})
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
        const resetButton = (this.state.filterLawmakers.length > 0) ?
            (<div>
                <button onClick={this.resetFilter}>Reset</button>
                <div className={styles.sourcing}>Address lookup via <a href="https://leg.mt.gov/map/">Montana legislature lookup</a>.</div>
            </div>) : null
            
        return <div>
            <h1>2019 Montana Lawmakers</h1>
            <div className='image'>
                <img src={image} alt=''/>
                <div className="image-credit">Photo by Eliza Wiley</div>
            </div>
            
            {/* <div className={styles.searchLabel}>Look up lawmaker by name</div>
            <LawmakerByNameForm setFilter={this.setFilter}/> */}
            <div className={styles.searchLabel}>Look up legislative districts by address</div>
            <DistrictFromAddressForm setFilter={this.setFilter} setMessage={this.setMessage}/>
            <div className={styles.searchMessage}>{this.state.message}</div>

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
            
        </div>
    }
  
}

const Lawmaker = (lawmaker, i) => {
    const title = lawmakerTitle(lawmaker)
    const url = getLawmakerUrlName(lawmaker)
    const bills = getBillsForLawmaker(lawmaker)
    const plural = (l) => (l.length === 1) ? '' : 's'
    return <Link to={`${process.env.PUBLIC_URL}/lawmaker/${url}`} key={String(i)} className={styles.lawmaker}>
        <div className={styles.district}>{lawmaker.district}</div>
        <div className={styles.name}>{title} {lawmaker.name}</div>
        <div className={styles.locale}>{lawmaker.party}-{lawmaker.city}</div>
        <div className={styles.data}>{bills.length} bill{plural(bills)} sponsored</div>
    </Link>
}
  
export default AllLawmakersView