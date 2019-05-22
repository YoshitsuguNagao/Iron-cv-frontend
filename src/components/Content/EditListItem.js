import React, { useState, useEffect } from 'react';
import { withAuth } from '../AuthProvider';


function EditListItem(props) {
  const { index, updateListItem, itemType } = props
  const listContent = useFormInput(props[itemType])

  useEffect(() => {
    if(props.itemType === 'interest') {
      if(props.interest !== listContent.value) {
        props.setInterest(listContent.value)
      }
    } else if (props.itemType === 'softSkill') {
      if(props.softSkill !== listContent.value) {
        props.setSoftSkill(listContent.value)
      }
    } else if (props.itemType === 'Hard skill') {
      if(props.hardSkill !== listContent.value) {
        props.setHardSkill(listContent.value)
      }
    }
  })

  return (
    <div className="edit-list-item-container">
      <div className="edit-list-item-word">
        <input type="text" {...listContent} placeholder={itemType}/>
      </div>
      <div className="list-item-btns">
        <button className="save-btn" onClick={() => {updateListItem(index, listContent.value)}}>Save</button>
      </div>
    </div>
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

export default withAuth()(EditListItem)