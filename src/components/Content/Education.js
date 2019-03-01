import React, { Component } from 'react';
import { withAuth } from '../AuthProvider';

class Education extends Component {
  state = {
    education: this.props.education,
  }


  handleDegreeInput = (event) => {
    this.setState({
      education: {...this.state.education, degreeInput: event.target.value},
    })
  }

  handleInstitutionInput = (event) => {
    this.setState({
      education: {...this.state.education, institutionInput: event.target.value},
    })
  }

  handleDescriptionInput = (event) => {
    this.setState({
      education: {...this.state.education, descriptionInput: event.target.value},
    })
  }

  handleSDMInput = (event) => {
    this.setState({
      education: {...this.state.education, startDateInput: {...this.state.education.startDateInput, monthInput: event.target.value}},
    })
  }

  handleSDYInput = (event) => {
    this.setState({
      education: {...this.state.education, startDateInput: {...this.state.education.startDateInput, yearInput: event.target.value}},
    })
  }

  handleEDMInput = (event) => {
    this.setState({
      education: {...this.state.education, endDateInput: {...this.state.education.endDateInput, monthInput: event.target.value}},
    })
  }

  handleEDYInput = (event) => {
    this.setState({
      education: {...this.state.education, endDateInput: {...this.state.education.endDateInput, yearInput: event.target.value}},
    })
  }

  componentDidUpdate() {
    this.props.education.degreeInput = this.state.education.degreeInput;
    this.props.education.institutionInput = this.state.education.institutionInput;
    this.props.education.startDateInput = this.state.education.startDateInput;
    this.props.education.endDateInput = this.state.education.endDateInput;
    this.props.education.descriptionInput = this.state.education.descriptionInput;
  }


  render() {
    const { degreeInput, institutionInput, startDateInput, endDateInput, descriptionInput} = this.state.education;
    console.log(this.props)
    const { selectedTab } = this.props;
    return (
      <div className="content-container">
        <h3>{selectedTab}</h3>
        <h4>Degree</h4>
        <input type="text" value={degreeInput} onChange={this.handleDegreeInput}/>
        <h4>Academic Institution</h4>
        <input type="text" value={institutionInput} onChange={this.handleInstitutionInput}/>
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

export default withAuth()(Education);
