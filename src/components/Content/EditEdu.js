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
    this.props.education.description = this.state.education.description;
  }

  handleUpdate = (index) => {
    this.props.updateContent(index);
  }

  render() {
    const { title, name, startDate, endDate, description, city, tasks} = this.state.education;
    const { selectedTab,index } = this.props;
    return (
      <div className="content-container">
        <h3>{selectedTab}</h3>
        <div>
          <input type="text" value={title} onChange={this.handlePositionInput} placeholder=" Study Program" />
        </div>
        <div>
          <input type="text" value={name} onChange={this.handleCompanyInput} placeholder=" Institution / School" />
        </div>
        <div className="term-conteiner">
          <div>
            <h5>From</h5>
            <p><input type="text" className="month-input"  value={startDate.month} onChange={this.handleSDMInput} placeholder="mm"/> / <input type="text" className="year-input"  value={startDate.year} onChange={this.handleSDYInput} placeholder="yyyy"/></p>
          </div>
          <div>
            <h5>To</h5>
            <p><input type="text" className="month-input"  value={endDate.month} onChange={this.handleEDMInput} placeholder="mm"/> / <input type="text" className="year-input"  value={endDate.year} onChange={this.handleEDYInput} placeholder="yyyy"/></p>
          </div>
        </div>
        <div>
          <input type="text" value={city} onChange={this.handleCityInput} placeholder=" City, Country" />
        </div>
        <h4>Description</h4>
        <textarea type="text" value={description} onChange={this.handleDescriptionInput}/>
        <h4>Tasks/Responsibility</h4>
        <textarea type="text" value={tasks} onChange={this.handleTasksInput}/>
        {/* {
          tasks.map((task,index) => {
            return <input key={index} type="text" value={task} onChange={this.handleTaskInput}/>
          })
        } */}
        <button onClick={() => {this.handleUpdate(index)}}>Save</button>
      </div>
    )
  }
}

export default withAuth()(withRouter(EditEdu));
