import React from 'react'
import classes from './Cell.module.css'
import Label from '../Label/Label'
import Button from '../Button/Button'
import Sub from '../Sub/Sub'

const Cell = (props) => {
  return (
    <li className={`${classes.Cell} ${props.className}`}>
      <Label className={classes.Label} onClick={props.onClickLabel}>
        {props.children}
      </Label>
      {props.subContent && <Sub className={classes.Sub}>{props.subContent}</Sub>}

      {props.onClickEdit && (
        <Button className={classes.Edit} onClick={props.onClickEdit} color="info">
          EDIT
        </Button>
      )}
      {props.onClickDelete && (
        <Button className={classes.Delete} onClick={props.onClickDelete} color="danger">
          DELETE
        </Button>
      )}
    </li>
  )
}

export default Cell
