import React from 'react'
import classes from './Label.module.css'

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

export default Label
