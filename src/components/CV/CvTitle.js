import React, { Component } from 'react'

class CvTitle extends Component {
  render() {
    const { firstName, lastName, email, address, phone } =this.props.user.contact;
    return (
      <article className="cv-title-article">
        <img src={require("../../images/logo.png")} alt="profile"/>
        <div className="cv-title-text">
          <h2>{`${firstName} ${lastName}`}</h2>
          <h3>Web developer - JavaScript, ES6, MongoDB, Express.js, React.js, Node.js, HTML & CSS</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta esse qui minus reiciendis laudantium optio magni beatae nisi vero alias consequatur atque, recusandae voluptatem odit placeat est, assumenda tempore culpa?</p>
        </div>
      </article>
    )
  }
}

export default CvTitle