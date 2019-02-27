import React, { Component } from 'react';
import CV from '../components/CV';
import Edit from '../components/Edit';
import './EditCV.css';

class EditCV extends Component {
  render() {
    return (
      <div className="edit-cv-container">
        <CV />
        <Edit />
      </div>
    )
  }
}

export default EditCV;
