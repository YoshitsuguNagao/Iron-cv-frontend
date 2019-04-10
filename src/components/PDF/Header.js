import React, { Component } from 'react'

// import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

class Header extends Component {
  render() {
    const { firstName, lastName } = this.props.user.contact;
    const { avatarURL } = this.props.user;
    const { headline, summary } = this.props.cv;
    return (
      <article className="cv-title-article">
        <img src={avatarURL} alt="profile"/>
        <div className="cv-title-text">
          <h2>{`${firstName} ${lastName}`}</h2>
          <h3>{headline}</h3>
          <p>{summary}</p>
        </div>
      </article>
    );
  }
};

export default Header;