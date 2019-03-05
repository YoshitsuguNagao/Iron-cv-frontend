import React, { Component } from 'react';
import { withAuth } from '../AuthProvider';


class EditInterest extends Component {
  state = {
    editInput: this.props.listContent,
  }

  handleInput = (event) => {
    this.setState({
      editInput: event.target.value,
    })
  }

  componentDidUpdate() {
    if(this.props.itemType === 'interest') {
      this.props.interest[0] = this.state.editInput
    } else if (this.props.itemType === 'softSkill') {
      this.props.softSkill[0] = this.state.editInput
    } else if (this.props.itemType === 'hardSkill') {
      this.props.hardSkill[0] = this.state.editInput
    }
  }

  componentWillMount() {
    if(this.props.itemType === 'interest') {
      this.setState({
        editInput: this.props.interest[0]
      })
    } else if (this.props.itemType === 'softSkill') {
      this.setState({
        editInput: this.props.softSkill[0]
      })
    } else if (this.props.itemType === 'hardSkill') {
      this.setState({
        editInput: this.props.hardSkill[0]
      })
    }
  }

  render() {
    const { editInput } = this.state;
    const { index, updateListItem } = this.props
    return (
      <div className="edit-list-item-container">
        <div className="edit-list-item-word">
          <input type="text" value={editInput} onChange={this.handleInput}/>
        </div>
        <div className="list-item-btns">
          <button onClick={() => {updateListItem(index, editInput)}}><i className="fas fa-save"></i></button>
        </div>
      </div>
    )
  }
}

export default withAuth()(EditInterest)
