import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTrip } from '../../hooks/useTrip'
import Map, { originIcon, driverIcon } from '../../components/Map'
import { CHICLAYO_CENTER } from '../../lib/routing'

export default function Waiting() {
  const { id } = useParams()
  const nav = useNavigate()
  const { trip, getTrip } = useTrip()
  const [matched, setMatched] = useState(false)
  const [dots, setDots] = useState('')
  const [driverPos, setDriverPos] = useState<[number, number]>([-6.7750, -79.8450])

  useEffect(() => { if (id) getTrip(id) }, [id])
  useEffect(() => {
    const i = setInterval(() => setDots(d => d.length >= 3 ? '' : d + '.'), 500)
    return () => clearInterval(i)
  }, [])
  useEffect(() => {
    const t = setTimeout(() => setMatched(true), 4000)
    return () => clearTimeout(t)
  }, [])

  // Simulate driver approaching after match
  useEffect(() => {
    if (!matched) return
    const target = CHICLAYO_CENTER
    const i = setInterval(() => {
      setDriverPos(p => [
        p[0] + (target[0] - p[0]) * 0.15,
        p[1] + (target[1] - p[1]) * 0.15,
      ])
    }, 1000)
    return () => clearInterval(i)
  }, [matched])

  const markers = [
    { position: CHICLAYO_CENTER, icon: originIcon },
    ...(matched ? [{ position: driverPos, icon: driverIcon }] : []),
  ]

  return (
    <div style={{ height: '100dvh', display: 'flex', flexDirection: 'column' }}>
      {/* Map area */}
      <div style={{ flex: 1, position: 'relative' }}>
        <Map center={CHICLAYO_CENTER} zoom={15} markers={markers} style={{ height: '100%' }} />

        {/* Overlay */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 1000,
          background: 'var(--white)', borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0',
          boxShadow: 'var(--shadow-lg)', padding: 24,
        }}>
          {!matched ? (
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: 80, height: 80, borderRadius: '50%',
                background: 'var(--primary)', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                fontSize: 40, animation: 'pulse 1.5s ease infinite',
                margin: '0 auto 16px', boxShadow: '0 8px 32px rgba(255,193,7,0.4)',
                border: '3px solid var(--secondary)',
              }}>🚕</div>
              <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8, fontFamily: 'var(--font-display)', textTransform: 'uppercase' }}>
                Buscando taxista{dots}
              </h2>
              <p style={{ color: 'var(--gray-500)', marginBottom: 16, fontSize: 14 }}>
                Conectándote con el conductor más cercano
              </p>
              <button className="btn btn-outline" onClick={() => nav('/')} style={{ maxWidth: 200, margin: '0 auto' }}>
                Cancelar
              </button>
            </div>
          ) : (
            <div style={{ animation: 'slideUp 0.3s ease' }}>
              <div style={{ textAlign: 'center', marginBottom: 16 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: '50%', background: 'var(--success)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 24, color: 'white', margin: '0 auto 8px',
                }}>✓</div>
                <h2 style={{ fontSize: 20, fontWeight: 700, fontFamily: 'var(--font-display)', textTransform: 'uppercase' }}>
                  ¡Taxista encontrado!
                </h2>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: '50%', background: 'rgba(255,193,7,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24,
                  border: '2px solid var(--primary)',
                }}>👤</div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 700, fontSize: 16, fontFamily: 'var(--font-display)' }}>{trip?.driver?.name || 'Pedro Ruiz'}</p>
                  <p style={{ fontSize: 13, color: 'var(--gray-500)' }}>
                    {trip?.driver?.vehicle || 'Toyota Yaris Blanco'} · {trip?.driver?.plate || 'ABC-123'}
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--primary)' }}>
                  <span>★</span>
                  <span style={{ fontWeight: 600 }}>{trip?.driver?.rating || 4.7}</span>
                </div>
              </div>

              <button className="btn btn-primary" onClick={() => nav(`/trip/${id}/active`)}>
                🚕 Ver viaje en curso
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
