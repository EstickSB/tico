import TopBar from '../../components/TopBar'
import BottomNav from '../../components/BottomNav'

const stats = [
  { label: 'Viajes activos', value: '12', icon: '🚕', color: 'var(--primary)' },
  { label: 'Conductores online', value: '28', icon: '🟢', color: 'var(--success)' },
  { label: 'Viajes hoy', value: '156', icon: '📋', color: 'var(--info)' },
  { label: 'Ingresos estimados', value: 'S/ 1,248', icon: '💰', color: 'var(--success)' },
]

export default function AdminDashboard() {
  return (
    <div className="page">
      <TopBar title="Tico Admin" />
      <div className="page-content">
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Dashboard</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
          {stats.map(s => (
            <div key={s.label} className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 28, marginBottom: 4 }}>{s.icon}</div>
              <p style={{ fontSize: 24, fontWeight: 700, color: s.color }}>{s.value}</p>
              <p style={{ fontSize: 12, color: 'var(--gray-400)' }}>{s.label}</p>
            </div>
          ))}
        </div>

        <div className="card">
          <h3 style={{ fontWeight: 600, marginBottom: 12 }}>Actividad reciente</h3>
          {['Carlos pidió viaje a Real Plaza', 'Pedro aceptó solicitud', 'María completó viaje', 'Nuevo conductor registrado'].map((a, i) => (
            <div key={i} style={{
              padding: '10px 0',
              borderBottom: i < 3 ? '1px solid var(--gray-100)' : 'none',
              fontSize: 14, color: 'var(--gray-600)',
            }}>
              <span style={{ marginRight: 8 }}>•</span>{a}
            </div>
          ))}
        </div>
      </div>
      <BottomNav role="ADMIN" />
    </div>
  )
}
