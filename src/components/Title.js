import React, { Component } from 'react';
import './Title.css';

export default class Title extends Component {
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
    <div className="title-container">
      <h3>title</h3>
      <input type="text" value={textInput} onChange={this.handleInput}/>
    </div>
    )
  }
}
