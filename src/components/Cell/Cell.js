import React from 'react'
import classes from './Cell.module.css'
import Label from '../Label/Label'
import Button from '../Button/Button'
import Sub from '../Sub/Sub'
import PropTypes from 'prop-types'
import DeleteIcon from '../../images/delete.png'
import EditIcon from '../../images/edit.png'

import { animated } from 'react-spring'

const Cell = (props) => {
  return (
    <animated.li className={`${classes.Cell} ${props.className}`} style={props.style}>
      {props.index && <Sub className={classes.Index}>{props.index}</Sub>}
      {props.onClickLabel ? (
        <Label
          className={classes.Label}
          onClick={() => {
            props.onClickLabel(props.id)
          }}
        >
          {props.children}
        </Label>
      ) : (
        <Label className={classes.Label}>{props.children}</Label>
      )}
      {props.subContent && <Sub className={classes.Sub}>{props.subContent}</Sub>}

      {props.onClickEdit && (
        <Button
          className={classes.Edit}
          onClick={() => {
            props.onClickEdit(props.id)
          }}
          color="info"
        >
          <img src={EditIcon} alt={'edit'} />
        </Button>
      )}
      {props.onClickDelete && (
        <Button
          className={classes.Delete}
          onClick={() => {
            props.onClickDelete(props.id)
          }}
          color="danger"
        >
          <img src={DeleteIcon} alt={'delete'} />
        </Button>
      )}
    </animated.li>
  )
}

Cell.propTypes = {
  className: PropTypes.string,
  subContent: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  children: PropTypes.node.isRequired,
  index: PropTypes.number,
  onClickLabel: PropTypes.func,
  onClickEdit: PropTypes.func,
  onClickDelete: PropTypes.func,
}

Cell.defaultProps = {
  className: '',
  subContent: null,
  id: null,
  children: '',
  index: null,
  onClickLabel: null,
  onClickEdit: null,
  onClickDelete: null,
}

export default Cell
