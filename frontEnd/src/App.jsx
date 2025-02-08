import { BrowserRouter as Router,Routes, Route } from 'react-router-dom'
import LogIn from './pages/LogIn'
import Home from './pages/Home'
import Post from './pages/Post'
import Upload from './pages/Upload'
import './App.css'

function App() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Post" element={<Post />} />
          <Route path="/Upload" element={<Upload />} />
        </Routes>
      </Router>
  )
}

export default App
