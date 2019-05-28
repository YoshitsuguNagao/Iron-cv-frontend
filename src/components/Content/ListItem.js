import React, { Component } from 'react';
import { withAuth } from '../AuthProvider';

class ListItem extends Component {
  handleDelete = (index) => {
    this.props.deleteListItem(index);
  }

  handleEdit = (index) => {
    this.props[this.props.setItem](this.props.listContent)
    this.props.editListItem(index)
  }

  handleUp = (index) => {
    this.props.upListItem(index);
  }

  handleDown = (index) => {
    this.props.downListItem(index);
  }

  render() {
    const { listContent,index } = this.props
    return (
      <div className="list-item-container">
        <div className="list-item-word">
          <p>{listContent}</p>
        </div>
        <div className="list-item-btns">
          <button className="arrow-btn" onClick={() => {this.handleUp(index)}}><i className="fas fa-angle-up"></i></button>
          <button className="arrow-btn" onClick={() => {this.handleDown(index)}}><i className="fas fa-angle-down"></i></button>
          <button className="ed-btn" onClick={() => { this.handleEdit(index) }}>Edit</button>
          <button className="del-btn" onClick={() => { this.handleDelete(index)} }>Delete</button>
        </div>
      </div>
    )
  }
}

export default withAuth()(ListItem);
