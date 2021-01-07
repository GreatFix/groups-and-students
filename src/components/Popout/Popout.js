import React from 'react'
import classes from './Popout.module.css'
import Button from '../Button/Button'
import PropTypes from 'prop-types'

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

Popout.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

Popout.defaultProps = {
  className: '',
  onClose: null,
  children: null,
}

export default Popout
