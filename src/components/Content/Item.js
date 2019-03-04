import React, { Component } from 'react';
import { withRouter } from "react-router";
import { withAuth } from '../AuthProvider';

class Item extends Component {
  handleDelete = () => {
    const { index } = this.props;
    this.props.deleteContent(index)
  }

  handleEdit = (index) => {
    this.props.editContent(index)
  }

  render() {
    const { content, index } = this.props;
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
        <button onClick={() => { this.handleEdit(index) }}>edit</button>
        <button onClick={this.handleDelete}>delete</button>
      </div>
    )
  }
}

export default withAuth()(withRouter(Item));
