import React from 'react'
import classes from './Select.module.css'

const Select = (props) => {
  return (
    <div className={`${classes.Select} ${props.className}`}>
      {props.label && <p>{props.label}</p>}
      <select
        name={props.name}
        onChange={props.onChange}
        disabled={props.disabled}
        required={props.required}
        spellCheck={'false'}
        defaultValue={props.defaultValue}
      >
        {props.options &&
          props.options.map((item) => {
            return (
              <option key={`${item}-${Math.random()}`} value={item}>
                {item}
              </option>
            )
          })}
      </select>
    </div>
  )
}

export default Select
