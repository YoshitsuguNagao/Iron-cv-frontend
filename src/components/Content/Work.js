import React, { Component } from 'react';
import content from '../../lib/content-service';
import { withRouter } from "react-router";
import { withAuth } from '../AuthProvider';


class Work extends Component {
  state = {
    work:[]
  }
  fatchContentInfo = () => {
    const { cvId } = this.props.match.params;
    const newContent =[]
    content.getContent(cvId)
      .then(contents => {
        contents.map(content => {
          console.log(content)
        })
        this.setState({
          // work
        })
      })

  }

  componentWillMount() {
    this.fatchContentInfo();
  }

  render() {
    return (
      <div>
        
      </div>
    )
  }
}

export default withAuth()(withRouter(Work));
