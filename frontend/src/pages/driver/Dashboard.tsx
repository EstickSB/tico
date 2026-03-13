import { useNavigate } from 'react-router-dom'
import { useDriver } from '../../hooks/useDriver'
import TopBar from '../../components/TopBar'
import BottomNav from '../../components/BottomNav'

export default function DriverDashboard() {
  const { available, stats, toggleAvailable } = useDriver()
  const nav = useNavigate()

  return (
    <div className="page">
      <TopBar title="Tico Conductor" />

      <div className="page-content" style={{ paddingTop: 24 }}>
        {/* Toggle */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <button
            onClick={toggleAvailable}
            style={{
              width: 140, height: 140, borderRadius: '50%',
              background: available ? 'var(--success)' : 'var(--gray-200)',
              border: 'none', display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', margin: '0 auto',
              transition: 'all 0.3s', boxShadow: available ? '0 0 30px rgba(67,160,71,0.3)' : 'none',
            }}
          >
            <span style={{ fontSize: 40 }}>{available ? '🟢' : '⭕'}</span>
            <span style={{
              fontWeight: 700, fontSize: 14, marginTop: 8,
              color: available ? 'white' : 'var(--gray-500)',
            }}>
              {available ? 'Disponible' : 'No disponible'}
            </span>
          </button>
          <p style={{ color: 'var(--gray-500)', fontSize: 13, marginTop: 12 }}>
            {available ? 'Esperando solicitudes...' : 'Activa para recibir viajes'}
          </p>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
          <div className="card" style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 12, color: 'var(--gray-400)' }}>Viajes hoy</p>
            <p style={{ fontSize: 28, fontWeight: 700 }}>{stats.tripsToday}</p>
          </div>
          <div className="card" style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 12, color: 'var(--gray-400)' }}>Ganado hoy</p>
            <p style={{ fontSize: 28, fontWeight: 700, color: 'var(--success)' }}>S/ {stats.earningsToday.toFixed(2)}</p>
          </div>
        </div>

        {/* Rating */}
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
          <div style={{ fontSize: 36, color: 'var(--primary)' }}>★</div>
          <div>
            <p style={{ fontWeight: 700, fontSize: 20 }}>{stats.rating}</p>
            <p style={{ fontSize: 13, color: 'var(--gray-400)' }}>Tu calificación</p>
          </div>
        </div>

        {/* Plan badge */}
        <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ fontWeight: 600 }}>Plan actual</p>
            <span className={`badge ${stats.plan === 'FREE' ? 'badge-neutral' : 'badge-success'}`}>
              {stats.plan}
            </span>
          </div>
          <button onClick={() => nav('/driver/plan')} style={{
            background: 'var(--primary)', color: 'var(--secondary)',
            padding: '8px 16px', borderRadius: 'var(--radius-sm)', fontWeight: 600, fontSize: 13,
          }}>Ver planes</button>
        </div>

        {/* Simulate request */}
        {available && (
          <button className="btn btn-secondary" style={{ marginTop: 20 }}
            onClick={() => nav('/driver/request')}>
            🔔 Simular solicitud
          </button>
        )}
      </div>

      <BottomNav role="DRIVER" />
    </div>
  )
}
