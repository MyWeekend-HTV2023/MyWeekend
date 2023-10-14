import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Local from './pages/Local'
import Abroad from './pages/Abroad'
import ChooseLocation from './pages/ChooseLocation'
import LocalResult from './pages/LocalResult'
import AbroadResult from './pages/AbroadResult'
import CommunityTrips from './pages/CommunityTrips'
import MyTrips from './pages/MyTrips'

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    // <>
    //   <div>
    //     <a href="https://vitejs.dev" target="_blank">
    //       <img src={viteLogo} className="logo" alt="Vite logo" />
    //     </a>
    //     <a href="https://react.dev" target="_blank">
    //       <img src={reactLogo} className="logo react" alt="React logo" />
    //     </a>
    //   </div>
    //   <h1>Vite + React</h1>
    //   <div className="card">
    //     <button onClick={() => setCount((count) => count + 1)}>
    //       count is {count}
    //     </button>
    //     <p>
    //       Edit <code>src/App.jsx</code> and save to test HMR
    //     </p>
    //   </div>
    //   <p className="read-the-docs">
    //     Click on the Vite and React logos to learn more
    //   </p>
    // </>
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div>Landing</div>} />
          <Route path="/dashboard" element={<div>Dashboard</div>} />
          <Route path="/login" element={<div>Login</div>} />
          <Route path="/signup" element={<div>Signup</div>} />
          <Route path="/local" element={<div>Local</div>} />
          <Route path="/abroad" element={<div>Abroad</div>} />
          <Route path="/chooselocation" element={<div>ChooseLocation</div>} />
          <Route path="/localresult" element={<div>LocalResult</div>} />
          <Route path="/abroadresult" element={<div>AbroadResult</div>} />
          <Route path="/communitytrips" element={<div>CommunityTrips</div>} />
          <Route path="/communitytrips/:id" element={<div>CommunityTrip</div>} />
          <Route path="/mytrips" element={<div>MyTrips</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
