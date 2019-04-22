import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import image from './../images/vote-buttons.jpg'
import styles from './Home.module.css'

import LawmakerSummary from './../components/LawmakerSummary'
import ButtonBar from './../components/ButtonBar'
import EmailForm from './../components/EmailForm'

import {getAllBills, getFloorVotes, getHouseLawmakers, getSenateLawmakers, getUpdateDate} from './../js/handling.js'

import {format} from 'd3'

const fNum = format(',')

const chambers = [
    {
        chamber: 'Montana House',
        chamberLawmakers: getHouseLawmakers
    },
    {
        chamber: 'Montana Senate',
        chamberLawmakers: getSenateLawmakers
    },
]

class Home extends Component {
    constructor(props){
        super(props)
        this.state = chambers[0]
    }
    render(){
        return(
        <div>
            
            <h1>NEWS APP: Tracking the 2019 Montana Legislature</h1>
            <div className='image'>
                <img src={image} alt=''/>
                <div className="image-credit">Photo by John S. Adams</div>
            </div>
            <div className="article" >
                <div className={styles.byline}>
                    By <a href="http://www.montanafreepress.org/author/edietrich/">Eric Dietrich</a>, Montana Free Press
                </div>
                <div className={styles.update}>Last updated {getUpdateDate()}</div>

                <p>As Montanans, we have a constitutionally guaranteed <a href="https://leg.mt.gov/bills/mca/CONSTITUTION/II/9.htm"> right to know what our government is up to</a>. But with <span className={styles.number}>{fNum(getAllBills().length)} bills</span> introduced in the Montana Legislature’s 2019 session and <span className={styles.number}>{fNum(getFloorVotes().length)} votes</span> recorded as lawmakers debate them, there’s enough going on in the Capitol that it’s tricky for anyone who can't follow things full-time to keep up.</p>

                <p>This Montana Free Press news app aims to help our readers stay on top of the legislative action, tabulating data from the state <a href='http://laws.leg.mt.gov/legprd/law0203w$.startup?P_SESS=20191'>LAWS system</a> that we’ve collected using code adapted from the <a href="https://openstates.org/">OpenStates</a> project. Note that this is currently a beta product, meaning that we think it's far enough along to be useful but  acknowledge that it may still have some bugs to work out.</p>

                <p>We plan to add more features to the app going forward (especially if readers like you tell us this is useful) but for the time being here’s what this project lets you do:</p>

                <ul className={styles.linksContainer}>
                    <li>See what bills specific lawmakers have sponsored and how they’ve voted in their respective chambers (e.g., <Link to={`/lawmaker/Greg-Hertz/`}>Speaker of the House Greg Hertz</Link>)</li> 
                    <li>Look up your representatives <Link to={`/lawmakers`}>by your home or business address</Link></li>
                    <li>See the key actions and votes taken on individual bills (e.g., <Link to={`/bill/hb1`}>House Bill 1</Link>)</li>
                    <li>See <Link to={`/bills`}>the status of introduced bills</Link></li>
                </ul>

                <p>Have feedback here? We'd love to hear it &mdash; drop a line to Data Reporter Eric Dietrich at <a href="mailto:edietrich@mtfp.org">edietrich@mtfp.org</a>.</p>

            </div>
            <div>this is</div>
            <h2>Legislative summary</h2>
            <div>
                <ButtonBar
                    buttons={[
                        {
                            id: 'house',
                            label: 'Show House',
                            action: (id) => {this.setState(chambers[0])}
                        },
                        {
                            id: 'senate',
                            label: 'Show Senate',
                            action: (id) => {this.setState(chambers[1])},
                        }
                    ]}
                    initial='house'
                />
                <h3>{this.state.chamber}</h3>
                <LawmakerSummary lawmakers={this.state.chamberLawmakers()} />
            </div>
            
        </div>
        )
    }
}

export default Home