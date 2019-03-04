import React, { Component } from 'react';
import CV from '../components/CV/CV';
import Edit from '../components/Edit';
import './EditCV.css';
import { withAuth } from '../components/AuthProvider';

class EditCV extends Component {
  state = {
    contents: [],
  }

  render() {
    return (
      <div className="edit-cv-container">
        <CV />
        <Edit />
      </div>
    )
  }
}

export default withAuth()(EditCV);
