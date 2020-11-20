import React, { Component } from 'react'
import { Link } from 'gatsby'

import styles from './LawmakerSummary.module.css';

import { getLawmakerUrlName, percentFormat,
    sortByDistrict, sortByLawmakerName, sortByLawmakerValue
 } from './../process/handling'

const columns = [
    {
        key: 'name',
        header: 'Lawmaker',
        content: d => `${d.name} (${d.party})`,
        style: styles.nameCol,
        sortFunction: sortByLawmakerName
    },
    {
        key: 'district',
        header: 'District',
        content: d => `${d.district} / ${d.city}`,
        style: styles.districtCol,
        sortFunction: sortByDistrict,
    },
    {
        key: 'bills',
        header: 'Bills sponsored',
        content: d => d.numSponsoredBills,
        
        style: styles.billNumCol,
        sortFunction: null,
    },
    {
        key: 'majorityVote',
        header: 'Votes with majority of body',
        content: d => percentFormat(d.percentVotesWithMajority),
        style: styles.votePercentCol,
        sortFunction: sortByLawmakerValue('percentVotesWithMajority'),
    },
    {
        key: 'gopVote',
        header: 'Votes with GOP caucus',
        content: d => percentFormat(d.percentVotesWithGopCaucus),
        style: styles.votePercentCol,
        sortFunction: sortByLawmakerValue('percentVotesWithGopCaucus'),
    },
    {
        key: 'demVote',
        header: 'Votes with Dem. caucus',
        content: d => percentFormat(d.percentVotesWithDemCaucus),
        style: styles.votePercentCol,
        sortFunction: sortByLawmakerValue('percentVotesWithDemCaucus'),
    },
]

class Table extends Component {
    constructor(props){
        super(props)
        this.state = {
            sortColumn: columns[0],
            ascending: true,
        }
        this.makeSortHandler = this.makeSortHandler.bind(this)
    }

    makeSortHandler(column){
        if (column.sortFunction === null) return null // catches null sort function
        return () => {
            this.setState({
                sortColumn: column,
                ascending: !this.state.ascending
            })
        }
    }
    
    render() {
        const sortFunction = this.state.ascending ?
            this.state.sortColumn.sortFunction :
            (a,b) => this.state.sortColumn.sortFunction(b,a) // reverses sort
        const lawmakers = this.props.lawmakers
            .sort(sortFunction)
        
        const headers = columns.map(schema => {

            let sortClass = styles.colSortable
            // non-sortable column
            if (schema.sortFunction === null) sortClass = styles.colNotSortable
            // active sort column, ascending or descending
            else if (schema.key === this.state.sortColumn.key && this.state.ascending) sortClass = `${styles.colSortable} ${styles.colActiveSortAsc}`
            else if (schema.key === this.state.sortColumn.key && !this.state.ascending) sortClass = `${styles.colSortable} ${styles.colActiveSortDesc}`
            
            return <div
                key={schema.header}
                className={`${schema.style}`}
                onClick={this.makeSortHandler(schema)}
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

export default Table