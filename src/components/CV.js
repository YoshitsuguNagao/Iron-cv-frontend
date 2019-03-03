import React, { Component } from 'react';
import './CV.css';
import { Document, Page } from 'react-pdf';


class CV extends Component {
  state = {
numPages: null,
pageNumber: 1,
}
  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  }
 
  render() {
    const { pageNumber, numPages } = this.state;
    return (
      <div className="cv-component-container">
        <div className="cv-view">
          my cv
        </div>
        <div>
          <Document
            file="somefile.pdf"
            onLoadSuccess={this.onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} />
          </Document>
          <p>Page {pageNumber} of {numPages}</p>
        </div>
      </div>
    )
  }
}

export default CV
