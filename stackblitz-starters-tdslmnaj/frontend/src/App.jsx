import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Login from './pages/Login.jsx'
import StudentDashboard from './pages/StudentDashboard.jsx'
import FacultyDashboard from './pages/FacultyDashboard.jsx'
import LibraryDashboard from './pages/LibraryDashboard.jsx'
import FoodCourtDashboard from './pages/FoodCourtDashboard.jsx'
import Wallet from './pages/Wallet.jsx'
import Templates from './pages/Templates.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/' || location.pathname === '/login';

  return (
    <div className="min-h-screen flex flex-col">
      {!isLoginPage && <Navbar />}
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={< Login/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/faculty/dashboard" element={<FacultyDashboard />} />
          <Route path="/library/dashboard" element={<LibraryDashboard />} />
          <Route path="/foodcourt/dashboard" element={<FoodCourtDashboard />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/templates" element={<Templates />} />
        </Routes>
      </main>

      {!isLoginPage && <Footer />}
    </div>
  )
}

export default App