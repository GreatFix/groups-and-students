import React from 'react'
import classes from './Label.module.css'
import PropTypes from 'prop-types'

const Label = (props) => {
  return (
    <p
      className={`${classes.Label} ${props.className} ${props.onClick && classes.Hover}`}
      onClick={props.onClick}
    >
      {props.children}
    </p>
  )
}

Label.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
}

Label.defaultProps = {
  className: '',
  children: null,
  onClick: null,
}

export default Label
