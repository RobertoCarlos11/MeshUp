import { BrowserRouter as Router,Routes, Route } from 'react-router-dom'
import LogIn from './pages/logIn'
import Home from './pages/Home'
import Reports from './pages/Reports' 
import Post from './pages/Post'
import Upload from './pages/Upload'
import Profile from './pages/Profile'
import Search_History from './pages/Search_History'
import Collection from './pages/Collection'
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
          <Route path="/Collection" element={<Collection />} />
          <Route path="/Reports" element={<Reports />} />
        </Routes>
      </Router>
  )
}

export default App;
