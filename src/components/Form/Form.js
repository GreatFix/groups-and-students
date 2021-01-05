import React from 'react'
import classes from './Form.module.css'
import Button from '../../components/Button/Button'

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

export default Form
