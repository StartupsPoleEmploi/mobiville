import React, { Suspense, lazy } from 'react'
import {
  BrowserRouter as Router,
  Redirect,
  Route, Switch
} from 'react-router-dom'

const Home = lazy(() => import('./home/home'))
const Cities = lazy(() => import('./cities/cities'))
const City = lazy(() => import('./city/city'))
const Helps = lazy(() => import('./helps/helps'))
const Search = lazy(() => import('./search/search'))
const Account = lazy(() => import('./account/account'))
const HelpDetailsPage = lazy(() => import('./help-details/help-details'))
const FAQ = lazy(() => import('./faq/faq'))
const Legal = lazy(() => import('./legal/legal'))

export const Routes = () => (
  <Suspense fallback={<p>loading...</p>}>
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/rechercher">
          <Redirect to="/rechercher/depuis" />
        </Route>
        <Route exact path="/rechercher/:stepName" component={Search} />
        <Route exact path="/cities" component={Cities} />
        <Route exact path="/city/:insee" component={City} />
        <Route exact path="/city/:insee/:place" component={City} />
        <Route exact path="/aides" component={Helps} />
        <Route exact path="/aides/:id" component={HelpDetailsPage} />
        <Route exact path="/compte" component={Account} />
        <Route exact path="/faq" component={FAQ} />
        <Route exact path="/legal" component={Legal} />
      </Switch>
    </Router>
  </Suspense>
)
