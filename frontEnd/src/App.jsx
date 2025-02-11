import { BrowserRouter as Router,Routes, Route } from 'react-router-dom'
import LogIn from './pages/LogIn'
import Home from './pages/home'
import Post from './pages/Post'
import Upload from './pages/Upload'
import Profile from './pages/Profile'
import Search_History from './pages/Search_History'
import './App.css'

function App() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Post" element={<Post />} />
          <Route path="/Upload" element={<Upload />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Search_History" element={<Search_History />} />
        </Routes>
      </Router>
  )
}

export default App;
