import React, { useState, useCallback, useEffect } from 'react'
import classes from './List.module.css'
import Cell from '../Cell/Cell'
import Pagination from '../Pagination/Pagination'
import Button from '../Button/Button'
import PropTypes from 'prop-types'
import addIcon from '../../images/add.png'

const List = (props) => {
  const [page, setPage] = useState(1)
  const [pageContent, setPageContent] = useState([])

  useEffect(() => {
    const temp = []
    for (let i = props.pagination * (page - 1); i < props.pagination * page; i++)
      props.array[i] && temp.push(props.array[i])
    setPageContent(temp)
  }, [page, props.array, props.array.length, props.pagination])

  useEffect(() => {
    if (!pageContent.length && page > 1) {
      setPage((page) => page - 1)
    }
  }, [pageContent, page])

  const handleClickPaginationButton = useCallback((number) => {
    setPage(number)
  }, [])

  let paginationSize
  if (props.array.length % props.pagination) {
    paginationSize = props.array.length / props.pagination + 1
  } else {
    paginationSize = props.array.length / props.pagination
  }

  return (
    <div className={`${classes.List} ${props.className}`}>
      <ul>
        {pageContent.map((item, index) => {
          return (
            <Cell
              key={Math.random()}
              index={props.indexOn ? index + 1 : null}
              subContent={item[props.subProperty]}
              id={item[props.idProperty]}
              onClickLabel={props.onClickLabel}
              onClickEdit={props.onClickEdit}
              onClickDelete={props.onClickDelete}
            >
              {item[props.mainProperty]}
            </Cell>
          )
        })}
        {!props.array.length && <li className={classes.Alt}>The list is empty</li>}
        {props.onClickAdd && (
          <li className={classes.Add}>
            <Button color={'success'} onClick={props.onClickAdd}>
              <img src={addIcon} alt={'add'} />
            </Button>
          </li>
        )}
      </ul>
      <Pagination
        className={classes.Pagination}
        size={paginationSize}
        onClick={handleClickPaginationButton}
      />
    </div>
  )
}

List.propTypes = {
  className: PropTypes.string,
  idProperty: PropTypes.string,
  mainProperty: PropTypes.string.isRequired,
  subProperty: PropTypes.string,
  pagination: PropTypes.number,
  indexOn: PropTypes.bool,
  array: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClickLabel: PropTypes.func,
  onClickEdit: PropTypes.func,
  onClickDelete: PropTypes.func,
  onClickAdd: PropTypes.func,
}

List.defaultProps = {
  className: '',
  idProperty: 'id',
  mainProperty: '',
  subProperty: '',
  pagination: false,
  indexOn: false,
  array: [],
  onClickLabel: null,
  onClickEdit: null,
  onClickDelete: null,
  onClickAdd: null,
}

export default List
