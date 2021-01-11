import React from 'react'
import classes from './Popout.module.css'
import Button from '../Button/Button'
import PropTypes from 'prop-types'
import { useSpring, animated, config } from 'react-spring'

const Popout = (props) => {
  const spring = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: config.slow,
  })

  return (
    <animated.div className={`${classes.Popout} ${props.className}`} style={spring}>
      <Button className={classes.Close} color={'transparent'} onClick={props.onClose}>
        &#10006;
      </Button>
      {props.children}
    </animated.div>
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

export default React.memo(Popout)
