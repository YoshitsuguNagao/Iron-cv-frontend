import React, { Component } from 'react'

class CvTitle extends Component {
  render() {
    const { firstName, lastName, email, address, phone } = this.props.user.contact;
    const { headline, summary } = this.props.cv;
    console.log('here', this.props)
    // const { firstName, lastName } =this.props.user.contact;
    return (
      <article className="cv-title-article">
        <img src={require("../../images/logo.png")} alt="profile"/>
        <div className="cv-title-text">
          <h2>{`${firstName} ${lastName}`}</h2>
          <h3>{headline}</h3>
          <p>{summary}</p>
        </div>
      </article>
    )
  }
}

export default CvTitle