import React, { Suspense, lazy } from 'react'
import {
  BrowserRouter as Router,
  Route, Switch
} from 'react-router-dom'

const Home = lazy(() => import('./home/home'))
const Cities = lazy(() => import('./cities/cities'))

export const Routes = () => (
  <Suspense fallback={<p>loading...</p>}>
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/cities" component={Cities} />
      </Switch>
    </Router>
  </Suspense>
)
