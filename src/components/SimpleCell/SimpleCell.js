import React from 'react'
import classes from './SimpleCell.module.css'
import PropTypes from 'prop-types'

const SimpleCell = (props) => {
  return (
    <p
      className={`${classes.SimpleCell} ${props.className} ${props.onClick ? classes.Hover : ''}`}
      onClick={props.onClick}
    >
      {props.children}
    </p>
  )
}

SimpleCell.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
}

SimpleCell.defaultProps = {
  className: '',
  children: null,
  onClick: null,
}

export default React.memo(SimpleCell)
