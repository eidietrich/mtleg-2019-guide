import React, { Component } from 'react'

import styles from './SearchForm.module.css'

class SearchForm extends Component {
    constructor(props){
      super(props)
      this.state = {
        value: '',
      }
      this.handleChange = this.handleChange.bind(this)
    }
    handleChange(event){
        const input = event.target.value
        this.props.handleInput(input)
        this.setState({value: input})
    }
  
    render(){
      return <div className={styles.searchForm}>
          <input className={styles.textInput} type="text"
              value={this.state.value}
              onChange={this.handleChange}
              placeholder={this.props.placeholder} />
      </div>
    }
  
}

export default SearchForm