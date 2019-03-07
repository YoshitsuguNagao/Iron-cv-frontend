import React, { Component } from 'react';
import { withRouter } from "react-router";
import { withAuth } from '../AuthProvider';

class EditWork extends Component {
  state = {
    work: this.props.work,
  }


  handlePositionInput = (event) => {
    this.setState({
      work: {...this.state.work, title: event.target.value},
    })
  }

  handleCompanyInput = (event) => {
    this.setState({
      work: {...this.state.work, name: event.target.value},
    })
  }

  handleDescriptionInput = (event) => {
    this.setState({
      work: {...this.state.work, description: event.target.value},
    })
  }

  handleSDMInput = (event) => {
    this.setState({
      work: {...this.state.work, startDate: {...this.state.work.startDate, month: event.target.value}},
    })
  }

  handleSDYInput = (event) => {
    this.setState({
      work: {...this.state.work, startDate: {...this.state.work.startDate, year: event.target.value}},
    })
  }

  handleEDMInput = (event) => {
    this.setState({
      work: {...this.state.work, endDate: {...this.state.work.endDate, month: event.target.value}},
    })
  }

  handleEDYInput = (event) => {
    this.setState({
      work: {...this.state.work, endDate: {...this.state.work.endDate, year: event.target.value}},
    })
  }

  handleTasksInput = (event) => {
    this.setState({
      work: {...this.state.work, tasks: event.target.value},
    })
  }

  handleCityInput = (event) => {
    this.setState({
      work: {...this.state.work, city: event.target.value},
    })
  }

  componentDidUpdate() {
    this.props.work.title = this.state.work.title;
    this.props.work.name = this.state.work.name;
    this.props.work.startDate = this.state.work.startDate;
    this.props.work.endDate = this.state.work.endDate;
    this.props.work.description = this.state.work.description;
    this.props.work.tasks = this.state.work.tasks;
  }

  handleUpdate = (index) => {
    this.props.updateContent(index);
  }

  render() {
    const { title, name, startDate, endDate, description, city, tasks} = this.state.work;
    const { index } = this.props;
    return (
      <div className="content-item-container">
        <h5>Work Experience</h5>
        <div className="edit-content-item-conteiner">
          <input className="input-style width-full" type="text" value={title} onChange={this.handlePositionInput} placeholder="Position / Title" />
        </div>
        <div className="edit-content-item-conteiner">
          <input className="input-style width-full" type="text" value={name} onChange={this.handleCompanyInput} placeholder="Company" />
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
        </div>
          <textarea className="width-full" type="text" value={description} onChange={this.handleDescriptionInput} placeholder="Company Description"/>
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

export default withAuth()(withRouter(EditWork));
