import React, { Component } from 'react';
import './CV.css';

class CvInterests extends Component {
  render () {
    const { interests } = this.props.user;
    return (
    <article>
      <div className="interests-container">
        { interests[0] ? <h4 className="cv-body-title">INTERESTS</h4> : null }
        <div className="interests-tag">
        { interests[0] ? <div className="cv-interest-card">{interests.map((interest, index) => {
          return <div className="text-interest" key={index}>{interest}</div>
          } )}</div> : null }
        </div>
      </div>
    </article>
    );
  }
};

export default CvInterests;