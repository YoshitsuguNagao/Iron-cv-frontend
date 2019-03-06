import React, { Component } from 'react';
import './CV.css';
import CvTitle from './CvTitle';
import CvProfile from './CvProfile';
import CvSkills from './CvSkills';
import CvLanguages from './CvLanguages';
import CvInterests from './CvInterests';
import PDFButton from './PDFButton';
import { withAuth } from '../AuthProvider';


class CV extends Component {
componentDidUpdate() {
  const { isDisplayContent,displayContent } = this.props;
  // console.log('DisplayContent',isDisplayContent)
  console.log('DisplayContent',displayContent)

}

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
         <div className="cv-text-view">
          <div className="secondary">
            <CvSkills user={user} />
            <CvLanguages user={user} />
            <CvInterests user={user} />
            {/* {displayContent.work} */}
          </div>
         </div>
        </div>
      </div>
    )
    }

  }
}

export default withAuth()(CV)
