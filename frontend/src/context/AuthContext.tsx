import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import { api, setToken, clearToken, getToken } from '../lib/api'

interface User {
  id: string
  phone: string
  name: string
  role: 'PASSENGER' | 'DRIVER' | 'ADMIN'
  avatar?: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  requestOtp: (phone: string) => Promise<void>
  verifyOtp: (phone: string, code: string) => Promise<User>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = getToken()
    if (!token) { setLoading(false); return }
    api.get<User>('/auth/me')
      .then(setUser)
      .catch(() => clearToken())
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
      // Mock fallback
      const mockRole = code === '1111' ? 'driver' : code === '0000' ? 'admin' : 'passenger'
      const mockUser: User = {
        id: 'mock',
        phone,
        name: mockRole === 'driver' ? 'Conductor Demo' : mockRole === 'admin' ? 'Admin Tico' : 'Pasajero Demo',
        role: mockRole === 'driver' ? 'DRIVER' : mockRole === 'admin' ? 'ADMIN' : 'PASSENGER'
      }
      setToken('mock-token')
      setUser(mockUser)
      return mockUser
    }
  }, [])

  const logout = useCallback(() => {
    clearToken()
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, requestOtp, verifyOtp, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
