import React, { Component } from 'react'
// import { Link } from 'gatsby'
import Layout from "../components/layout"
import SEO from '../components/seo'
import HeroImage from "../components/HeroImage"

import ButtonBar from "../components/ButtonBar"

import GovActionSummary from '../components/PullStats'
import GovActionViz from '../components/GovActionViz'

// import { getAllBills } from './../process/handling'

import {bills} from './../data/2019-bills.json'

import styles from './governor.module.css'

// bills that became law w/out governor's signature
// manually imported from LAWS, b/c there isn't an action for this
const lawWithoutGov = [
    'HB 112',
    'SB 300',
    'HB 421',
    'HB 286',
    'HB 722',
    'HB 126',
    'HB 433'
]



/* gov action can be
- Signed
- Vetoed
- Let pass w/out signature
*/

// TODO later - figure out how to manage bills on governor's desk

const govVetoedFilter = bill => bill.actions.find(d => d.description === 'Vetoed by Governor') !== undefined
const govSignedFilter = bill => bill.actions
    .find(d => d.description === 'Signed by Governor') !== undefined
const govLetPassFilter = bill => lawWithoutGov.includes(bill.identifier)

const pullStats = [
    {label: 'Bills vetoed', value: bills.filter(govVetoedFilter).length},
    {label: 'Bills let pass without signature', value: bills.filter(govLetPassFilter).length},
    {label: 'Bills signed into law', value: bills.filter(govSignedFilter).length}
]

class GovernorView extends Component {
    constructor(props){
        super(props)

        this.state = {
            billFilter: govVetoedFilter,
        }
    }

    render() {
        const renderBills = bills.filter(this.state.billFilter)


        return (<Layout>
            <SEO
                title="Governor's Action | News App: Tracking the 2019 Legislature"
                description="What Gov. Steve Bullock has vetoed and signed"
            />
            <h1>2019 Executive Action: Gov. Steve Bullock</h1>
            <HeroImage
                filename='bullock.jpg'
                alt="Montana Governor Steve Bullock"
                credit="Photo by Eliza Wiley"
            /> 

            <p>The 2019 Legislature was the fourth and final session where Bullock, a Democrat, wielded veto power over legislative proposals. Facing term limits, he <a href="http://www.montanafreepress.org/tag/steve-bullock/">has announced a run for U.S. President</a>.</p>
            <div>

            <GovActionSummary data={pullStats} />

            </div>
            <ButtonBar
                    buttons={[
                        {
                            id: 'vetoed',
                            label: 'Vetoed',
                            action: (id) => {this.setState({billFilter: govVetoedFilter})}
                        },
                        {
                            id: 'let pass',
                            label: 'Passed without signature',
                            action: (id) => {this.setState({billFilter: govLetPassFilter})},
                        },
                        {
                            id: 'signed',
                            label: 'Signed',
                            action: (id) => {this.setState({billFilter: govSignedFilter})},
                        }
                    ]}
                    initial='vetoed'
                />
            <div className={styles.note}>Bills become law without the Governor's signature if they aren't signed within 10 days of being sent to the Governor's desk. A veto can be overriden by a two-thirds vote of each legislative chamber. After the Legislature adjourns, veto override votes are conducted by mail. Referendum bills that will put ballot measures before Montana voters, which don't require gubernatorial approval, aren't included here.</div>

            <GovActionViz bills={renderBills}/>
    
            <br/>
            <div>Source: LAWS system <a href='http://laws.leg.mt.gov/legprd/LAW0217W$BAIV.return_all_bills?P_SESS=20191'>bills page</a>.</div>
        </Layout>);
    }
  }

export default GovernorView