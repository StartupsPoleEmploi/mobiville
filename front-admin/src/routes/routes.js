import React, { Suspense, lazy } from 'react'
import {
  BrowserRouter as Router,
  Route, Switch
} from 'react-router-dom'
import ProtectedRoute from '../components/protected-route'

const Home = lazy(() => import('./home/home'))
const Login = lazy(() => import('./login/login'))
const Dashboard = lazy(() => import('./app/dashboard/dashboard'))
const Unauthorized = lazy(() => import('./unauthorized/unauthorized'))

export const Routes = () => (
  <Suspense fallback={<p>loading...</p>}>
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/dashboard" component={Dashboard} />
        <Route exact path="/unauthorized" component={Unauthorized} />
      </Switch>
    </Router>
  </Suspense>
)
