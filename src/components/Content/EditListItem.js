import React, { useState, useEffect } from 'react';
import { withAuth } from '../AuthProvider';


function EditListItem(props) {
  console.log('props', props)
  const listContent = useFormInput(props.listContent)
  const { index, updateListItem, itemType } = props

  useEffect(() => {
    if(props.itemType === 'interest') {
      if(props.interest !== listContent.value) {
      console.log('props[itemType] haha', props.interest,listContent.value)
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
    // props[itemType] = listContent.value;
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




// import React, { Component } from 'react';
// import { withAuth } from '../AuthProvider';


// class EditListItem extends Component {
//   state = {
//     editInput: this.props.listContent,
//   }

//   handleInput = (event) => {
//     this.setState({
//       editInput: event.target.value,
//     })
//   }

//   componentDidUpdate() {
//     if(this.props.itemType === 'Interest') {
//       if(this.state.editInput !== this.props.interest) {
//         this.props.setInterest(this.state.editInput)
//       }
//     } else if (this.props.itemType === 'Soft skill') {
//       if(this.state.editInput !== this.props.softSkill) {
//         this.props.setSoftSkill(this.state.editInput)
//       }
//     } else if (this.props.itemType === 'Hard skill') {
//       if(this.state.editInput !== this.props.hardSkill) {
//         this.props.setHardSkill(this.state.editInput)
//       }
//     }
//   }

//   componentWillMount() {
//     if(this.props.itemType === 'Interest') {
//       this.setState({
//         editInput: this.props.interest
//       })
//     } else if (this.props.itemType === 'Soft skill') {
//       this.setState({
//         editInput: this.props.softSkill
//       })
//     } else if (this.props.itemType === 'Hard skill') {
//       this.setState({
//         editInput: this.props.hardSkill
//       })
//     }
//   }

//   render() {
//     const { editInput } = this.state;
//     const { index, updateListItem, itemType } = this.props
//     return (
//       <div className="edit-list-item-container">
//         <div className="edit-list-item-word">
//           <input type="text" value={editInput} onChange={this.handleInput} placeholder={itemType}/>
//         </div>
//         <div className="list-item-btns">
//           <button className="save-btn" onClick={() => {updateListItem(index, editInput)}}>Save</button>
//         </div>
//       </div>
//     )
//   }
// }

// export default withAuth()(EditListItem)


