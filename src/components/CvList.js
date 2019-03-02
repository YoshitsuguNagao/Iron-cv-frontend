import React, { Component } from 'react';
// import cv from '../lib/cv-service';
// import Home from '../pages/Home';
import './CvList.css';
import { withAuth } from './AuthProvider';
import auth from '../lib/auth-service';



class CvList extends Component {

  handleDeleteCV = () => {
    this.props.deleteCv(this.props.cv)
  }

  // handleClick = () => {
  //   console('cvlist', this.props.contact)
  //   debugger
  //   // this.props.setContact(this.props.contact)
  //   // auth.gutUser()
  //   // .then(data => {
  //   //   console.log(data)
  //   // })
  // }

  render() {
    const { index, editCv } = this.props;
    const { cv } = this.props;
    return (
      <li>
        <div className="cv-list-container">
          <div className="cv-list-title">
            {/* <h3><a href='#' onClick={this.handleClick}>{cv.name}</a></h3> */}
            <h3><a href={`/edit/${cv._id}`} onClick={this.handleClick}>{cv.name}</a></h3>
          </div>
          <div className="cv-list-btn">
            <button onClick={() => { editCv(index) }}>edit</button>
            <button onClick={this.handleDeleteCV}>delete</button>
          </div>
        </div>
      </li>
    )
  }
}


export default withAuth()(CvList);
