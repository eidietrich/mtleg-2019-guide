import React, { Component } from 'react'
import Layout from "../components/layout"
import SEO from '../components/seo'

// import { plotAllVotesForBill } from '../utils.js'


// import EmailForm from './../components/EmailForm'
import ButtonBar from './../components/ButtonBar'
import LawmakerSummary from './../components/LawmakerSummary'


import styles from './index.module.css'

import {getHouseLawmakers, getSenateLawmakers, getUpdateDate,
} from '../process/handling'

const chambers = [
    {
        label: 'Montana House',
        chamberLawmakers: getHouseLawmakers
    },
    {
        label: 'Montana Senate',
        chamberLawmakers: getSenateLawmakers
    },
]

const parties = [
    {
        label: '',
        filter: lawmaker => true
    },
    {
        label: 'Republicans',
        filter: d => d.party === 'R'
    },
    {
        label: 'Democrats',
        filter: d => d.party === 'D'
    },

]

class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
            chamber: chambers[0],
            party: parties[0],
        }
    }
    render(){
        const showLawmakers = this.state.chamber.chamberLawmakers()
            .filter(this.state.party.filter)
        
        return(
        <Layout>
            <SEO
                title="News App: Tracking the 2019 Legislature"
            />
            
            <h1>NEWS APP: Tracking the 2019 Montana Legislature</h1>
            <div className="article" >
                <div className={styles.byline}>
                    By <a href="http://www.montanafreepress.org/author/edietrich/">Eric Dietrich</a>, Montana Free Press
                </div>
                <div className={styles.update}>Last updated {getUpdateDate()}</div>

                {/* <p>As Montanans, we have a constitutionally guaranteed <a href="https://leg.mt.gov/bills/mca/CONSTITUTION/II/9.htm"> right to know what our government is up to</a>. But with <span className={styles.number}>{getAllBills().length} bills</span> introduced in the Montana Legislature’s 2019 session and <span className={styles.number}>{getFloorVotes().length} votes</span> recorded as lawmakers debate them, there’s enough going on in the Capitol that it’s tricky for anyone who can't follow things full-time to keep up.</p> */}

                <p>This Montana Free Press news app aims to help our readers stay on top of the legislative action, tabulating data from the state <a href='http://laws.leg.mt.gov/legprd/law0203w$.startup?P_SESS=20191'>LAWS system</a> collected using code adapted from the <a href="https://openstates.org/">OpenStates</a> project.</p>

                {/* <p>We plan to add more features to the app going forward (especially if readers like you tell us this is useful) but for the time being here’s what this project lets you do:</p>

                <ul className={styles.linksContainer}>
                    <li>See what bills specific lawmakers have sponsored and how they’ve voted in their respective chambers (e.g., <Link to={`/lawmaker/greg-hertz/`}>Speaker of the House Greg Hertz</Link>)</li> 
                    <li>Look up your representatives <Link to={`/lawmakers`}>by your home or business address</Link></li>
                    <li>See the key actions and votes taken on individual bills (e.g., <Link to={`/bill/HB1`}>House Bill 1</Link>)</li>
                    <li>See <Link to={`/bills`}>the status of introduced bills</Link></li>
                </ul> */}

                <p>Note that this is currently a beta product. Have feedback? We'd love to hear it &mdash; drop a line to Data Reporter Eric Dietrich at <a href="mailto:edietrich@mtfp.org">edietrich@mtfp.org</a>.</p>
                {/* <EmailForm /> */}
            </div>
            
            <h2>Legislative summary</h2>
            <div>
                <ButtonBar
                    buttons={[
                        {
                            id: 'house',
                            label: 'Show House',
                            action: (id) => {this.setState({chamber: chambers[0]})}
                        },
                        {
                            id: 'senate',
                            label: 'Show Senate',
                            action: (id) => {this.setState({chamber: chambers[1]})},
                        }
                    ]}
                    initial='house'
                />
                <ButtonBar
                    buttons={[
                        {
                            id: 'all',
                            label: 'Show All Lawmakers',
                            action: (id) => {this.setState({party: parties[0]})}
                        },
                        {
                            id: 'gop',
                            label: 'Show Republicans',
                            action: (id) => {this.setState({party: parties[1]})}
                        },
                        {
                            id: 'dem',
                            label: 'Show Democrats',
                            action: (id) => {this.setState({party: parties[2]})}
                        },
                    ]}
                    initial='all'
                />
                <div className={styles.note}>The majority vote percentage figure indicates how often the lawmaker has voted with at least half their fellow lawmakers in both parties. Party vote statistics indicate how often the lawmaker has voted with a majority of members in that party's caucus. Statistics represent second reading votes only and exclude votes where individual lawmakers were marked absent.</div>
                <h3>{this.state.chamber.label} {this.state.party.label}</h3>
                <LawmakerSummary lawmakers={showLawmakers} />
            </div>
            
        </Layout>
        )
    }
}

export default Home