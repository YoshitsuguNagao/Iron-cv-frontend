import React, { Component } from 'react'
export default class Description extends Component {
  state = {
    textInput: '',
  }

  // handleInput = (event) => {
  //   let setInput =  this.setState({
  //     [event.target.name] : event.target.value,
  //   })
  //   let sendInputUp = this.props.handleOnChange(event.target.name, this.state[[`${event.target.name}`]])
  //   Promise.all([setInput, sendInputUp])
  // }

  handleInput = (event) => {
    this.setState({
      textInput: event.target.value,
    })
  }

  // componentDidUpdate(prevProps, prevState){
  //   let fieldName = prevProps.description
  //   let fieldValue = prevProps.value
  //   console.log('compdidup',prevState)
  //   if(prevState[`${fieldName}`] !== fieldValue ) {
  //     console.log("props are different")
  //     this.props.handleOnChange(prevProps.description, prevState[`${fieldName}`])
  //     // this.setState({
  //     //   [prevProps.description] : prevState[`${fieldName}`],
  //     // })
  //   }
  // }

  render() {
    console.log("desctiption render", this.state)
    const { textInput } = this.state;
    const { description } = this.props;

    return (
      <div className="description-container">
        <h3>{description}</h3>
        <textarea type="text" name={description} value={textInput} onChange={this.handleInput}/>
        {/* <textarea type="text" name={description} value={this.props.value} onInputCapture={this.handleInput}/> */}
      </div>
    )
  }
}
