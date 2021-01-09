import React from 'react'
import classes from './Input.module.css'
import PropTypes from 'prop-types'

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
        autoFocus={props.autoFocus}
        className={props.validateError && classes.ValidateErrorBorder}
      ></input>
      <p className={classes.ValidateErrorMessage}>{props.validateError}</p>
    </div>
  )
}

Input.propTypes = {
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

export default Input
