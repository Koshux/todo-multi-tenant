import React from 'react'
import auth from '../components/auth'

export const LoginPage = (props) => {
  return (
    <div>
      Login Page
      <button
        onClick={() => {
          auth.login(() => {
            props.history.push('/home')
          })
        }}
      >
        Login
      </button>
    </div>
  )
}
