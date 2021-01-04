import React from 'react'
import classes from './Button.module.css'

const Button = (props) => {
  let color
  switch (props.color) {
    case 'danger':
      color = '#C9003F'
      break
    case 'info':
      color = '#00BABA'
      break
    case 'succes':
      color = '#40C81E'
      break
    default:
      color = '#0048BA'
  }
  return (
    <button
      disabled={props.disabled}
      className={classes.Button}
      onClick={props.onClick}
      style={{ backgroundColor: color }}
    >
      {props.children}
    </button>
  )
}

export default Button
