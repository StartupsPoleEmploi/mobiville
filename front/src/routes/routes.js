import React, { Suspense, lazy } from 'react'
import {
  BrowserRouter as Router,
  Route, Switch
} from 'react-router-dom'

const Home = lazy(() => import('./home/home'))
const Cities = lazy(() => import('./cities/cities'))
const City = lazy(() => import('./city/city'))
const Helps = lazy(() => import('./helps/helps'))
const Search = lazy(() => import('./search/search'))
const Account = lazy(() => import('./account/account'))

export const Routes = () => (
  <Suspense fallback={<p>loading...</p>}>
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/rechercher" component={Search} />
        <Route exact path="/cities" component={Cities} />
        <Route exact path="/city/:insee" component={City} />
        <Route exact path="/aides" component={Helps} />
        <Route exact path="/compte" component={Account} />
      </Switch>
    </Router>
  </Suspense>
)
