import React from 'react'
import auth from '../components/auth'

export default function HomePage (props) {
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
        Logout
      </button>
    </div>
  )
}
