import React, { Component } from 'react';
import { withRouter } from "react-router";
import { withAuth } from '../AuthProvider';

class Item extends Component {
  handleDelete = (index) => {
    this.props.deleteContent(index)
  }

  handleEdit = (index) => {
    this.props.editContent(index)
  }

  handleDisplay = (index) => {
    this.props.useContent(index)
  }

  render() {
    const { content, index , isUse } = this.props;
    return (
      <div className="content-item-conteiner">
        <p>{content.title}</p>
        <p>{content.name}</p>
        <p>{content.description}</p>
        <p>{`${content.startDate.month}/${content.startDate.year} ~ ${content.endDate.month}/${content.endDate.year}`}</p>
        <p>{content.city}</p>
        <p>{content.tasks}</p>
        {/* <ul>
          {
            content.tasks.map((task,index) => {
            return (<li key={index}>{task}</li>)
            })
          }
        </ul> */}
        {isUse ? <button className="using-btn" onClick={() => { this.handleDisplay(index) }}>Use</button>: <button className="using-btn" onClick={() => { this.handleDisplay(index) }}>not Use</button>}
        <button className="ed-btn" onClick={() => { this.handleEdit(index) }}>edit</button>
        <button className="del-btn" onClick={() => { this.handleDelete(index)} }>delete</button>
      </div>
    )
  }
}

export default withAuth()(withRouter(Item));
