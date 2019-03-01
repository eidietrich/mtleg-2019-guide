import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import image from './../images/vote-buttons.jpg'
import styles from './Home.module.css'

import LawmakerSummary from './../components/LawmakerSummary'
import ButtonBar from './../components/ButtonBar'

import {getAllBills, getFloorVotes, getHouseLawmakers, getSenateLawmakers, getUpdateDate} from './../js/handling.js'

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
                <div className="image-credit">Photo by Eliza Wiley</div>
            </div>
            <div className="article" >
                <div className={styles.byline}>
                    By <a href="http://www.montanafreepress.org/author/edietrich/">Eric Dietrich</a>, Montana Free Press
                </div>
                <div className={styles.update}>Last updated {getUpdateDate()}</div>

                <p>As Montanans, we have constitutionally guaranteed <a href="https://leg.mt.gov/bills/mca/CONSTITUTION/II/9.htm">a right to know what our government is up to</a>. But with <span className={styles.number}>{getAllBills().length} bills</span> introduced before the Montana Legislature’s 2019 session and <span className={styles.number}>{getFloorVotes().length} votes</span> recorded as lawmakers debate them, there’s enough going on in the Capitol it’s tricky for anyone who can't follow things full-time to keep up with what exactly the the Legislative Branch is doing.</p>

                <p>This Montana Free Press news app aims to help our readers there, tabulating data from the state <a href='http://laws.leg.mt.gov/legprd/law0203w$.startup?P_SESS=20191'>LAWS system</a> that we’ve collected using code adapted from the <a href="https://openstates.org/">OpenStates</a> project. Note this is currently a beta product, meaning that we think it's far enough along to be useful but may not have worked out all the bugs.</p>

                <p>We have plans to add more features here going forward (especially if readers like you tell us this is useful) but for the time being here’s what this project lets you do:</p>

                <ul className={styles.linksContainer}>
                    <li>See what bills specific lawmakers (e.g., <Link to={`${process.env.PUBLIC_URL}/lawmaker/Greg-Hertz/`}>Speaker of the House Greg Hertz</Link>) have sponsored and how they’ve voted in their respective chambers</li>
                    <li>Look up your representatives <Link to={`${process.env.PUBLIC_URL}/lawmakers`}>by your home or business address</Link></li>
                    <li>See the key actions and votes taken on individual bills (e.g., <Link to={`${process.env.PUBLIC_URL}/bill/hb1`}>House Bill 1</Link>)</li>
                    <li>See <Link to={`${process.env.PUBLIC_URL}/bills`}>the status of introduced bills</Link></li>
                </ul>

            </div>
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