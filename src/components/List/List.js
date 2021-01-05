import React, { useState, useCallback, useEffect } from 'react'
import classes from './List.module.css'
import Cell from '../Cell/Cell'
import Pagination from '../Pagination/Pagination'

const List = (props) => {
  const [page, setPage] = useState(1)
  const [pageContent, setPageContent] = useState([])

  useEffect(() => {
    const temp = []
    for (let i = props.pagination * (page - 1); i < props.pagination * page; i++)
      props.array[i] && temp.push(props.array[i])
    setPageContent(temp)
  }, [page, props.array, props.pagination])

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
        {pageContent.map((item) => {
          return (
            <Cell
              key={Math.random()}
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
      </ul>
      <Pagination
        className={classes.Pagination}
        size={paginationSize}
        onClick={handleClickPaginationButton}
      />
    </div>
  )
}

export default List
