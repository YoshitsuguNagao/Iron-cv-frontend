import React, { Component } from 'react'

class CvWork extends Component {
  render() {
    const { content } = this.props;
    return (
      <div className="work-cv-container">
        <div className="work-title">{content.title}</div>
        <div className="work-company">{content.name}</div>
        <div className="date-city">
          <div className="work-text">{`${content.startDate.month}/${content.startDate.year} ~ ${content.endDate.month}/${content.endDate.year}`}</div>
          <div className="work-text">{content.city}</div>
        </div>
        <div className="work-text">{content.description}</div>
        <div className="work-text">{content.tasks}</div>
      </div>
    );
  }
};

export default CvWork;
