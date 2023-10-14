import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Landing from './pages/Landing.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Local from './pages/Local.jsx'
import Abroad from './pages/Abroad.jsx'
import ChooseLocation from './pages/ChooseLocation.jsx'
import LocalResult from './pages/LocalResult.jsx'
import AbroadResult from './pages/AbroadResult.jsx'
import CommunityTrips from './pages/CommunityTrips.jsx'
import MyTrips from './pages/MyTrips.jsx'

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
          <Route path="/" element={<Landing />}/>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/local" element={<Local />} />
          <Route path="/abroad" element={<Abroad />} />
          <Route path="/chooselocation" element={<ChooseLocation />} />
          <Route path="/localresult" element={<LocalResult />} />
          <Route path="/abroadresult" element={<AbroadResult />} />
          <Route path="/communitytrips" element={<CommunityTrips />} />
          <Route path="/communitytrips/:id" element={<CommunityTrips />} />
          <Route path="/mytrips" element={<MyTrips />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
