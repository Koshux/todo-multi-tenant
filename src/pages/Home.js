import React from 'react'
import auth from '../components/auth'

export const HomePage = (props) => {
  return (
    <div>
      Home Page
      <button
        onClick={() => {
          auth.logout(() => {
            props.history.push('/login')
          })
        }}
      >
        Login
      </button>
    </div>
  )
}
