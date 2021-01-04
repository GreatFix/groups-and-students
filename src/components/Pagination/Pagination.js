import React from 'react'
import classes from './Pagination.module.css'
import Button from '../Button/Button'

const Pagination = (props) => {
  const numbers = []
  for (let i = 1; i <= props.size; i++) {
    numbers.push(i)
  }
  return (
    <div className={`${classes.Pagination} ${props.className}`}>
      {numbers.map((number) => {
        return (
          <Button
            key={Math.random()}
            onClick={() => {
              props.onClick(number)
            }}
          >
            {number}
          </Button>
        )
      })}
    </div>
  )
}

export default Pagination
