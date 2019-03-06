import React, { Component } from 'react';
import { withRouter } from "react-router";
import { withAuth } from '../AuthProvider';

class EditProject extends Component {
  state = {
    project: this.props.project,
  }


  handlePositionInput = (event) => {
    this.setState({
      project: {...this.state.project, title: event.target.value},
    })
  }

  handleCompanyInput = (event) => {
    this.setState({
      project: {...this.state.project, name: event.target.value},
    })
  }

  handleDescriptionInput = (event) => {
    this.setState({
      project: {...this.state.project, description: event.target.value},
    })
  }

  handleSDMInput = (event) => {
    this.setState({
      project: {...this.state.project, startDate: {...this.state.project.startDate, month: event.target.value}},
    })
  }

  handleSDYInput = (event) => {
    this.setState({
      project: {...this.state.project, startDate: {...this.state.project.startDate, year: event.target.value}},
    })
  }

  handleEDMInput = (event) => {
    this.setState({
      project: {...this.state.project, endDate: {...this.state.project.endDate, month: event.target.value}},
    })
  }

  handleEDYInput = (event) => {
    this.setState({
      project: {...this.state.project, endDate: {...this.state.project.endDate, year: event.target.value}},
    })
  }

  handleTasksInput = (event) => {
    this.setState({
      project: {...this.state.project, tasks  : event.target.value},
    })
  }

  handleCityInput = (event) => {
    this.setState({
      project: {...this.state.project, city: event.target.value},
    })
  }

  componentDidUpdate() {
    this.props.project.title = this.state.project.title;
    this.props.project.name = this.state.project.name;
    this.props.project.startDate = this.state.project.startDate;
    this.props.project.endDate = this.state.project.endDate;
    this.props.project.description = this.state.project.description;
  }

  handleUpdate = (index) => {
    this.props.updateContent(index);
  }

  render() {
    const { title, name, startDate, endDate, description, city, tasks} = this.state.project;
    const { selectedTab,index } = this.props;
    return (
      <div className="content-container">
        <h3>{selectedTab}</h3>
        <div>
          <input type="text" value={title} onChange={this.handlePositionInput} placeholder=" Project Name" />
        </div>
        <div>
          <input type="text" value={name} onChange={this.handleCompanyInput} placeholder=" Organization" />
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

export default withAuth()(withRouter(EditProject));
