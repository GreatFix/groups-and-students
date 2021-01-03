import React from 'react'
import classes from './App.module.css'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import Groups from './pages/Groups/Groups'
import Students from './pages/Students/Students'

function App() {
  return (
    <BrowserRouter>
      <nav className={classes.Nav}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/groups">Groups</Link>
        </li>
        <li>
          <Link to="/students">Students</Link>
        </li>
      </nav>
      <Switch>
        <Route path="/groups">
          <Groups />
        </Route>
        <Route path="/students">
          <Students />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
