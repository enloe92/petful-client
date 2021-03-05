import React from 'react'
import { Route, Switch } from 'react-router-dom'
import AdoptPage from '../AdoptPage/AdoptPage'
import LandingPage from '../LandingPage/LandingPage'
import './root.css'

function Root() {
  return <div>
    <h1>Petful</h1>
    <Switch>
      <Route exact path='/'
        component={LandingPage} />
      <Route exact path='/adopt'
        component={AdoptPage} />
    </Switch>
  </div>
}

export default Root
