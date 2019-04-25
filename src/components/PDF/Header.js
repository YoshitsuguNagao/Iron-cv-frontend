import React, { Component } from 'react'

import { Page, Text, View, Image, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  profileImg: {
     width: '100px',
  },
});
class Header extends Component {

  render() {
    const { firstName, lastName } = this.props.user.contact;
    const { avatarURL } = this.props.user;
    const { headline, summary } = this.props.cv;
    return (
      <View style={styles.container}>
        <Image style={styles.profileImg} src={`https://cors-anywhere.herokuapp.com/${avatarURL}`}/>
        <Text>{`${firstName} ${lastName}`}</Text>
        <Text>{`${headline}`}</Text>
        <Text>{`${summary}`}</Text>
      </View>
    );
  }
};

export default Header;