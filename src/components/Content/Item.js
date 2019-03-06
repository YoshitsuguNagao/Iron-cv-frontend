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

  handleUse = (index) => {
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
        <ul>
          {
            content.tasks.map((task,index) => {
            return (<li key={index}>{task}</li>)
            })
          }
        </ul>
        {isUse ? <button onClick={() => { this.handleUse(index) }}>Use</button>: <button onClick={() => { this.handleUse(index) }}>not Use</button>}
        <button onClick={() => { this.handleEdit(index) }}>edit</button>
        <button onClick={() => { this.handleDelete(index)} }>delete</button>
      </div>
    )
  }
}

export default withAuth()(withRouter(Item));
