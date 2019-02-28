import React, { Component } from 'react';
import Tab from './Tab';
import './Tabs.css';

class Tabs extends Component {
  render() {
    return (
      <div className="tabs-container">
        <nav>
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <Tab nav-item nav-link active title={'Profile'} ariaSelected="true" />
            <Tab nav-item nav-link title={'Work'} ariaSelected="false" />
            <Tab nav-item nav-link title={'Education'} ariaSelected="false" />
          </div>
        </nav>
      </div>
    )
  }
}

export default Tabs
