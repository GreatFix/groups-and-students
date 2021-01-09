import React from 'react'
import classes from './Select.module.css'
import PropTypes from 'prop-types'

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
        value={props.value}
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

Select.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  options: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
}

Select.defaultProps = {
  className: '',
  name: '',
  label: '',
  onChange: null,
  value: undefined,
  defaultValue: '',
  options: [],
  required: false,
  disabled: false,
}

export default Select
