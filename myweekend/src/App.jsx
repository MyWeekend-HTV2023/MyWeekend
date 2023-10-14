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
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
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
    </>
  )
}

export default App
