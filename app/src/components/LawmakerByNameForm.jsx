import React, { Component } from 'react'

import styles from './LawmakerByNameForm.module.css'

class LawmakerByNameForm extends Component {
    constructor(props){
      super(props)
      this.state = {
        value: '',
      }

      this.handleSubmit = this.handleSubmit.bind(this)
      this.handleFailedSubmit = this.handleFailedSubmit.bind(this)
      this.handleChange = this.handleChange.bind(this)
      this.handleSuccessSubmit = this.handleSuccessSubmit.bind(this)
    }

    matchName(name, success, failure){
        console.log(name)
    }

    handleChange(event){
      this.setState({value: event.target.value})
    }
  
    handleSubmit(event){
        event.preventDefault()
        this.matchName(this.state.value, this.handleSuccessSubmit, this.handleFailedSubmit)
    }

    handleSuccessSubmit(lawmakers, location){
      console.log(lawmakers)
      this.setState({message: `Found ${location.address}`})
      this.props.setFilter(lawmakers)
    }

    handleFailedSubmit(){
      this.setState({message: 'No name found'})
    }
  
    render(){
      return <div>
          <input className={styles.textInput} type="address" value={this.state.value}
              onChange={this.handleChange}
              placeholder='e.g. Greg Hertz' />
          <button onClick={this.handleSubmit}>Search</button>
          <div className={styles.message}>
            {this.state.message ? this.state.message : null}
          </div>
          
      </div>
    }
  
}

export default LawmakerByNameForm