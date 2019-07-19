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
        <button className="blue-btn" onClick={() => {updateLanguage(index, language.value, level.value)}}>Save</button>
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
