import React from 'react'
import classes from './Label.module.css'

const Label = (props) => {
  return (
    <p className={`${classes.Label} ${props.className}`} onClick={props.onClick}>
      {props.children}
    </p>
  )
}

export default Label
