import React from 'react'
import classes from './Select.module.css'
import PropTypes from 'prop-types'

const Select = (props) => {
  if (props.label && !props.id) {
    console.error('Select is not associated with select, since you did not pass id!')
  }
  return (
    <div className={`${classes.Select} ${props.className}`}>
      {props.label && (
        <label htmlFor={props.id}>
          {props.label}
          {props.required && '*'}
        </label>
      )}
      <select
        id={props.id}
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
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
  id: null,
  className: '',
  name: null,
  label: null,
  onChange: null,
  value: undefined,
  defaultValue: undefined,
  options: [],
  required: false,
  disabled: false,
}

export default React.memo(Select)
