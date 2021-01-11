import React from 'react'
import classes from './Input.module.css'
import PropTypes from 'prop-types'

const Input = (props) => {
  if (props.label && !props.id) {
    console.error('Label is not associated with input, since you did not pass id!')
  }
  return (
    <div className={`${classes.Input} ${props.className}`}>
      {props.label && (
        <label htmlFor={props.id}>
          {props.label}
          {props.required && '*'}
        </label>
      )}
      <input
        id={props.id}
        name={props.name}
        value={props.value}
        type={props.type}
        onChange={props.onChange}
        placeholder={props.placeholder}
        disabled={props.disabled}
        required={props.required}
        spellCheck={'false'}
        autoFocus={props.autoFocus}
        className={props.validateError && classes.ValidateErrorBorder}
      />
      <p className={classes.ValidateErrorMessage}>{props.validateError}</p>
    </div>
  )
}

Input.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.string,
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  validateError: PropTypes.string,
  onChange: PropTypes.func,
  autoFocus: PropTypes.bool,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
}

Input.defaultProps = {
  id: '',
  className: '',
  label: '',
  name: '',
  value: '',
  type: 'text',
  placeholder: '',
  validateError: '',
  onChange: null,
  autoFocus: null,
  required: null,
  disabled: null,
}

export default React.memo(Input)
