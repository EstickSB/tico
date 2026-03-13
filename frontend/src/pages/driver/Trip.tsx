import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

type Phase = 'pickup' | 'arrived' | 'in_progress' | 'completed'

const phaseConfig: Record<Phase, { label: string; color: string; button: string; next: Phase | null }> = {
  pickup: { label: 'Recogiendo pasajero', color: 'var(--info)', button: 'Llegué', next: 'arrived' },
  arrived: { label: 'Esperando pasajero', color: 'var(--primary)', button: 'Iniciar viaje', next: 'in_progress' },
  in_progress: { label: 'En camino al destino', color: 'var(--success)', button: 'Viaje completado', next: 'completed' },
  completed: { label: 'Viaje completado', color: 'var(--success)', button: '', next: null },
}

export default function DriverTrip() {
  const [phase, setPhase] = useState<Phase>('pickup')
  const nav = useNavigate()
  const config = phaseConfig[phase]

  const advance = () => {
    if (config.next === 'completed') { nav('/driver'); return }
    if (config.next) setPhase(config.next)
  }

  return (
    <div style={{ height: '100dvh', display: 'flex', flexDirection: 'column' }}>
      {/* Status bar */}
      <div style={{ background: config.color, color: 'white', padding: '14px 16px', textAlign: 'center' }}>
        <p style={{ fontWeight: 700, fontSize: 16 }}>{config.label}</p>
      </div>

      {/* Map */}
      <div className="map-placeholder" style={{ flex: 1 }}>
        <span style={{ zIndex: 1 }}>📍 Navegación en curso</span>
      </div>

      {/* Bottom panel */}
      <div style={{ background: 'var(--white)', padding: 16, boxShadow: 'var(--shadow-lg)' }}>
        {/* Passenger info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <div style={{
            width: 44, height: 44, borderRadius: '50%', background: 'var(--gray-100)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
          }}>👤</div>
          <div style={{ flex: 1 }}>
            <p style={{ fontWeight: 600 }}>Carlos López</p>
            <p style={{ fontSize: 13, color: 'var(--gray-500)' }}>Pasajero</p>
          </div>
          <a href="tel:999111222" style={{
            width: 44, height: 44, borderRadius: '50%', background: 'var(--success)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
            color: 'white', textDecoration: 'none',
          }}>📞</a>
        </div>

        {/* Route info */}
        <div style={{
          display: 'flex', gap: 8, fontSize: 13, marginBottom: 16,
          padding: '12px 0', borderTop: '1px solid var(--gray-100)',
        }}>
          <div style={{ flex: 1 }}>
            <p style={{ color: 'var(--gray-400)', fontSize: 11 }}>Origen</p>
            <p style={{ fontWeight: 500 }}>Parque Principal</p>
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ color: 'var(--gray-400)', fontSize: 11 }}>Destino</p>
            <p style={{ fontWeight: 500 }}>Real Plaza</p>
          </div>
          <div>
            <p style={{ color: 'var(--gray-400)', fontSize: 11 }}>Precio</p>
            <p style={{ fontWeight: 700, color: 'var(--success)' }}>S/ 8.50</p>
          </div>
        </div>

        {config.next && (
          <button className="btn btn-primary" onClick={advance} style={{ fontSize: 16 }}>
            {config.button}
          </button>
        )}
      </div>
    </div>
  )
}
