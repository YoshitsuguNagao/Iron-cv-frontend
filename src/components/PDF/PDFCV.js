import React, { Component } from 'react'
// import ReactDOM from 'react-dom';
import { Page, View, Document, StyleSheet } from '@react-pdf/renderer';
import { PDFViewer, BlobProvider } from '@react-pdf/renderer';
// import CV from '../CV/CV';
import Header from './Header'

import { withRouter } from "react-router";
import { withAuth } from '../AuthProvider';

// import styled from '@react-pdf/styled-components';
let LOADING = true;
// Create styles
const styles = StyleSheet.create({
  page: {
    // flexDirection: 'row',
    // backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

// Create Document Component
const MyDocument = (props) => (
  <Document onRender={() => { LOADING = false;}}>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Header {...props}/>
      </View>
    </Page>
  </Document>
);
class PDFCV extends Component {
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return !LOADING
  }
  render() {
    // console.log('this.props.', this.props.user)
    return (
      <div className="cv-component-container">
        <PDFViewer>
          <MyDocument {...this.props}/>
        </PDFViewer>
      </div>
    );
  }
}

export default withAuth()(withRouter(PDFCV));
