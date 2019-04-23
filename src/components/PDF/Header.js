import React, { Component } from 'react'

import { Page, Text, View, Image, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  profileImg: {
     width: '100px',
  },
});
class Header extends Component {
  // state = {
  //   avatarURL: '',
  //   firstName: this.props.user.contact.firstName,
  //   lastName: this.props.user.contact.lastName,
  // }

  render() {
    const { firstName, lastName } = this.props.user.contact;
    const { avatarURL } = this.props.user;
    const { headline, summary } = this.props.cv;
    return (
      <View style={styles.container}>
      {/* {console.log('this.props.user.avatarURL', this.props.user.avatarURL)} */}
        {/* <Image style={styles.profileImg} src={`https://cors-anywhere.herokuapp.com/${avatarURL}`}/> */}
        <Text>{`${firstName} ${lastName}`}</Text>
        <Text>{`${headline}`}</Text>
        <Text>{`${summary}`}</Text>

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