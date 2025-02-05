import { BrowserRouter as Router,Routes, Route } from 'react-router-dom'
import LogIn from './pages/LogIn'
import Home from './pages/Home'
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
