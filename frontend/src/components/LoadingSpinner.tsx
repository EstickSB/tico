export default function LoadingSpinner({ size = 40, color = 'var(--primary)' }: { size?: number; color?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{
        width: size, height: size,
        border: `3px solid var(--gray-200)`,
        borderTopColor: color,
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />
    </div>
  )
}
