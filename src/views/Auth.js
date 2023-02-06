import React from 'react'
import Login from '../components/auth/Login'
import Register from '../components/auth/Register'

const Auth = ({authRoute}) => {
    let body 

    body = (
        <>
        {authRoute === 'login' && <Login/>}
        {authRoute === 'register' && <Register/>}
        </>
    ) 

  return (
    <div className="landing">
        <div className="dark-overlay">
            <div className="landing-inner">
                <h1>Welcome to RedBi games</h1>
                <h4>have fun!</h4>
                {body}
            </div>
        </div>
    </div>
  )
}

export default Auth