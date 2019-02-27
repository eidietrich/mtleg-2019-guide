import React from 'react'
import { Link } from 'react-router-dom'

import image from './../images/vote-buttons.jpg'
import styles from './Home.module.css'

import {getAllBills, getFloorVotes} from './../js/handling.js'

const updateDate = 'FILLER_DATE'

const Home = () => {
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
            <div className={styles.update}>Last updated {updateDate}.</div>
            
            <p>Members of the 2019 Montana Legislature have kept themselves plenty busy this winter. The 50 state senators and 100 state representatives Montanans elected to set a state budget and craft new laws have introduced <span className={styles.number}>{getAllBills().length} bills</span>. Debating those measures, lawmakers, have already taken a total of <span className={styles.number}>{getFloorVotes().length} votes</span> on the House and Senate floors (to make it to the Governor's desk for signing, bills have to pass second- and third-reading votes in both chambers).</p>

            <p>Montanans have a constitutionally-guaranteed <a href="https://leg.mt.gov/bills/mca/CONSTITUTION/II/9.htm">right to know what our government is up to</a>, but with that much activity going on it it's often hard to keep track of what exactly the legislative branch of state government is doing.</p>

            <p>This project aims to make that easier by tabluating data from the legislative branch's <a href='http://laws.leg.mt.gov/legprd/law0203w$.startup?P_SESS=20191'>LAWS system</a>, compiled using web scrapers adapted from <a href="https://openstates.org/">OpenStates.org</a> code. Note it is currently a beta product, meaning that we think it's far enough along to be useful, but may not have worked out all the bugs.</p>

            <ul className={styles.linksContainer}>
                <li className={styles.linkSection}><Link to="/lawmakers">See lawmakers</Link></li>
                <li className={styles.linkSection}><Link to="/bills">See bills</Link></li>
            </ul>
        </div>
    </div>
    )
}

export default Home