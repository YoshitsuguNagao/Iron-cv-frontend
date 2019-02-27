import React, { Component } from 'react';
import './Edit.css'

class Edit extends Component {
  render() {
    return (
      <div className="edit-component-container">
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <a class="nav-link active" href="#">Active</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
        </ul>
      </div>
    )
  }
}

export default Edit
