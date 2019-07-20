import React, { Component } from 'react';
import { withRouter } from "react-router";
import { withAuth } from '../AuthProvider';

class Item extends Component {
  handleDelete = (index,contentType) => {
    this.props.deleteContent(index,contentType);
  }

  handleEdit = (index,contentType) => {
    this.props.editContent(index,contentType);
  }

  handleDisplay = (index,contentType) => {
    this.props.useContent(index,contentType);
  }

  handleUp = (index) => {
    this.props.upListItem(index)
  }

  handleDown = (index) => {
    this.props.downListItem(index)
  }

  render() {
    const { content, index , isUse } = this.props;
    return (
      <div className="content-item-container">
        <div className="content-text">
          <h6>{content.title}</h6>
          <p>{content.name}</p>
          <p>{content.description}</p>
          <p>{`${content.startDate.month}/${content.startDate.year} ~ ${content.endDate.month}/${content.endDate.year}`}</p>
          <p>{content.city}</p>
          <p>{content.tasks}</p>
        </div>
        <div className="content-btns">
          <button className="arrow-btn" onClick={() => {this.handleUp(index)}}><i className="fas fa-angle-up"></i></button>
          <button className="arrow-btn" onClick={() => {this.handleDown(index)}}><i className="fas fa-angle-down"></i></button>
          {isUse ? <button className="blue-btn" onClick={() => { this.handleDisplay(index,content.contentType) }}>Hide</button>: <button className="blue-btn" onClick={() => { this.handleDisplay(index,content.contentType) }}>Show</button>}
          <button className="blue-btn" onClick={() => { this.handleEdit(index,content.contentType) }}>Edit</button>
          <button className="blue-btn" onClick={() => { this.handleDelete(index,content.contentType)} }>Delete</button>
        </div>
      </div>
    )
  }
}

export default withAuth()(withRouter(Item));
