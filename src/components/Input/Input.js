import React from 'react'
import classes from './Input.module.css'

const Input = (props) => {
  return (
    <div className={`${classes.Input} ${props.className}`}>
      {props.label && (
        <p>
          {props.label}
          {props.required && <em>*</em>}
        </p>
      )}
      <input
        name={props.name}
        value={props.value}
        type={props.type}
        onChange={props.onChange}
        placeholder={props.placeholder}
        disabled={props.disabled}
        required={props.required}
        spellCheck={'false'}
      ></input>
    </div>
  )
}

export default Input
