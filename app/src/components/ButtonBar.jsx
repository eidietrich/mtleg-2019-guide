import React, { Component } from 'react'

import styles from './ButtonBar.module.css'

class ButtonBar extends Component {
    constructor(props){
        super(props)

        this.state = {
            active: this.props.initial,
        }
    }
    
    render(){
        const buttons = this.props.buttons.map(button => this.makeButton(button))
        return <div>
            {buttons}
        </div>
    }

    buildClickHandler(button){
        return () => {
            this.setState({active: button.id})
            button.action(button.id)
        }
    }

    makeButton(button){
        const className = (button.id === this.state.active) ? styles.active : null
        return <button key={button.id}
            className={className}
            onClick={this.buildClickHandler(button)}>
            {button.label}
        </button>
    }

}

export default ButtonBar