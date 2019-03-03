import React, { Component } from 'react';
import { withRouter } from "react-router";
import { withAuth } from '../AuthProvider';
import content from '../../lib/content-service'

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

  handleTaskInput = (event) => {
    this.setState({
      work: {...this.state.work, tasks  : event.target.value},
    })
  }

  componentDidUpdate() {
    this.props.work.title = this.state.work.title;
    this.props.work.name = this.state.work.name;
    this.props.work.startDate = this.state.work.startDate;
    this.props.work.endDate = this.state.work.endDate;
    this.props.work.description = this.state.work.description;
  }

  handleUpdateWork = () => {
    content.createContent(this.state.work, this.props.match.params.cvId)
  }

  render() {
    const { title, name, startDate, endDate, description, task} = this.state.work;
    const { selectedTab } = this.props;
    return (
      <div className="content-container">
        <h3>{selectedTab}</h3>
        <h4>Position</h4>
        <input type="text" value={title} onChange={this.handlePositionInput}/>
        <h4>Company</h4>
        <input type="text" value={name} onChange={this.handleCompanyInput}/>
        <h4>From</h4>
        <p><input type="text" className="month-input"  value={startDate.month} onChange={this.handleSDMInput}/> / <input type="text" className="year-input"  value={startDate.year} onChange={this.handleSDYInput}/></p>
        <h4>To</h4>
        <p><input type="text" className="month-input"  value={endDate.month} onChange={this.handleEDMInput}/> / <input type="text" className="year-input"  value={endDate.year} onChange={this.handleEDYInput}/></p>
        <h4>Description</h4>
        <textarea type="text" value={description} onChange={this.handleDescriptionInput}/>
        <h4>Tasks/Responsibility</h4>
        <input type="text" value={task} onChange={this.handleTaskInput}/>
        <button onClick={this.handleUpdateWork}>Save</button>
      </div>
    )
  }
}

export default withAuth()(withRouter(EditWork));
