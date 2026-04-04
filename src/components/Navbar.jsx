import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { logoutUser } from '../features/auth/authThunk.js'
import { toast } from 'react-toastify'

const Navbar = () => {
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = async () => {
    await dispatch(logoutUser())
    toast.success("Logged out!")
    navigate('/')
    setMenuOpen(false)
  }

  const close = () => setMenuOpen(false)

  return (
    <nav className='bg-blue-600 text-white px-4 md:px-10 py-4 sticky top-0 z-50 shadow-md'>
      <div className='flex justify-between items-center'>
        <h1 className='text-xl font-bold'>
          <Link to="/" onClick={close}>Job Portal</Link>
        </h1>

        {/* Desktop Menu */}
        <div className='hidden md:flex gap-5 items-center text-sm'>
          <Link to="/" className='hover:bg-white hover:text-blue-600 px-2 py-1 rounded font-medium'>Home</Link>
          <Link to="/jobs" className='hover:bg-white hover:text-blue-600 px-2 py-1 rounded font-medium'>Jobs</Link>
          {user?.role === "recruiter" && (
            <Link to="/post-job" className='hover:bg-white hover:text-blue-600 px-2 py-1 rounded font-medium'>Post Job</Link>
          )}
          {user ? (
            <>
              <Link to="/profile" className='hover:bg-white hover:text-blue-600 px-2 py-1 rounded font-medium'>{user.name}</Link>
              <button onClick={handleLogout} className='bg-red-500 px-3 py-1 rounded hover:bg-red-600 font-medium'>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className='hover:bg-white hover:text-blue-600 px-2 py-1 rounded font-medium'>Login</Link>
              <Link to="/register" className='bg-white text-blue-600 px-3 py-1 rounded font-medium hover:bg-blue-50'>Register</Link>
            </>
          )}
        </div>

        {/* Hamburger */}
        <button className='md:hidden focus:outline-none' onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className='md:hidden mt-3 flex flex-col gap-2 pb-2 border-t border-blue-500 pt-3'>
          <Link to="/" onClick={close} className='hover:bg-blue-700 px-3 py-2 rounded font-medium'>Home</Link>
          <Link to="/jobs" onClick={close} className='hover:bg-blue-700 px-3 py-2 rounded font-medium'>Jobs</Link>
          {user?.role === "recruiter" && (
            <Link to="/post-job" onClick={close} className='hover:bg-blue-700 px-3 py-2 rounded font-medium'>Post Job</Link>
          )}
          {user?.role === "applicant" && (
            <Link to="/dashboard" onClick={close} className='hover:bg-blue-700 px-3 py-2 rounded font-medium'>My Applications</Link>
          )}
          {user?.role === "recruiter" && (
            <Link to="/recruiterdashboard" onClick={close} className='hover:bg-blue-700 px-3 py-2 rounded font-medium'>Dashboard</Link>
          )}
          {user ? (
            <>
              <Link to="/profile" onClick={close} className='hover:bg-blue-700 px-3 py-2 rounded font-medium'>👤 {user.name}</Link>
              <button onClick={handleLogout} className='text-left bg-red-500 px-3 py-2 rounded font-medium hover:bg-red-600'>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={close} className='hover:bg-blue-700 px-3 py-2 rounded font-medium'>Login</Link>
              <Link to="/register" onClick={close} className='bg-white text-blue-600 px-3 py-2 rounded font-medium'>Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar
