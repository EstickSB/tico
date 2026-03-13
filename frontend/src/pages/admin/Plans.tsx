import { useState } from 'react'
import TopBar from '../../components/TopBar'
import BottomNav from '../../components/BottomNav'

const mockPlans = [
  { id: '1', name: 'FREE', price: 0, commission: 15, maxTrips: 5, drivers: 45 },
  { id: '2', name: 'PRO', price: 29.90, commission: 10, maxTrips: -1, drivers: 12 },
  { id: '3', name: 'BUSINESS', price: 59.90, commission: 5, maxTrips: -1, drivers: 3 },
]

export default function AdminPlans() {
  const [plans] = useState(mockPlans)

  return (
    <div className="page">
      <TopBar title="Planes" />
      <div className="page-content">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {plans.map(p => (
            <div key={p.id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <h3 style={{ fontSize: 20, fontWeight: 700 }}>{p.name}</h3>
                <span className="badge badge-info">{p.drivers} conductores</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                <div>
                  <p style={{ fontSize: 12, color: 'var(--gray-400)' }}>Precio</p>
                  <p style={{ fontWeight: 700 }}>{p.price > 0 ? `S/ ${p.price.toFixed(2)}/mes` : 'Gratis'}</p>
                </div>
                <div>
                  <p style={{ fontSize: 12, color: 'var(--gray-400)' }}>Comisión</p>
                  <p style={{ fontWeight: 700 }}>{p.commission}%</p>
                </div>
                <div>
                  <p style={{ fontSize: 12, color: 'var(--gray-400)' }}>Viajes/día</p>
                  <p style={{ fontWeight: 700 }}>{p.maxTrips === -1 ? 'Ilimitados' : p.maxTrips}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="card" style={{ marginTop: 24, textAlign: 'center' }}>
          <h3 style={{ fontWeight: 600, marginBottom: 8 }}>Resumen de ingresos por planes</h3>
          <p style={{ fontSize: 28, fontWeight: 700, color: 'var(--success)' }}>
            S/ {(12 * 29.90 + 3 * 59.90).toFixed(2)}/mes
          </p>
          <p style={{ fontSize: 13, color: 'var(--gray-400)' }}>60 conductores activos</p>
        </div>
      </div>
      <BottomNav role="ADMIN" />
    </div>
  )
}
