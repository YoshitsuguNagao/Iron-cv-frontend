import React, { Component } from 'react';
import Tab from './Tab';
import { withRouter } from 'react-router';
import { withAuth } from '../AuthProvider';


class Tabs extends Component {
  state = {
    selectedTab: this.props.selectedTab,
  };

  render() {
    const { selectedTab, contents } = this.props;
    return (
      <div className="tabs-container">
        <nav>
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            {
              contents.map((content, index) => {
                if(content.contentType === selectedTab) {
                  return <Tab nav-item nav-link active title={content.contentType} ariaSelected="true" key={`${content.contentType}-${index}`} />
                } else {
                  return <Tab nav-item nav-link title={content.contentType} ariaSelected="false" key={`${content.contentType}-${index}`} />
                }
              })
            }
          </div>
        </nav>
      </div>
    );
  }
};

export default withAuth()(withRouter(Tabs));
