import { useState, useCallback } from 'react'

export interface Trip {
  id: string
  status: 'SEARCHING' | 'MATCHED' | 'PICKUP' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
  origin: { address: string; lat: number; lng: number }
  destination: { address: string; lat: number; lng: number }
  price: number
  distance: number
  duration: number
  driver?: {
    id: string; name: string; phone: string; photo?: string
    plate: string; vehicle: string; rating: number
  }
  passenger?: { id: string; name: string; phone: string }
  rating?: number
  createdAt: string
}

const MOCK_TRIP: Trip = {
  id: 'trip-001',
  status: 'MATCHED',
  origin: { address: 'Parque Principal, Chiclayo', lat: -6.7701, lng: -79.8400 },
  destination: { address: 'Real Plaza, Chiclayo', lat: -6.7635, lng: -79.8370 },
  price: 8.50,
  distance: 2.3,
  duration: 8,
  driver: {
    id: 'd1', name: 'Pedro Ruiz', phone: '999333444',
    plate: 'ABC-123', vehicle: 'Toyota Yaris Blanco', rating: 4.7,
  },
  passenger: { id: 'p1', name: 'Carlos López', phone: '999111222' },
  createdAt: new Date().toISOString(),
}

export function useTrip() {
  const [trip, setTrip] = useState<Trip | null>(null)
  const [loading, setLoading] = useState(false)

  const searchTrip = useCallback(async (origin: string, destination: string) => {
    setLoading(true)
    // Mock: create trip after delay
    await new Promise(r => setTimeout(r, 1000))
    const t: Trip = {
      ...MOCK_TRIP,
      id: `trip-${Date.now()}`,
      status: 'SEARCHING',
      origin: { ...MOCK_TRIP.origin, address: origin || MOCK_TRIP.origin.address },
      destination: { ...MOCK_TRIP.destination, address: destination },
      price: Math.round((5 + Math.random() * 10) * 100) / 100,
    }
    setTrip(t)
    setLoading(false)
    return t
  }, [])

  const getTrip = useCallback(async (id: string) => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 300))
    setTrip({ ...MOCK_TRIP, id })
    setLoading(false)
    return { ...MOCK_TRIP, id }
  }, [])

  const rateTrip = useCallback(async (id: string, rating: number) => {
    if (trip) setTrip({ ...trip, rating, status: 'COMPLETED' })
  }, [trip])

  const updateStatus = useCallback((status: Trip['status']) => {
    if (trip) setTrip({ ...trip, status })
  }, [trip])

  return { trip, loading, searchTrip, getTrip, rateTrip, updateStatus, setTrip }
}
