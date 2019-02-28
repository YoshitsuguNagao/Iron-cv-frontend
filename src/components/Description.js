import React, { Component } from 'react'

export default class Description extends Component {
  state = {
    textInput: '',
  }

  handleInput = (event) => {
    this.setState({
      textInput: event.target.value,
    })
  }

  render() {
    const { textInput } = this.state;
    return (
      <div className="description-container">
        <h3>description</h3>
        <textarea type="text" value={textInput} onChange={this.handleInput}/>
      </div>
    )
  }
}
