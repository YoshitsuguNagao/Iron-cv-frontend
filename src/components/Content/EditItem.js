import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router";
import { withAuth } from '../AuthProvider';

function EditItem(props) {
  const title = useFormInput(props[props.contentType].title)
  const name = useFormInput(props[props.contentType].name)
  const startDateYear = useFormInput(props[props.contentType].startDate.year)
  const startDateMonth = useFormInput(props[props.contentType].startDate.month)
  const endDateYear = useFormInput(props[props.contentType].endDate.year)
  const endDateMonth = useFormInput(props[props.contentType].endDate.month)
  const city = useFormInput(props[props.contentType].city)
  const description = useFormInput(props[props.contentType].description)
  const tasks = useFormInput(props[props.contentType].tasks)
  const { index, updateContent } = props;

  useEffect(() => {
    props[props.contentType].title = title.value;
    props[props.contentType].name = name.value;
    props[props.contentType].startDate.year = startDateYear.value;
    props[props.contentType].startDate.month = startDateMonth.value;
    props[props.contentType].endDate.year = endDateYear.value;
    props[props.contentType].endDate.month = endDateMonth.value;
    props[props.contentType].city = city.value;
    props[props.contentType].description = description.value;
    props[props.contentType].tasks = tasks.value;
  })

  const placeHolder = {
    work: {
      title: "Title / Position",
      place: "Workplace / Company",
    },
    education: {
      title: "Study Program",
      place: "Institution / School",
    },
    project: {
      title: "Project title",
      place: "Institution / School",
    }
  }

  return (
    <div className="content-item-container">
      <h5>{props.contentType.charAt(0).toUpperCase() + props.contentType.slice(1)}</h5>
      <div className="edit-content-item-conteiner">
        <input className="input-style width-full" type="text" {...title} placeholder={placeHolder[props.contentType].title}/>
      </div>
      <div className="edit-content-item-conteiner">
        <input className="input-style width-full" type="text" {...name} placeholder={placeHolder[props.contentType].place}/>
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
      <div className="btn-container">
        <button className="blue-btn" onClick={() => {updateContent(index,props.contentType)}}>Save</button>
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

export default withAuth()(withRouter(EditItem));
