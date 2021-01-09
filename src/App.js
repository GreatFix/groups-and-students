import React from 'react'
import classes from './App.module.css'
import { HashRouter, Switch, Route, NavLink } from 'react-router-dom'
import Groups from './pages/Groups/Groups'
import Students from './pages/Students/Students'
import Home from './pages/Home/Home'

function App() {
  return (
    <HashRouter basename="/groups-and-students">
      <nav className={classes.Nav}>
        <li>
          <NavLink exact activeClassName={classes.ActiveLink} to="/">
            HOME
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName={classes.ActiveLink} to="/groups">
            GROUPS
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName={classes.ActiveLink} to="/students">
            STUDENTS
          </NavLink>
        </li>
      </nav>
      <Switch>
        <Route path="/groups">
          <Groups />
        </Route>
        <Route path="/students">
          <Students />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </HashRouter>
  )
}

export default App
