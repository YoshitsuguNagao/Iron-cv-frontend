import React, { Component } from 'react'

class CvTitle extends Component {
  state = {
    isUploaded: false,
  }

  handleUpload = () => {
    this.setState({
      isUploaded: true
    })
  }

  

  render() {
    const { firstName, lastName } = this.props.user.contact;
    const { headline, summary } = this.props.cv;
    return (
      <article className="cv-title-article">
        <img src={require("../../images/logo.png")} alt="profile"/>
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