import React, { Component } from 'react';
import Tab from './Tab';
import './Tabs.css';
import { withRouter } from "react-router";
import { withAuth } from '../components/AuthProvider'


class Tabs extends Component {
  state = {
    selectedTab: this.props.selectedTab,
  }

  render() {
    const { selectedTab, contents } = this.props;
    return (
      <div className="tabs-container">
        <nav>
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            {
              contents.map((content, index) => {
                if(content.title === selectedTab) {
                  return <Tab nav-item nav-link active title={content.title} ariaSelected="true" key={`${content.title}-${index}`} />
                } else {
                  return <Tab nav-item nav-link title={content.title} ariaSelected="false" key={`${content.title}-${index}`} />
                }
              })
            }
          </div>
        </nav>
      </div>
    )
  }
}

export default withAuth()(withRouter(Tabs));
