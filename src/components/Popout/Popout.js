import React from 'react'
import classes from './Popout.module.css'
import Button from '../Button/Button'

const Popout = (props) => {
  return (
    <div className={`${classes.Popout} ${props.className}`}>
      <Button className={classes.Close} color={'transparent'} onClick={props.onClose}>
        &#10006;
      </Button>
      {props.children}
    </div>
  )
}

export default Popout
