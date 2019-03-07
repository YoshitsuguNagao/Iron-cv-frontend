import React, { Component } from 'react';
import { withAuth } from '../AuthProvider';


class EditLanguage extends Component {
  state = {
    editLanguageInput: this.props.listContent.language,
    editLevelInput: this.props.listContent.level,
  }

  handleLanguageInput = (event) => {
    this.setState({
      editLanguageInput: event.target.value,
    })
  }

  handleLevelInput = (event) => {
    this.setState({
      editLevelInput: event.target.value,
    })
  }

  componentDidUpdate() {
    this.props.languages.language = this.state.editLanguageInput
    this.props.languages.level = this.state.editLevelInput
  }

  componentWillMount() {
    this.setState({
      editLanguageInput: this.props.languages.language,
      editLevelInput: this.props.languages.level
    })
  }

  render() {
    const { editLanguageInput, editLevelInput } = this.state;
    const { index, updateLanguage } = this.props
    return (
      <div className="edit-list-item-container">
        <div className="edit-list-item-word">
          <input type="text" value={editLanguageInput} onChange={this.handleLanguageInput} placeholder="language"/>
          <input type="text" value={editLevelInput} onChange={this.handleLevelInput} placeholder="level"/>
        </div>
        <div className="list-item-btns">
          {/* <button onClick={() => {updateLanguage(index, editLanguageInput, editLevelInput)}}><i className="fas fa-save"></i></button> */}
          <button className="save-btn" onClick={() => {updateLanguage(index, editLanguageInput, editLevelInput)}}>Save</button>
        </div>
      </div>
    )
  }
}

export default withAuth()(EditLanguage)
