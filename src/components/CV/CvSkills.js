import React, { Component } from 'react';

class CvSkills extends Component {
  render () {
    const { softSkills, hardSkills } = this.props;
    return (
    <article>
      { softSkills ? <div className="cv-profile-card">{softSkills}</div> : null }
      { hardSkills ? <div className="cv-profile-card">{hardSkills}</div> : null }
    </article>
    )
  }
}

export default CvSkills;