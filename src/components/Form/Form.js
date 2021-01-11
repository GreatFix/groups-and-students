import React from 'react'
import classes from './Form.module.css'
import Button from '../../components/Button/Button'
import PropTypes from 'prop-types'

const Form = (props) => {
  return (
    <form onSubmit={props.onSubmit} className={classes.Form}>
      {props.children}
      <div className={classes.Submit}>
        <Button type={'submit'} color={'success'}>
          {props.submitText}
        </Button>
      </div>
    </form>
  )
}

Form.propTypes = {
  submitText: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

Form.defaultProps = {
  submitText: '',
  children: null,
  onSubmit: null,
}

export default React.memo(Form)
