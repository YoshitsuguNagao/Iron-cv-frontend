import React, { Component } from 'react';
import './Edit.css'
import Tabs from './Tabs';
import Content from './Content';
import { withRouter } from "react-router";

class Edit extends Component {
  status = {
    selectTab: 'profile'
  }

  render() {
    // const { url } = this.props.match;
    // console.log(url)
    const { selectTab } = this.state;
    return (
      <div className="edit-component-container">
        <Tabs selectTab={selectTab}/>
        <div className="edit-content-container">
          <Content />
        </div>
      </div>
    )
  }
}

export default withRouter(Edit)
