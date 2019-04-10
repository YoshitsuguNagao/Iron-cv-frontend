import React, { Component } from 'react'

class CvTitle extends Component {
  render() {
    const { firstName, lastName } = this.props.user.contact;
    const { avatarURL } = this.props.user;
    const { headline, summary } = this.props.cv;
    return (
      <article className="cv-title-article">
      {/* <div> */}
        {/* <img src={require("../../images/dev_eng_19.png")} alt="profile"/> */}
        {/* <img src={require(`${avatarURL}`)} alt="profile"/> */}
        <img src={avatarURL} alt="profile"/>
        {/* <img src={("https://i.pinimg.com/originals/ee/94/62/ee9462aafc151e9a57f4f32d4fd9e1dd.jpg")} alt="profile"/> */}
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