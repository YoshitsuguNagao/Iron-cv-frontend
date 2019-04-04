import React, { Component } from 'react';
import { withAuth } from '../AuthProvider';


class EditListItem extends Component {
  state = {
    editInput: this.props.listContent,
  }

  handleInput = (event) => {
    this.setState({
      editInput: event.target.value,
    })
  }

  componentDidUpdate() {
    if(this.props.itemType === 'Interest') {
      if(this.state.editInput !== this.props.interest) {
        this.props.setInterest(this.state.editInput)
      }
    } else if (this.props.itemType === 'Soft skill') {
      if(this.state.editInput !== this.props.softSkill) {
        this.props.setSoftSkill(this.state.editInput)
      }
    } else if (this.props.itemType === 'Hard skill') {
      if(this.state.editInput !== this.props.hardSkill) {
        this.props.setHardSkill(this.state.editInput)
      }
    }
  }

  componentWillMount() {
    if(this.props.itemType === 'Interest') {
      this.setState({
        editInput: this.props.interest
      })
    } else if (this.props.itemType === 'Soft skill') {
      this.setState({
        editInput: this.props.softSkill
      })
    } else if (this.props.itemType === 'Hard skill') {
      this.setState({
        editInput: this.props.hardSkill
      })
    }
  }

  render() {
    const { editInput } = this.state;
    const { index, updateListItem, itemType } = this.props
    return (
      <div className="edit-list-item-container">
        <div className="edit-list-item-word">
          <input type="text" value={editInput} onChange={this.handleInput} placeholder={itemType}/>
        </div>
        <div className="list-item-btns">
          {/* <button onClick={() => {updateListItem(index, editInput)}}><i className="fas fa-save"></i></button> */}
          <button className="save-btn" onClick={() => {updateListItem(index, editInput)}}>Save</button>
        </div>
      </div>
    )
  }
}

export default withAuth()(EditListItem)


