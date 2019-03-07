import React, { Component } from 'react';
import './CV.css';

class CvSkills extends Component {
  render () {
    const { softSkills, hardSkills } = this.props.user;
    return (
    <article>
      <div className="hard-container">
        <h4 className="cv-body-title">SKILLS</h4>
        { hardSkills ? <div className="cv-skill-card">{hardSkills.map((skill, index) => { 
          return <div className="text-skill" key={index}>{skill}</div>
          } )}</div> : null }
      </div>
      <div className="soft-container">
        <h4 className="cv-body-title">SOFT SKILLS</h4>
        <div className="skills-tag">
        { softSkills ? <div className="cv-skill-card">{softSkills.map((skill, index) => { 
          return <div className="text-skill" key={index}>{skill}</div>
          } )}</div> : null }
        </div>
      </div>
    </article>
    )
  }
}

export default CvSkills;