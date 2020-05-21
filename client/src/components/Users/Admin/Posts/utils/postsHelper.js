import React from 'react'
import * as Yup from 'yup'

export const SpectacleSchema = Yup.object().shape({
  name: Yup.string().required('Būtina įvesti'),
  //date: Yup.date().required('Būtina įvesti'),
  //time: Yup.string().required('Būtina įvesti'),
  venue: Yup.string().required('Būtina įvesti'),
})

export const FormTemplate = (props) => {
  let template = null

  switch (props.elementDesc.element) {
    case 'input':
      template = (
        <div className='row'>
          <div className='twelve columns'>
            <input
              type={props.elementDesc.type}
              name={props.name}
              onChange={(e) => props.onHandleChange(e)}
              onBlur={(e) => props.onHandleBlur(e)}
              value={props.elementDesc.value}
              placeholder={props.placeholder}
              className='u-full-width'
            />
            {props.errors && props.touched ? (
              <div className='error_label'>{props.errors}</div>
            ) : null}
          </div>
        </div>
      )
      break
    default:
      template = null
  }

  return template
}
