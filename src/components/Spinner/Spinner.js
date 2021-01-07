import React from 'react'
import classes from './Spinner.module.css'
import PropTypes from 'prop-types'

const Spinner = (props) => {
  return (
    <div className={classes.Spinner}>
      <div style={{ background: props.centerColor }}></div>
    </div>
  )
}

Spinner.propTypes = {
  centerColor: PropTypes.string,
}

Spinner.defaultProps = {
  centerColor: '#00994f',
}

export default Spinner
