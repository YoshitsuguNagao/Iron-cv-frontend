import React, { Component } from 'react'

export default class Description extends Component {
  state = {
   textInput: '',
  }

  handleInput = (event) => {
    this.setState({
      [event.target.name] : event.target.value,
      textInput: event.target.value,
    }, () =>{

    })
    {this.state.textInput && this.props.handleOnChange(event.target.name, this.state[[`${event.target.name}`]])}

    // console.log(this.props.handleOnChange(event.target.name, this.state))
 
  }

  render() {
    const { textInput } = this.state;
    const { description } = this.props;
    return (
      <div className="description-container">
        <h3>{description}</h3>
        <textarea type="text" name={description} value={this.props.value} onInput={this.handleInput}/>
      </div>
    )
  }
}
