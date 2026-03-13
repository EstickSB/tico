import { useState } from 'react'
import { useDriver } from '../../hooks/useDriver'
import TopBar from '../../components/TopBar'
import BottomNav from '../../components/BottomNav'

export default function DriverHistory() {
  const { stats, history } = useDriver()
  const [filter, setFilter] = useState<'today' | 'week'>('today')

  const filtered = filter === 'today'
    ? history.slice(0, 5)
    : history

  const total = filter === 'today' ? stats.earningsToday : stats.earningsWeek
  const count = filter === 'today' ? stats.tripsToday : stats.tripsWeek

  return (
    <div className="page">
      <TopBar title="Historial" />
      <div className="page-content">
        {/* Toggle */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          {(['today', 'week'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              flex: 1, padding: '10px', borderRadius: 'var(--radius-sm)',
              background: filter === f ? 'var(--secondary)' : 'var(--gray-100)',
              color: filter === f ? 'white' : 'var(--gray-600)',
              fontWeight: 600, fontSize: 14, border: 'none',
            }}>
              {f === 'today' ? 'Hoy' : 'Esta semana'}
            </button>
          ))}
        </div>

        {/* Summary */}
        <div className="card" style={{ display: 'flex', justifyContent: 'space-around', marginBottom: 16 }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 24, fontWeight: 700 }}>{count}</p>
            <p style={{ fontSize: 12, color: 'var(--gray-400)' }}>Viajes</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 24, fontWeight: 700, color: 'var(--success)' }}>S/ {total.toFixed(2)}</p>
            <p style={{ fontSize: 12, color: 'var(--gray-400)' }}>Ganancias</p>
          </div>
        </div>

        {/* List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {filtered.map(t => (
            <div key={t.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontWeight: 600, fontSize: 14 }}>{t.origin} → {t.destination}</p>
                <p style={{ fontSize: 12, color: 'var(--gray-400)' }}>
                  {new Date(t.date).toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' })} · {t.passengerName}
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontWeight: 700, color: 'var(--success)' }}>S/ {t.price.toFixed(2)}</p>
                <p style={{ color: 'var(--primary)', fontSize: 12 }}>★ {t.rating}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BottomNav role="DRIVER" />
    </div>
  )
}
