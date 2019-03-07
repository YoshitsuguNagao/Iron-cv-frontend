import React, { Component } from 'react';
import { withRouter } from "react-router";
import { withAuth } from '../AuthProvider';

class Item extends Component {
  handleDelete = (index) => {
    this.props.deleteContent(index);
  }

  handleEdit = (index) => {
    this.props.editContent(index);
  }

  handleDisplay = (index) => {
    this.props.useContent(index);
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
          {isUse ? <button className="using-btn" onClick={() => { this.handleDisplay(index) }}>Hide</button>: <button className="using-btn" onClick={() => { this.handleDisplay(index) }}>Show</button>}
          <button className="ed-btn" onClick={() => { this.handleEdit(index) }}>Edit</button>
          <button className="del-btn" onClick={() => { this.handleDelete(index)} }>Delete</button>
        </div>
      </div>
    )
  }
}

export default withAuth()(withRouter(Item));
