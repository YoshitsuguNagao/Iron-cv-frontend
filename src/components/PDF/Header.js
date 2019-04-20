import React, { Component } from 'react'

import { Page, Text, View, Image, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  container: {

  },
});
class Header extends Component {
  state = {
    avatarURL: 'https://cors-anywhere.herokuapp.com/' + this.props.user.avatarURL
  }
  render() {
    const { firstName, lastName } = this.props.user.contact;
    // const { avatarURL } = this.props.user;
    const { headline, summary } = this.props.cv;
    return (
      <View style={styles.container}>
        <Image src={this.state.avatarURL}/>
        <Text>{`${firstName} ${lastName}`}</Text>
      </View>

      // <article className="cv-title-article">
      //   <img src={avatarURL} alt="profile"/>
      //   <div className="cv-title-text">
      //     <h2>{`${firstName} ${lastName}`}</h2>
      //     <h3>{headline}</h3>
      //     <p>{summary}</p>
      //   </div>
      // </article>
    );
  }
};

export default Header;