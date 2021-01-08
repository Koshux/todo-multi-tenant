import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import auth from './auth'

/**
 * This function is used to create protected routes.  If the user is not
 * authenticated then it will redirect the user to the login page.
 *
 * @param {function} props.component The React Component to render.
 * @param {Object}         ...rest The remainder of props for the component.
 */
export default function ProtectedRoute ({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => {
        if (auth.isAuthenticated()) return <Component {...props}/>

        return <Redirect to={
          {
            pathname: '/',
            state: {
              from: props.location
            }
          }
        } />
      }}
    />
  )
}
