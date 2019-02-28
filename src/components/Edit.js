import React, { Component } from 'react';
import './Edit.css'
import Tab from './Tab';
import Content from './Content';

class Edit extends Component {
  render() {
    return (
      <div className="edit-component-container">
        <ul className="nav nav-tabs">
          <Tab title={'profile'}/>
          <Tab title={'Work Experience'}/>
          <Tab title={'Work Experience'}/>
          <Tab title={'Work Experience'}/>
          <Tab title={'Work Experience'}/>
          <Tab title={'Work Experience'}/>
          <Tab title={'Work Experience'}/>
          <Tab title={'Education'}/>
          <Tab title={'Skills'}/>
        </ul>
        <div className="edit-content-container">
          <Content />
        </div>
      </div>
    )
  }
}

export default Edit
