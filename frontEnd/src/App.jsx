import { BrowserRouter as Router,Routes, Route } from 'react-router-dom'
import LogIn from './pages/logIn'
import Home from './pages/Home'
import Reports from './pages/Reports' 
import Post from './pages/Post'
import Upload from './pages/Upload'
import Profile from './pages/Profile'
import Search_History from './pages/Search_History'
import Collection from './pages/Collection'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
import ProtectedRoute from './pages/ProtectedRoute'
import './App.css'

function App() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Post/:param" element={<Post />} />
          <Route path="/Upload" element={<ProtectedRoute element={<Upload />} />} />
          <Route path="/Profile/:ProfileId" element={<Profile />} />
          <Route path="/Search_History" element={<ProtectedRoute element={<Search_History />} />} />
          <Route path="/Collection/:ProfileId/:collectionId" element={<Collection />} />
          <Route path="/Reports" element={<ProtectedRoute element={<Reports />} />} />
          <Route path="*" element= {<NotFound />}/>
        </Routes>
      </Router>
  )
}

export default App;
