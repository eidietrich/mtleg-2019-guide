import React, { Component } from 'react'

import styles from './DistrictFromAddressForm.module.css'

import DistrictMatcher from '../js/DistrictMatcher'

const defaultAddress = '1301 E 6th Ave, Helena, MT 59601'
class DistrictFromAddressForm extends Component {
    constructor(props){
      super(props)
      this.state = {
        value: '1301 E 6th Ave, Helena, MT 59601',
        message: null,
      }

      this.districtMatcher = new DistrictMatcher()

      this.handleSubmit = this.handleSubmit.bind(this)
      this.handleFailedSubmit = this.handleFailedSubmit.bind(this)
      this.handleChange = this.handleChange.bind(this)
      this.handleResult = this.handleResult.bind(this)
    }
    handleChange(event){
      this.setState({value: event.target.value})
    }
  
    handleSubmit(event){
        event.preventDefault()
        // console.log('Submit address', this.state.value)
      this.districtMatcher.matchAddressToLawmakers(this.state.value, this.handleResult, this.handleFailedSubmit)
      // const matchedLawmakers = [{name: 'Kimberly Dudik'}]
      // this.setFilter(matchedLawmakers)
      
    }

    handleResult(lawmakers, location){
      this.setState({message: `Matched to: ${location.address}`})
      this.props.setFilter(lawmakers)
    }

    handleFailedSubmit(){
      this.setState({message: 'Invalid Montana address'})
    }
  
    render(){
      return <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            <input className="text" type="address" value={this.state.value}
              onChange={this.handleChange}
              placeholder={defaultAddress} />
          </label>
          <button type="submit">Submit</button>
          <div className={styles.message}>
            {this.state.message ? this.state.message : null}
          </div>
          
        </form>
      </div>
    }
  
}

export default DistrictFromAddressForm