import React from 'react'
import classes from './Sub.module.css'

const Sub = (props) => {
  return <p className={classes.Sub}>{props.children}</p>
}

export default Sub
