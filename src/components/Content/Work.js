import React, { Component } from 'react';
import { withAuth } from '../AuthProvider';

class Work extends Component {
  state = {
    work: this.props.work,
  }


  handlePositionInput = (event) => {
    this.setState({
      work: {...this.state.work, positionInput: event.target.value},
    })
  }

  handleCompanyInput = (event) => {
    this.setState({
      work: {...this.state.work, companyInput: event.target.value},
    })
  }

  handleDescriptionInput = (event) => {
    this.setState({
      work: {...this.state.work, descriptionInput: event.target.value},
    })
  }

  handleSDMInput = (event) => {
    this.setState({
      work: {...this.state.work, startDateInput: {...this.state.work.startDateInput, monthInput: event.target.value}},
    })
  }

  handleSDYInput = (event) => {
    this.setState({
      work: {...this.state.work, startDateInput: {...this.state.work.startDateInput, yearInput: event.target.value}},
    })
  }

  handleEDMInput = (event) => {
    this.setState({
      work: {...this.state.work, endDateInput: {...this.state.work.endDateInput, monthInput: event.target.value}},
    })
  }

  handleEDYInput = (event) => {
    this.setState({
      work: {...this.state.work, endDateInput: {...this.state.work.endDateInput, yearInput: event.target.value}},
    })
  }

  componentDidUpdate() {
    this.props.work.positionInput = this.state.work.positionInput;
    this.props.work.companyInput = this.state.work.companyInput;
    this.props.work.startDateInput = this.state.work.startDateInput;
    this.props.work.endDateInput = this.state.work.endDateInput;
    this.props.work.descriptionInput = this.state.work.descriptionInput;
  }


  render() {
    const { positionInput, companyInput, startDateInput, endDateInput, descriptionInput} = this.state.work;
    console.log(this.props)
    const { selectedTab } = this.props;
    return (
      <div className="content-container">
        <h3>{selectedTab}</h3>
        <h4>Position</h4>
        <input type="text" value={positionInput} onChange={this.handlePositionInput}/>
        <h4>Company</h4>
        <input type="text" value={companyInput} onChange={this.handleCompanyInput}/>
        <h4>From</h4>
        <p><input type="text" className="month-input"  value={startDateInput.monthInput} onChange={this.handleSDMInput}/> / <input type="text" className="year-input"  value={startDateInput.yearInput} onChange={this.handleSDYInput}/></p>
        <h4>To</h4>
        <p><input type="text" className="month-input"  value={endDateInput.monthInput} onChange={this.handleEDMInput}/> / <input type="text" className="year-input"  value={endDateInput.yearInput} onChange={this.handleEDYInput}/></p>
        <h4>Description</h4>
        <textarea type="text" value={descriptionInput} onChange={this.handleDescriptionInput}/>

      </div>
    )
  }
}

export default withAuth()(Work);
