// import React, { Component } from 'react';
// import { withAuth } from '../AuthProvider';

// class EditLanguage extends Component {
//   state = {
//     editLanguageInput: this.props.listContent.language,
//     editLevelInput: this.props.listContent.level,
//   }

//   handleLanguageInput = (event) => {
//     this.setState({
//       editLanguageInput: event.target.value,
//     })
//   }

//   handleLevelInput = (event) => {
//     this.setState({
//       editLevelInput: event.target.value,
//     })
//   }

//   componentDidUpdate() {
//     this.props.languages.language = this.state.editLanguageInput
//     this.props.languages.level = this.state.editLevelInput
//   }

//   componentWillMount() {
//     this.setState({
//       editLanguageInput: this.props.languages.language,
//       editLevelInput: this.props.languages.level
//     })
//   }

//   render() {
//     const { editLanguageInput, editLevelInput } = this.state;
//     const { index, updateLanguage } = this.props
//     return (
//       <div className="edit-list-item-container">
//         <div className="edit-list-item-word">
//           <input type="text" value={editLanguageInput} onChange={this.handleLanguageInput} placeholder="language"/>
//           <input type="text" value={editLevelInput} onChange={this.handleLevelInput} placeholder="level"/>
//         </div>
//         <div className="list-item-btns">
//           <button className="save-btn" onClick={() => {updateLanguage(index, editLanguageInput, editLevelInput)}}>Save</button>
//         </div>
//       </div>
//     )
//   }
// }

// export default withAuth()(EditLanguage)




import React, { useState, useEffect } from 'react';
import { withAuth } from '../AuthProvider';

function EditLanguage(props) {
  const language = useFormInput(props.languages.language)
  const level = useFormInput(props.languages.level)
  const { index, updateLanguage } = props;
  useEffect(() => {
    props.languages.language = language.value;
    props.languages.level = level.value;
  })

  return (
    <section className="edit-list-item-container">
      <div className="edit-list-item-word">
        <input {...language} placeholder="language"/>
        <input {...level} placeholder="level"/>
      </div>
      <div className="list-item-btns">
        <button className="save-btn" onClick={() => {updateLanguage(index, language.value, level.value)}}>Save</button>
      </div>
    </section>
  )
}

function useFormInput(initial) {
  const [value, setValue] = useState(initial)
  function handleChange(e) {
    setValue(e.target.value)
  }
  return {
    value,
    onChange: handleChange,
  }
}

export default withAuth()(EditLanguage)
