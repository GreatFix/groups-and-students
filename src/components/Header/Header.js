import React from 'react'
import classes from './Header.module.css'
import PropTypes from 'prop-types'

const Header = (props) => {
  return <div className={`${classes.Header} ${props.className}`}>{props.children}</div>
}

Header.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
}

Header.defaultProps = {
  className: '',
  children: null,
}

export default Header
