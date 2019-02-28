import React, { Component } from 'react';
import './Edit.css'
import Tab from './Tab';
import Content from './Content';

class Edit extends Component {
  render() {
    console.log(this.props)
    return (
      <div className="edit-component-container">
        <ul className="nav nav-tabs">
          <Tab title={'profile'} link={`edit/profile`}/>
          <Tab title={'Work'} link={'/work'}/>
          <Tab title={'Education'} link={'/education'}/>
          <Tab title={'Soft Skills'} link={'/soft-skills'}/>
          <Tab title={'Skills'} link={'/skills'}/>
          <Tab title={'Language'} link={'/laguage'}/>
          <Tab title={'Interests'} link={'/interests'}/>
        </ul>
        <div className="edit-content-container">
          <Content />
        </div>
      </div>
    )
  }
}

export default Edit
