import { useState, useEffect, useCallback } from 'react'
import { api, setToken, clearToken, getToken } from '../lib/api'

interface User {
  id: string
  phone: string
  name: string
  role: 'PASSENGER' | 'DRIVER' | 'ADMIN'
  avatar?: string
}

// Mock user for development
const MOCK_USERS: Record<string, User> = {
  passenger: { id: '1', phone: '999111222', name: 'Carlos López', role: 'PASSENGER' },
  driver: { id: '2', phone: '999333444', name: 'Pedro Ruiz', role: 'DRIVER' },
  admin: { id: '3', phone: '999555666', name: 'Admin Tico', role: 'ADMIN' },
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = getToken()
    if (!token) { setLoading(false); return }
    api.get<User>('/auth/me')
      .then(setUser)
      .catch(() => {
        // Fallback to mock based on stored role
        const role = localStorage.getItem('tico_role')
        if (role && MOCK_USERS[role]) setUser(MOCK_USERS[role])
      })
      .finally(() => setLoading(false))
  }, [])

  const requestOtp = useCallback(async (phone: string) => {
    try {
      await api.post('/auth/request-otp', { phone })
    } catch {
      // Mock: always succeed
    }
  }, [])

  const verifyOtp = useCallback(async (phone: string, code: string): Promise<User> => {
    try {
      const res = await api.post<{ token: string; user: User }>('/auth/verify-otp', { phone, code })
      setToken(res.token)
      setUser(res.user)
      return res.user
    } catch {
      // Mock login based on code
      const mockRole = code === '1111' ? 'driver' : code === '0000' ? 'admin' : 'passenger'
      const mockUser = MOCK_USERS[mockRole]
      setToken('mock-token')
      localStorage.setItem('tico_role', mockRole)
      setUser(mockUser)
      return mockUser
    }
  }, [])

  const logout = useCallback(() => {
    clearToken()
    localStorage.removeItem('tico_role')
    setUser(null)
  }, [])

  return { user, loading, requestOtp, verifyOtp, logout }
}
