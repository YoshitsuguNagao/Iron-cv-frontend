import React, { Component } from 'react';
import { withAuth } from './AuthProvider';

class CvList extends Component {

  handleDeleteCV = () => {
    this.props.deleteCv(this.props.cv)
  };

  render() {
    const { index, editCv } = this.props;
    const { cv } = this.props;
    return (
      <li>
        <div className="cv-list-container">
          <div className="cv-list-title">
            <h3><a href={`/edit/${cv._id}`}>{cv.name}</a></h3>
          </div>
          <div className="cv-list-btns">
            <button className="cv-list-btn edit-btn" onClick={() => { editCv(index) }}><i className="fas fa-edit"></i></button>
            <button className="cv-list-btn delete-btn" onClick={this.handleDeleteCV}><i className="fas fa-trash-alt"></i></button>
          </div>
        </div>
      </li>
    );
  };
};


export default withAuth()(CvList);
