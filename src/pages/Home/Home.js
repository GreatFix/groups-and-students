import React from 'react'
import classes from './Home.module.css'
import Diagram from '../../images/Diagram.png'
const Home = (props) => {
  return (
    <div className={classes.Home}>
      <img src={Diagram} alt={'Диаграмма моделей'} />
    </div>
  )
}

export default Home
