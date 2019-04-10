import React, { Component } from 'react'

class CvTitle extends Component {
  render() {
    const { firstName, lastName } = this.props.user.contact;
    const { avatarURL } = this.props.user;
    const { headline, summary } = this.props.cv;
    return (
      <article className="cv-title-article">
      <div>
        <img src={avatarURL} alt="profile"/>
      </div>
        <div className="cv-title-text">
          <h2>{`${firstName} ${lastName}`}</h2>
          <h3>{headline}</h3>
          <p>{summary}</p>
        </div>
      </article>
    );
  }
};

export default CvTitle;