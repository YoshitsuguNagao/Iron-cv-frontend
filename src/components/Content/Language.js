import React, { Component } from 'react';
import { withAuth } from '../AuthProvider';

class Language extends Component {
  handleDelete = (index) => {
    this.props.deleteLanguage(index)
  }

  handleEdit = (index) => {
    this.props.languages.language = this.props.listContent.language
    this.props.languages.level = this.props.listContent.level
    this.props.editLanguage(index)
  }

  handleUp = (index) => {
    this.props.upLanguage(index)
  }

  handleDown = (index) => {
    this.props.downLanguage(index)
  }

  render() {
    const { listContent,index } = this.props
    if(listContent) {
      return (
        <div className="list-item-container">
          <div className="list-item-word">
            <p>{listContent.language}</p>
            <p>{listContent.level}</p>
          </div>
          <div className="list-item-btns">
            {/* <button onClick={() => {this.handleUp(index)}}><i className="fas fa-angle-up"></i></button>
            <button onClick={() => {this.handleDown(index)}}><i className="fas fa-angle-down"></i></button> */}
            {/* <button className="edit-btn cv-list-btn" onClick={() => {this.handleEdit(index)}}><i className="fas fa-edit"></i></button>
            <button className="delete-btn" onClick={() => {this.handleDelete(index)}}><i className="fas fa-trash-alt"></i></button> */}
            <button className="ed-btn" onClick={() => { this.handleEdit(index) }}>Edit</button>
            <button className="del-btn" onClick={() => { this.handleDelete(index)} }>Delete</button>
          </div>
        </div>
      )
    } else {
      return null
    }

  }
}

export default withAuth()(Language);
