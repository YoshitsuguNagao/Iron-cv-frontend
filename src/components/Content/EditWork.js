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

  handleUpdate = (index) => {
    this.props.updateContent(index);
  }

  render() {
    const { title, name, startDate, endDate, description, tasks} = this.state.work;
    const { selectedTab,index } = this.props;
    return (
      <div className="content-container">
        <h3>{selectedTab}</h3>
        <div>
          <input type="text" value={title} onChange={this.handlePositionInput} placeholder=" Position / Title" />
        </div>
        <div>
          <input type="text" value={name} onChange={this.handleCompanyInput} placeholder=" Company" />
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
        <h4>Description</h4>
        <textarea type="text" value={description} onChange={this.handleDescriptionInput}/>
        <h4>Tasks/Responsibility</h4>
        {
          tasks.map((task,index) => {
            return <input key={index} type="text" value={task} onChange={this.handleTaskInput}/>
          })
        }
        <button onClick={() => {this.handleUpdate(index)}}>Save</button>
      </div>
    )
  }
}

export default withAuth()(withRouter(EditWork));
