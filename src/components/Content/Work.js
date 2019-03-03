import React, { Component } from 'react';
import { withRouter } from "react-router";
import { withAuth } from '../AuthProvider';


class Work extends Component {
  // fatchContentInfo = () => {
  //   const { cvId } = this.props.match.params;
  //   const newContent =[]
  //   content.getContent(cvId)
  //     .then(contents => {
  //       contents.map(content => {
  //         console.log(content)
  //       })
  //       this.setState({
  //         work: contents,
  //       })
  //     })
  // }

  handleDelete = () => {
    console.log('delete work',this.props)
    const { index } = this.props;
    this.props.deleteContent(index)
  }

  handleEdit = (index) => {
    this.props.editContent(index)
  }

  render() {
    const { work, index } = this.props;
    // console.log(work)
    return (
      <div className="work-item-conteiner">
        <p>{work.title}</p>
        <p>{work.name}</p>
        <p>{work.description}</p>
        <p>{`${work.startDate.month}/${work.startDate.year} ~ ${work.endDate.month}/${work.endDate.year}`}</p>
        <p>{work.city}</p>
        <ul>
          {
            work.tasks.map((task,index) => {
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

export default withAuth()(withRouter(Work));
