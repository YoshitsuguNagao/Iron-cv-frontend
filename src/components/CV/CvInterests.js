import React, { Component } from 'react';
import './CV.css';

class CvInterests extends Component {
  render () {
    const { interests } = this.props.user;
    return (
    <article>
      <div className="interests-container">
        <h4 className="cv-body-title">INTERESTS</h4>
        <div className="interests-tag">
        { interests ? <div className="cv-interest-card">{interests.map((interest, index) => { 
          return <div className="text-interest" key={index}>{interest}</div>
          } )}</div> : null }
        </div>
      </div>
    </article>
    );
  }
};

export default CvInterests;