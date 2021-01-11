import React from 'react'
import classes from './Sub.module.css'
import PropTypes from 'prop-types'

const Sub = (props) => {
  return <p className={`${classes.Sub} ${props.className}`}>{props.children}</p>
}

Sub.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
}

Sub.defaultProps = {
  className: '',
  children: null,
}

export default React.memo(Sub)
