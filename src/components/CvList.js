import React, { Component } from 'react';
import './CvList.css';
import { withAuth } from './AuthProvider';

class CvList extends Component {

  handleDeleteCV = () => {
    this.props.deleteCv(this.props.cv)
  }

  render() {
    const { index, editCv } = this.props;
    const { cv } = this.props;
    return (
      <li>
        <div className="cv-list-container">
          <div className="cv-list-title">
            {/* <h3><a href='#' onClick={this.handleClick}>{cv.name}</a></h3> */}
            <h3><a href={`/edit/${cv._id}`}>{cv.name}</a></h3>
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
