import React from 'react'
import auth from '../components/auth'

export default function RegisterPage (props) {
  return (
    <div>
      Register Page
      <button
        onClick={() => {
          auth.register(() => {
            props.history.push('/')
          })
        }}
      >
        Register
      </button>
    </div>
  )
}
