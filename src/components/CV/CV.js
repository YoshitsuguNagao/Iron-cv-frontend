import React, { Component } from 'react';
import './CV.css';
import cv from '../../lib/cv-service';
import auth from '../../lib/auth-service';
import content from '../../lib/content-service';
import CvTitle from './CvTitle';
import CvProfile from './CvProfile';
import CvSkills from './CvSkills';
import PDFButton from './PDFButton';
import { withAuth } from '../AuthProvider';


class CV extends Component {
  render() {
    const { user, cv } = this.props;
    if (user === '') {
      return (
        <div className="cv-component-container">
          <div className="cv-view">
            my cv
          </div>
        </div>
      )
    } else {
      return (
      <div className="cv-component-container">
          <PDFButton />
        <div className="cv-view">
         <CvTitle user={user} cv={cv}/>
         <CvProfile user={user}/>
         <CvSkills cv={cv} />
        </div>
      </div>
    )
    }

  }
}

export default withAuth()(CV)
