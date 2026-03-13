import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import LoadingSpinner from '../components/LoadingSpinner'

export default function Login() {
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [step, setStep] = useState<'phone' | 'otp'>('phone')
  const [loading, setLoading] = useState(false)
  const { requestOtp, verifyOtp } = useAuth()
  const nav = useNavigate()

  const handleRequestOtp = async () => {
    if (phone.length < 9) return
    setLoading(true)
    await requestOtp(phone)
    setLoading(false)
    setStep('otp')
  }

  const handleVerify = async () => {
    if (code.length < 4) return
    setLoading(true)
    const user = await verifyOtp(phone, code)
    setLoading(false)
    if (user.role === 'ADMIN') nav('/admin')
    else if (user.role === 'DRIVER') nav('/driver')
    else nav('/')
  }

  return (
    <div style={{
      minHeight: '100dvh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', padding: 24,
      background: `linear-gradient(135deg, var(--secondary) 0%, #16213E 100%)`,
    }}>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <div style={{
          width: 80, height: 80, borderRadius: '50%',
          background: 'var(--primary)', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          fontSize: 40, margin: '0 auto 16px',
        }}>🚕</div>
        <h1 style={{ fontSize: 36, fontWeight: 700, color: 'var(--primary)' }}>Tico</h1>
        <p style={{ color: 'var(--gray-300)', marginTop: 4 }}>Tu taxi en Chiclayo</p>
      </div>

      <div style={{
        background: 'var(--white)', borderRadius: 'var(--radius-lg)',
        padding: 24, width: '100%', maxWidth: 380, boxShadow: 'var(--shadow-lg)',
      }}>
        {step === 'phone' ? (
          <>
            <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 4 }}>Ingresa tu número</h2>
            <p style={{ color: 'var(--gray-500)', fontSize: 14, marginBottom: 20 }}>
              Te enviaremos un código de verificación
            </p>
            <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
              <div style={{
                padding: '14px 12px', background: 'var(--gray-50)',
                borderRadius: 'var(--radius-md)', fontWeight: 600, fontSize: 16,
                border: '2px solid var(--gray-200)',
              }}>+51</div>
              <input
                className="input"
                type="tel"
                placeholder="999 999 999"
                value={phone}
                onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 9))}
                autoFocus
              />
            </div>
            <button className="btn btn-primary" onClick={handleRequestOtp} disabled={phone.length < 9 || loading}>
              {loading ? <LoadingSpinner size={20} color="var(--secondary)" /> : 'Continuar'}
            </button>
            <p style={{ color: 'var(--gray-400)', fontSize: 12, marginTop: 16, textAlign: 'center' }}>
              Código demo: 1234 = pasajero, 1111 = conductor, 0000 = admin
            </p>
          </>
        ) : (
          <>
            <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 4 }}>Código de verificación</h2>
            <p style={{ color: 'var(--gray-500)', fontSize: 14, marginBottom: 20 }}>
              Enviado al +51 {phone}
            </p>
            <input
              className="input"
              type="text"
              inputMode="numeric"
              placeholder="0000"
              maxLength={4}
              value={code}
              onChange={e => setCode(e.target.value.replace(/\D/g, '').slice(0, 4))}
              style={{ textAlign: 'center', fontSize: 24, letterSpacing: 8, marginBottom: 16 }}
              autoFocus
            />
            <button className="btn btn-primary" onClick={handleVerify} disabled={code.length < 4 || loading}>
              {loading ? <LoadingSpinner size={20} color="var(--secondary)" /> : 'Verificar'}
            </button>
            <button
              className="btn btn-outline"
              style={{ marginTop: 8 }}
              onClick={() => { setStep('phone'); setCode('') }}
            >
              Cambiar número
            </button>
          </>
        )}
      </div>
    </div>
  )
}
