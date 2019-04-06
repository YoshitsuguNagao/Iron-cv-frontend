import React, { Component } from 'react'
import { Page, Text, View, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import styled from '@react-pdf/styled-components';

const styles = StyleSheet.create({
  cvView: {
    height: '100%',
    width: '50%',
  },
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  }
});

const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>

      <View style={styles.section}>
    <Text>Section #1</Text>
      </View>
    </Page>
  </Document>
);

class PDFCV extends Component {
  render() {
    return (
        <PDFViewer style={styles.cvView}>
          <MyDocument />
        </PDFViewer>
    )
  }
}

export default PDFCV;
