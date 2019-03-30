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
      this.props.setInterest(this.state.editInput)
      // this.props.interest[0] = this.state.editInput
    } else if (this.props.itemType === 'Soft skill') {
      this.props.softSkill[0] = this.state.editInput
    } else if (this.props.itemType === 'Hard skill') {
      this.props.hardSkill[0] = this.state.editInput
    }
  }

  componentWillMount() {
    if(this.props.itemType === 'Interest') {
      this.setState({
        editInput: this.props.interest
      })
    } else if (this.props.itemType === 'Soft skill') {
      this.setState({
        editInput: this.props.softSkill[0]
      })
    } else if (this.props.itemType === 'Hard skill') {
      this.setState({
        editInput: this.props.hardSkill[0]
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


