import React from 'react'
import PropTypes from 'prop-types'
import { Redirect, Route } from 'react-router-dom'
import { useUser } from '../common/contexts/userContext'

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { user } = useUser()

  return (
    <Route
      {...rest}
      render={
      (props) => {
        if (user) {
          return <Component {...rest} {...props} />
        }
        return (
          <Redirect to={
            {
              pathname: '/unauthorized',
              state: {
                /* eslint-disable */
                from: props.location
                /* eslint-enable */
              }
            }
          }
          />
        )
      }
    }
    />
  )
}
ProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([
    Route.propTypes.component,
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

export default ProtectedRoute
