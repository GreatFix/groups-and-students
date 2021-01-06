import React from 'react'
import classes from './Spinner.module.css'

const Spinner = (props) => {
  return (
    <div className={classes.Spinner}>
      <div style={{ backgroundColor: props.centerColor }}></div>
    </div>
  )
}

export default Spinner
