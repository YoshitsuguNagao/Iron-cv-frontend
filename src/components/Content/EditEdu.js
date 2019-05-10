import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router";
import { withAuth } from '../AuthProvider';

function EditEdu(props) {
  const title = useFormInput(props.education.title)
  const name = useFormInput(props.education.name)
  const startDateYear = useFormInput(props.education.startDate.year)
  const startDateMonth = useFormInput(props.education.startDate.month)
  const endDateYear = useFormInput(props.education.endDate.year)
  const endDateMonth = useFormInput(props.education.endDate.month)
  const city = useFormInput(props.education.city)
  const description = useFormInput(props.education.description)
  const tasks = useFormInput(props.education.tasks)
  const { index, updateContent } = props;

  useEffect(() => {
    props.education.title = title.value;
    props.education.name = name.value;
    props.education.startDate.year = startDateYear.value;
    props.education.startDate.month = startDateMonth.value;
    props.education.endDate.year = endDateYear.value;
    props.education.endDate.month = endDateMonth.value;
    props.education.city = city.value;
    props.education.description = description.value;
    props.education.tasks = tasks.value;
  })

  return (
    <div className="content-item-container">
      <h5>Education</h5>
      <div className="edit-content-item-conteiner">
        <input className="input-style width-full" type="text" {...title} placeholder="Study Program"/>
      </div>
      <div className="edit-content-item-conteiner">
        <input className="input-style width-full" type="text" {...name} placeholder="Institution / School"/>
      </div>
      <div className="term-container">
        <div>
          <p><input type="text" className="input-style month-input"  {...startDateMonth} placeholder="mm"/> / <input type="text" className="input-style year-input"  {...startDateYear} placeholder="yyyy"/></p>
        </div>
        <div className="term-icon">~</div>
        <div>
          <p><input type="text" className="input-style month-input"  {...endDateMonth} placeholder="mm"/> / <input type="text" className="input-style year-input"  {...endDateYear} placeholder="yyyy"/></p>
        </div>
      </div>
      <div className="edit-content-item-conteiner">
        <input className="input-style width-half" type="text" {...city} placeholder="City, Country"/>
      </div>
      <div className="edit-content-item-conteiner">
        <textarea className="width-full" type="text" {...description} placeholder="Description"/>
      </div>
      <div className="edit-content-item-conteiner">
        <textarea className="width-full" type="text" {...tasks} placeholder="Tasks / Responsibility"/>
      </div>
      <div className="save-profile-btn">
        <button onClick={() => {updateContent(index)}}>Save</button>
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

export default withAuth()(withRouter(EditEdu));
