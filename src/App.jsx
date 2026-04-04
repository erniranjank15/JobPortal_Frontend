import Navbar from './components/Navbar.jsx'
import Sidebar from './components/Sidebar.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Jobs from './pages/Jobs.jsx'
import JobDetails from './pages/JobDetails.jsx'
import Dashboard from './pages/Dashboard.jsx'
import RecruiterDashboard from './pages/RecruiterDashboard.jsx'
import PostJob from './pages/PostJob.jsx'
import EditJob from './pages/EditJob.jsx'
import Profile from './pages/Profile.jsx'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/:id" element={<JobDetails />} />

            <Route path="/profile" element={
              <ProtectedRoute><Profile /></ProtectedRoute>
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute role="applicant"><Dashboard /></ProtectedRoute>
            } />
            <Route path="/recruiterdashboard" element={
              <ProtectedRoute role="recruiter"><RecruiterDashboard /></ProtectedRoute>
            } />
            <Route path="/post-job" element={
              <ProtectedRoute role="recruiter"><PostJob /></ProtectedRoute>
            } />
            <Route path="/edit-job/:id" element={
              <ProtectedRoute role="recruiter"><EditJob /></ProtectedRoute>
            } />
          </Routes>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} pauseOnHover />
    </BrowserRouter>
  )
}



export default App
