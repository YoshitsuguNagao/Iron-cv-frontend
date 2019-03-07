import React, { Component } from 'react';

class CvPreview extends Component {

  handleDeleteCV = () => {
    this.props.deletecv(this.props.cv)
  };

  render() {
    return (
      <div className="cv-preview-container">
        <h3>My resume</h3>
        <button>edit</button>
        <button onClick={this.handleDeleteCV}>delete</button>
      </div>
    );
  };
};


export default CvPreview;
