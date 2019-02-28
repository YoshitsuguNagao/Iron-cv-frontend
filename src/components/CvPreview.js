import React, { Component } from 'react';
import cv from '../lib/cv-service';
import Home from '../pages/Home';


class CvPreview extends Component {
  
  handleDeleteCV = () => {
    // cv.deleteCv(this.props.cv._id)
    // .then((data) => {
    //   let cvs = data[0].cvs
    //  this.setState({
    //    cvs,
    //  })
    // })
    this.props.deletecv(this.props.cv)
  }
  
  render() {
    return (
      <div className="cv-preview-container">
        <h3>title</h3>
        <img src="" alt=""/>
        <button>edit</button>
        <button onClick={this.handleDeleteCV}>delete</button>
      </div>
    )
  }
}


export default CvPreview;
