import React, { Component } from 'react';
import CV from '../components/CV/CV';
import Edit from '../components/Edit';
import cv from '../lib/cv-service';
import './EditCV.css';
import { withRouter } from "react-router";
import { withAuth } from '../components/AuthProvider';


class EditCV extends Component {
  fetchCV = () => {
    // const { user } = this.props;
    const { cvId } = this.props.match.params
    cv.getCv(cvId)
      .then((cv) => {
        this.props.setCv(cv);
      })
      .then(()=> {
      })
  }
  componentDidMount(){
    this.fetchCV();
  }
  render() {
    return (
      <div className="edit-cv-container">
        <CV />
        <Edit />
      </div>
    )
  }
}

export default withAuth()(withRouter(EditCV));
