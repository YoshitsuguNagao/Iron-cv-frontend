import React, { Component } from 'react'

class CvTitle extends Component {
  render() {
    const { firstName, lastName } = this.props.user.contact;
    const { avatarURL } = this.props.user;
    const { headline, summary } = this.props.cv;
    return (
      <article className="cv-title-article">
        {/* <div> */}
        {/* <img src={require("../../images/logo.png")} alt="profile"/> */}
        {/* <img src={require(`${avatarURL}`)} alt="profile"/> */}
        <img src={avatarURL} alt="profile"/>
        {/* src={require("../../images/logo.png")} */}
        {/* </div> */}
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