import React, { Component } from 'react';
import { withAuth } from '../AuthProvider';

class ListItem extends Component {
  handleDelete = (index) => {
    this.props.deleteListItem(index)
  }

  handleEdit = (index) => {
    if(this.props.itemType === 'Interest') {
      this.props.setInterest(this.props.listContent)
    } else if (this.props.itemType === 'Soft skill') {
      this.props.setSoftSkill(this.props.listContent)
    } else if (this.props.itemType === 'Hard skill') {
      this.props.setHardSkill(this.props.listContent)
    }
    this.props.editListItem(index)
  }

  handleUp = (index) => {
    this.props.upListItem(index)
  }

  handleDown = (index) => {
    this.props.downListItem(index)
  }

  render() {
    const { listContent,index } = this.props
    return (
      <div className="list-item-container">
        <div className="list-item-word">
          <p>{listContent}</p>
        </div>
        <div className="list-item-btns">
          <button onClick={() => {this.handleUp(index)}}><i className="fas fa-angle-up"></i></button>
          <button onClick={() => {this.handleDown(index)}}><i className="fas fa-angle-down"></i></button>
          {/* <button onClick={() => {this.handleEdit(index)}}><i className="fas fa-edit"></i></button>
          <button onClick={() => {this.handleDelete(index)}}><i className="fas fa-trash-alt"></i></button> */}
          <button className="ed-btn" onClick={() => { this.handleEdit(index) }}>Edit</button>
          <button className="del-btn" onClick={() => { this.handleDelete(index)} }>Delete</button>
        </div>
      </div>
    )
  }
}

export default withAuth()(ListItem);
