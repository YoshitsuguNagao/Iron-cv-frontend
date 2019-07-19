import React, { Component } from 'react';
import Tabs from './Tab/Tabs';
import Content from './Content/Content';
import { withRouter } from "react-router";
import { withAuth } from '../components/AuthProvider';

class Edit extends Component {
  state = {
    selectedTab: this.props.selectedTab,
    contents: [
      {contentType: "profile"},
      {contentType: "work"},
      {contentType: "education"},
      {contentType: "skills"},
      {contentType: "project"},
      {contentType: "languages"},
      {contentType: "interests"}
    ],
  };

  changeView = () => {
    this.props.setPdfView(!this.props.isPdfView)
  }

  render() {
    const { selectedTab, contents } = this.state
    return (
      <div className="edit-component-container">
        <Tabs selectedTab={selectedTab} contents={contents}/>
        <div className="edit-content-container">
          <Content content={contents}/>
          <button className="pdf-change-btn" onClick={() => { this.changeView() }}>change</button>
        </div>
      </div>
    );
  };
};

export default withAuth()(withRouter(Edit));
