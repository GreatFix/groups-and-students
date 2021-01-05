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
    case 'success':
      color = '#40C81E'
      break
    case 'transparent':
      color = '#00000000'
      break

    default:
      color = '#0048BA'
  }
  return (
    <button
      type={props.type}
      disabled={props.disabled}
      className={`${classes.Button} ${props.className}`}
      onClick={props.onClick}
      style={{ backgroundColor: color }}
    >
      {props.children}
    </button>
  )
}

export default Button
