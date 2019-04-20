import React, { Component } from 'react'
// import ReactDOM from 'react-dom';
import { Page, View, Document, StyleSheet } from '@react-pdf/renderer';
import { PDFViewer, BlobProvider } from '@react-pdf/renderer';
// import CV from '../CV/CV';
import Header from './Header'

import { withRouter } from "react-router";
import { withAuth } from '../AuthProvider';
import '../CV/CV.css'

// import styled from '@react-pdf/styled-components';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
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
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Header {...props}/>
      </View>
    </Page>
  </Document>
);
class PDFCV extends Component {
  render() {
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
