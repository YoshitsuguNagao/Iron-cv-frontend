import React, { Component } from 'react';
// import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import CvTitle from './CvTitle';
import CvProfile from './CvProfile';
import CvSkills from './CvSkills';
import CvLanguages from './CvLanguages';
import CvInterests from './CvInterests';
import PDFButton from './PDFButton';
import { withAuth } from '../AuthProvider';
import CvWork from './CvWork';


class CV extends Component {
  state = {
    work: [],
    education: [],
    project: [],
  };

  componentDidUpdate() {
    if(this.props.displayContent.work !== this.state.work) {
      this.setState({
        work: this.props.displayContent.work,
      });
    } else if (this.props.displayContent.education !== this.state.education) {
      this.setState({
        education: this.props.displayContent.education,
      });
    } else if(this.props.displayContent.project !== this.state.project) {
      this.setState({
        project: this.props.displayContent.project,
      });
    };
  };

  workExperience = () =>{
    const { displayContent } = this.props;
    if(displayContent.work.length > 0) {
      return (
        <div>
          <h4 className="cv-body-title">WORK EXPERIENCE</h4>
          {displayContent.work.map((content,index)=>{
              return <CvWork key={index} content={content}/>
            })
          }
        </div>
      );
    } else {
      return null;
    }
  };

  educationExperience = () =>{
    const { displayContent } = this.props;
    if(displayContent.education.length > 0) {
      return (
        <div>
          <h4 className="cv-body-title">EDUCATION</h4>
          {displayContent.education.map((content,index)=>{
              return <CvWork key={index} content={content}/>
            })
          }
        </div>
      );
    } else {
      return null;
    }
  };

  projectExperience = () =>{
    const { displayContent } = this.props;
    if(displayContent.project.length > 0) {
      return (
        <div>
          <h4 className="cv-body-title">PROJECTS</h4>
          {displayContent.project.map((content,index)=>{
              return <CvWork key={index} content={content}/>
            })
          }
        </div>
      );
    } else {
      return null;
    }
  };

  render() {
    const { user, cv } = this.props;
    if (user === '') {
      return (
        <div className="cv-component-container">
          <div className="cv-view">
            my cv
          </div>
        </div>
      );
    } else {
      return (
      <div className="cv-component-container">
          <PDFButton />
        <div className="cv-view">
         <CvTitle user={user} cv={cv}/>
         <CvProfile user={user}/>
         <div className="cv-text-view">
          <div className="secondary">
            <CvSkills user={user} />
            <CvLanguages user={user} />
            <CvInterests user={user} />
            {this.projectExperience()}
          </div>
          <div className="primary">
            {this.workExperience()}
            {this.educationExperience()}
          </div>
         </div>
        </div>
      </div>
      );
    }
  };
};

export default withAuth()(CV);
