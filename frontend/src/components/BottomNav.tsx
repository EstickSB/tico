import { useLocation, useNavigate } from 'react-router-dom'

interface NavItem { path: string; label: string; icon: string }

const passengerNav: NavItem[] = [
  { path: '/', label: 'Inicio', icon: '🏠' },
]

const driverNav: NavItem[] = [
  { path: '/driver', label: 'Inicio', icon: '🏠' },
  { path: '/driver/history', label: 'Historial', icon: '📋' },
  { path: '/driver/plan', label: 'Plan', icon: '⭐' },
]

const adminNav: NavItem[] = [
  { path: '/admin', label: 'Dashboard', icon: '📊' },
  { path: '/admin/drivers', label: 'Conductores', icon: '🚕' },
  { path: '/admin/trips', label: 'Viajes', icon: '📋' },
  { path: '/admin/plans', label: 'Planes', icon: '💎' },
]

export default function BottomNav({ role }: { role: 'PASSENGER' | 'DRIVER' | 'ADMIN' }) {
  const loc = useLocation()
  const nav = useNavigate()
  const items = role === 'ADMIN' ? adminNav : role === 'DRIVER' ? driverNav : passengerNav

  if (items.length <= 1) return null

  return (
    <nav style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      background: 'var(--white)', borderTop: '1px solid var(--gray-100)',
      display: 'flex', justifyContent: 'space-around',
      padding: '8px 0 max(8px, env(safe-area-inset-bottom))',
      zIndex: 100,
    }}>
      {items.map(item => {
        const active = loc.pathname === item.path
        return (
          <button key={item.path} onClick={() => nav(item.path)} style={{
            background: 'none', display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: 2, padding: '4px 16px',
            color: active ? 'var(--primary)' : 'var(--gray-400)',
            fontSize: 10, fontWeight: active ? 600 : 400,
          }}>
            <span style={{ fontSize: 22 }}>{item.icon}</span>
            {item.label}
          </button>
        )
      })}
    </nav>
  )
}
