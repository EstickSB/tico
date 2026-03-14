import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import LoadingSpinner from './components/LoadingSpinner'
import Login from './pages/Login'
import Home from './pages/passenger/Home'
import Waiting from './pages/passenger/Waiting'
import ActiveTrip from './pages/passenger/ActiveTrip'
import Complete from './pages/passenger/Complete'
import DriverDashboard from './pages/driver/Dashboard'
import DriverRequest from './pages/driver/Request'
import DriverTrip from './pages/driver/Trip'
import DriverHistory from './pages/driver/History'
import DriverPlan from './pages/driver/Plan'
import AdminDashboard from './pages/admin/Dashboard'
import AdminDrivers from './pages/admin/Drivers'
import AdminTrips from './pages/admin/Trips'
import AdminPlans from './pages/admin/Plans'

export default function App() {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return (
    <div className="app-shell">
      <div style={{ height: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <LoadingSpinner size={48} />
      </div>
    </div>
  )

  if (!user) return (
    <div className="app-shell">
      <Login />
    </div>
  )

  return (
    <div className="app-shell">
      <div key={location.pathname} className="page-fade">
        <Routes location={location}>
          {/* Passenger */}
          <Route path="/" element={<Home />} />
          <Route path="/trip/:id/waiting" element={<Waiting />} />
          <Route path="/trip/:id/active" element={<ActiveTrip />} />
          <Route path="/trip/:id/complete" element={<Complete />} />

          {/* Driver */}
          <Route path="/driver" element={<DriverDashboard />} />
          <Route path="/driver/request" element={<DriverRequest />} />
          <Route path="/driver/trip/:id" element={<DriverTrip />} />
          <Route path="/driver/history" element={<DriverHistory />} />
          <Route path="/driver/plan" element={<DriverPlan />} />

          {/* Admin */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/drivers" element={<AdminDrivers />} />
          <Route path="/admin/trips" element={<AdminTrips />} />
          <Route path="/admin/plans" element={<AdminPlans />} />

          {/* Fallback */}
          <Route path="*" element={
            <Navigate to={user.role === 'ADMIN' ? '/admin' : user.role === 'DRIVER' ? '/driver' : '/'} />
          } />
        </Routes>
      </div>
    </div>
  )
}
