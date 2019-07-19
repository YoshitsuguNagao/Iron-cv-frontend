import React, { Component } from 'react'

class EditCvList extends Component {
  state = {
    editInput: this.props.cv.name,
  };

  handleInput = (event) => {
    this.setState({
      editInput:event.target.value,
    });
  };

  render() {
    const { editInput } = this.state;
    const { updateCv,index } = this.props;
    return (
      <li>
        <div className="cv-list-container">
          <div className="cv-list-title">
            <input className="edit-title" type="text" value={editInput} onChange={this.handleInput}/>
          </div>
          <div className="btn-container">
            <button className="blue-btn" onClick={() => { updateCv(index, editInput) }}>Save</button>
          </div>
        </div>
      </li>
    );
  };
};

export default EditCvList;
