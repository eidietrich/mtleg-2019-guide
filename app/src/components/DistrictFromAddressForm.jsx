import React, { Component } from 'react'

import styles from './DistrictFromAddressForm.module.css'

import DistrictMatcher from '../process/DistrictMatcher'

const defaultAddress = 'e.g. 1301 E 6th Ave, Helena, MT 59601'
class DistrictFromAddressForm extends Component {
    constructor(props){
      super(props)
      this.state = {
        value: '',
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
      this.setState({message: `Found ${location.address}`})
      this.props.setFilter(lawmakers)
      this.props.setMessage(`Found ${location.address}`)
    }

    handleFailedSubmit(){
      this.setState({message: 'Invalid Montana address'})
      this.props.setMessage('Invalid Montana address')
    }
  
    render(){
      return <div className={styles.addressForm}>
          <input className={styles.textInput} type="address" value={this.state.value}
              onChange={this.handleChange}
              placeholder={defaultAddress} />
          <button className={styles.searchButton} onClick={this.handleSubmit}>Search</button>
      </div>
    }
  
}

export default DistrictFromAddressForm