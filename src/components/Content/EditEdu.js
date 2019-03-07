import React, { Component } from 'react';
import { withRouter } from "react-router";
import { withAuth } from '../AuthProvider';

class EditEdu extends Component {
  state = {
    education: this.props.education,
  }


  handlePositionInput = (event) => {
    this.setState({
      education: {...this.state.education, title: event.target.value},
    })
  }

  handleCompanyInput = (event) => {
    this.setState({
      education: {...this.state.education, name: event.target.value},
    })
  }

  handleDescriptionInput = (event) => {
    this.setState({
      education: {...this.state.education, description: event.target.value},
    })
  }

  handleSDMInput = (event) => {
    this.setState({
      education: {...this.state.education, startDate: {...this.state.education.startDate, month: event.target.value}},
    })
  }

  handleSDYInput = (event) => {
    this.setState({
      education: {...this.state.education, startDate: {...this.state.education.startDate, year: event.target.value}},
    })
  }

  handleEDMInput = (event) => {
    this.setState({
      education: {...this.state.education, endDate: {...this.state.education.endDate, month: event.target.value}},
    })
  }

  handleEDYInput = (event) => {
    this.setState({
      education: {...this.state.education, endDate: {...this.state.education.endDate, year: event.target.value}},
    })
  }

  handleTasksInput = (event) => {
    this.setState({
      education: {...this.state.education, tasks  : event.target.value},
    })
  }

  handleCityInput = (event) => {
    this.setState({
      education: {...this.state.education, city: event.target.value},
    })
  }

  componentDidUpdate() {
    this.props.education.title = this.state.education.title;
    this.props.education.name = this.state.education.name;
    this.props.education.startDate = this.state.education.startDate;
    this.props.education.endDate = this.state.education.endDate;
    this.props.education.city = this.state.education.city;
    this.props.education.description = this.state.education.description;
  }

  handleUpdate = (index) => {
    this.props.updateContent(index);
  }

  render() {
    const { title, name, startDate, endDate, description, city, tasks} = this.state.education;
    const { index } = this.props;
    return (
      <div className="content-item-container">
        <h5>Education</h5>
        <div className="edit-content-item-conteiner">
          <input className="input-style width-full" type="text" value={title} onChange={this.handlePositionInput} placeholder="Study Program" />
        </div>
        <div className="edit-content-item-conteiner">
          <input className="input-style width-full" type="text" value={name} onChange={this.handleCompanyInput} placeholder="Institution / School" />
        </div>
        <div className="term-container">
          <div>
            <p><input type="text" className="input-style month-input"  value={startDate.month} onChange={this.handleSDMInput} placeholder="mm"/> / <input type="text" className="input-style year-input"  value={startDate.year} onChange={this.handleSDYInput} placeholder="yyyy"/></p>
          </div>
          <div className="term-icon">~</div>
          <div>
            <p><input type="text" className="input-style month-input"  value={endDate.month} onChange={this.handleEDMInput} placeholder="mm"/> / <input type="text" className="input-style year-input"  value={endDate.year} onChange={this.handleEDYInput} placeholder="yyyy"/></p>
          </div>
        </div>
        <div className="edit-content-item-conteiner">
          <input className="input-style width-half" type="text" value={city} onChange={this.handleCityInput} placeholder="City, Country" />
        </div>
        <div className="edit-content-item-conteiner">
          <textarea className="width-full" type="text" value={description} onChange={this.handleDescriptionInput} placeholder="Description"/>
        </div>
        <div className="edit-content-item-conteiner">
          <textarea className="width-full" type="text" value={tasks} onChange={this.handleTasksInput} placeholder="Tasks / Responsibility"/>
        </div>
        <div className="save-profile-btn">
          <button onClick={() => {this.handleUpdate(index)}}>Save</button>
        </div>
      </div>
    )
  }
}

export default withAuth()(withRouter(EditEdu));
