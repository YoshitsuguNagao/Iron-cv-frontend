import React, { Component } from 'react';

class CvSkills extends Component {
  render () {
    const { softSkills, hardSkills } = this.props.user;
    return (
      <>
        <article className="soft-container">
          { softSkills[0] ? <h4 className="cv-body-title">SOFT SKILLS</h4> : null }
          { softSkills[0] ? <div className="cv-skill-card">{softSkills.map((skill, index) => {
            return <div className="text-skill" key={index}>{skill}</div>
            } )}</div> : null }
        </article>
        <article className="hard-container">
          { hardSkills[0] ? <h4 className="cv-body-title">SKILLS</h4> : null }
          { hardSkills[0] ? <div className="cv-skill-card">{hardSkills.map((skill, index) => {
            return <div className="text-skill" key={index}>{skill}</div>
            } )}</div> : null }
        </article>
      </>
    );
  }
};

export default CvSkills;