import { useState, useCallback } from 'react'

interface DriverStats {
  tripsToday: number
  earningsToday: number
  tripsWeek: number
  earningsWeek: number
  rating: number
  plan: 'FREE' | 'PRO' | 'BUSINESS'
}

interface TripHistory {
  id: string
  date: string
  origin: string
  destination: string
  price: number
  passengerName: string
  rating: number
}

const MOCK_STATS: DriverStats = {
  tripsToday: 7,
  earningsToday: 58.50,
  tripsWeek: 34,
  earningsWeek: 287.00,
  rating: 4.7,
  plan: 'FREE',
}

const MOCK_HISTORY: TripHistory[] = [
  { id: '1', date: '2026-03-13T18:30:00', origin: 'Parque Principal', destination: 'Real Plaza', price: 8.50, passengerName: 'Carlos L.', rating: 5 },
  { id: '2', date: '2026-03-13T17:15:00', origin: 'Hospital Regional', destination: 'Open Plaza', price: 12.00, passengerName: 'María G.', rating: 4 },
  { id: '3', date: '2026-03-13T15:40:00', origin: 'Terminal Terrestre', destination: 'Centro', price: 7.00, passengerName: 'Luis R.', rating: 5 },
  { id: '4', date: '2026-03-13T14:00:00', origin: 'USAT', destination: 'Balta', price: 6.50, passengerName: 'Ana P.', rating: 5 },
  { id: '5', date: '2026-03-13T12:20:00', origin: 'Mercado Modelo', destination: 'Santa Victoria', price: 9.00, passengerName: 'Jorge T.', rating: 4 },
]

export function useDriver() {
  const [available, setAvailable] = useState(false)
  const [stats, setStats] = useState<DriverStats>(MOCK_STATS)
  const [history] = useState<TripHistory[]>(MOCK_HISTORY)

  const toggleAvailable = useCallback(() => {
    setAvailable(v => !v)
  }, [])

  const refreshStats = useCallback(async () => {
    setStats(MOCK_STATS)
  }, [])

  return { available, stats, history, toggleAvailable, refreshStats }
}
