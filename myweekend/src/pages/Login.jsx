import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Globe from './components/Globe.jsx'

import logo from '../assets/logo.png'

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function login(email, password) {
    navigate('/dashboard');
  }

  return (
    <div className="flex flex-row h-screen w-screen">
      <div className="h-full w-1/2 flex overflow-clip items-center justify-center object-cover">
        <div className="h-full">
          <Globe />
        </div>
      </div>
      <div className="flex justify-center items-center h-full w-1/2">
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <img className="h-20 w-20" src={logo} alt="MyWeekend Logo" />
            <h1 className="text-3xl font-bold">MyWeekend</h1>
            <p className="text-sm">Your weekend, your way.</p>
          </div>
          <div className="flex flex-col justify-center items-center mt-8">
            <form className="flex flex-col justify-center items-center" onSubmit={() => login(email, password)}>
              <input className="border border-gray-400 rounded-md w-80 h-10 px-2" type="email" placeholder="Email" onChange={e => setEmail(e.target.value)}/>
              <input className="border border-gray-400 rounded-md w-80 h-10 px-2 mt-4" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
              <button className="bg-logopink hover:bg-altlogopink text-white font-bold py-2 px-4 rounded-md w-80 mt-4" type="submit">Login</button>
            </form>
            <div className="flex flex-col justify-center items-center mt-4">
              <p className="text-sm">Don't have an account? <a href="/signup" className="text-blue-500 hover:underline">Sign up</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;