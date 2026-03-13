import { useNavigate } from 'react-router-dom'

interface Props {
  title: string
  back?: boolean
  right?: React.ReactNode
}

export default function TopBar({ title, back, right }: Props) {
  const nav = useNavigate()
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '12px 16px', background: 'var(--white)',
      borderBottom: '1px solid var(--gray-100)', position: 'sticky', top: 0, zIndex: 50,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {back && (
          <button onClick={() => nav(-1)} style={{
            background: 'none', fontSize: 20, padding: 4, color: 'var(--secondary)',
          }}>←</button>
        )}
        <h1 style={{ fontSize: 18, fontWeight: 700 }}>{title}</h1>
      </div>
      {right && <div>{right}</div>}
    </div>
  )
}
