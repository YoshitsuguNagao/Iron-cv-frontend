import React, { Component } from 'react';
import './CV.css';

class CvSkills extends Component {
  render () {
    const { softSkills, hardSkills } = this.props.user;
    return (
    <article>
      <div className="soft-container">
        <h4>Soft Skills</h4>
        <div className="skills-tag">
        { softSkills ? <div className="cv-skill-card">{softSkills.map((skill, index) => { 
          return <div className="text-skill" key={index}>{skill}</div>
          } )}</div> : null }
        </div>
      </div>
      <div className="hard-container">
        <h4>Hard Skills</h4>
        { hardSkills ? <div className="cv-skill-card">{hardSkills.map((skill, index) => { 
          return <div className="text-skill" key={index}>{skill}</div>
          } )}</div> : null }
      </div>
    </article>
    )
  }
}

export default CvSkills;