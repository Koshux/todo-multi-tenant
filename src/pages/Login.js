import React from 'react'
import auth from '../components/auth'

export default function LoginPage (props) {
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
