import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import styles from './LawmakerSummary.module.css';

import { getBillsForLawmaker, getLawmakerUrlName,
    sortByDistrict, sortByLawmakerName, sortByLawmakerValue,
    percentVotesWithMajority, percentVotesWithGopCaucus, percentVotesWithDemCaucus,
 } from './../js/handling'

const sortFunctions = [ 
    {key: 'byName', function: sortByLawmakerName},
    {key: 'byDistrict', function: sortByDistrict},
    {key: 'byMajorityVote', function: sortByLawmakerValue('percentVotesWithMajority')},
    {key: 'byGopVote', function: sortByLawmakerValue('percentVotesWithGopCaucus')},
    {key: 'byDemVote', function: sortByLawmakerValue('percentVotesWithDemCaucus')},
]

const columns = [
    {
        header: 'Lawmaker',
        content: d => `${d.name} (${d.party})`,
        sortKey: 'byName',
        style: styles.nameCol,
    },
    
    {
        header: 'District',
        content: d => `${d.district} / ${d.city}`,
        sortKey: 'byDistrict',
        style: styles.districtCol,
    },
    {
        header: 'Bills',
        content: d => getBillsForLawmaker(d).length,
        sortKey: null,
        style: styles.billNumCol,
    },
    {
        header: 'Votes with majority of body',
        content: d => percentVotesWithMajority('', d),
        sortKey: 'byMajorityVote',
        style: styles.votePercentCol,
    },
    {
        header: 'Votes with GOP caucus',
        content: d => percentVotesWithGopCaucus('', d),
        sortKey: 'byGopVote',
        style: styles.votePercentCol,
    },
    {
        header: 'Votes with Dem. caucus',
        content: d => percentVotesWithDemCaucus('', d),
        sortKey: 'byDemVote',
        style: styles.votePercentCol,
    },
]

class LawmakerSummary extends Component {
    constructor(props){
        super(props)
        this.state = {
            sort: sortFunctions[0],
            ascending: true,
        }
        this.handleSort = this.handleSort.bind(this)
    }

    handleSort(colKey){
        return () => {
            this.setState({
                sort: sortFunctions.find(d => d.key === colKey),
                ascending: !this.state.ascending
            })
        }
    }
    
    render() {
        const sortFunction = this.state.ascending ?
            this.state.sort.function :
            (a,b) => this.state.sort.function(b,a) // reverses sort
        const lawmakers = this.props.lawmakers
            .sort(sortFunction)
        
        const headers = columns.map(schema => {

            let sortClass = styles.colSortable
            if (schema.sortKey === null) sortClass = styles.colNotSortable
            if (schema.sortKey === this.state.sort.key && this.state.ascending) sortClass = `${styles.colSortable} ${styles.colActiveSortAsc}`
            if (schema.sortKey === this.state.sort.key && !this.state.ascending) sortClass = `${styles.colSortable} ${styles.colActiveSortDesc}`
            
        
            // let sortGlyph = <span class={styles.sortIcon}>▲▼</span>
            // console.log(schema.sortKey, isActiveSortColumn)
            return <div
                key={schema.header}
                className={`${schema.style}`}
                onClick={schema.sortKey ? this.handleSort(schema.sortKey) : null}
                >
                <span className={sortClass}>{schema.header}</span>
            </div>
        })
            const rows = lawmakers.map((action,i) => Row(action, i))
            return (<div className={styles.table}>
                <div className={styles.header}>{headers}</div>
                <div className={styles.rowsContainer}>{rows}</div>
            </div>);
    }
}

const Row = (lawmaker, i) => {
    const url = getLawmakerUrlName(lawmaker)
    const color = (lawmaker.party === 'R') ? '#b2182b' : '#2166ac'

    const cells = columns.map(schema => {
        return <div
            key={schema.header}
            className={schema.style}
            >
            {schema.content(lawmaker)}
        </div>
    })

    return (<Link
        to={`/lawmaker/${url}`}
        key={String(i)}
        className={styles.row}
        style={{color: color}}>
        {cells}
    </Link>
    )
}

export default LawmakerSummary