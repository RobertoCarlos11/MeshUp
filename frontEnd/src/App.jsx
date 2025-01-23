import { BrowserRouter as Router,Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import LogIn from './pages/logIn'
import Home from './pages/home'
import './App.css'

function App() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/Home" element={<Home />} />
        </Routes>
      </Router>
  )
}

export default App
