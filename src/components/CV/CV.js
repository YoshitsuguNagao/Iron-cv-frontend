import React, { Component } from 'react';
import './CV.css';
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
  }

  componentDidUpdate() {
    console.log('cdu',this.state.work,this.props.displayContent.work)
    if(this.props.displayContent.work !== this.state.work) {
      this.setState({
        work: this.props.displayContent.work,
      })

    }
  }

  render() {
    const { user, cv } = this.props;
    const { isDisplayContent, displayContent } = this.props;
    const { work } = this.state
    console.log('render cv',displayContent)
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
            {/* {work ? <p>Work</p> : null} */}
            {displayContent.work.map((content,index)=>{
                return <CvWork key={index} content={content}/>
              })
              }
            {

            }
          </div>
         </div>
        </div>
      </div>
    )
    }

  }
}

export default withAuth()(CV)
