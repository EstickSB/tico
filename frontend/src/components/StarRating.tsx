interface Props {
  value: number
  onChange?: (v: number) => void
  size?: number
  readonly?: boolean
}

export default function StarRating({ value, onChange, size = 32, readonly = false }: Props) {
  return (
    <div style={{ display: 'flex', gap: 4 }}>
      {[1, 2, 3, 4, 5].map(i => (
        <span
          key={i}
          onClick={() => !readonly && onChange?.(i)}
          style={{
            fontSize: size,
            cursor: readonly ? 'default' : 'pointer',
            color: i <= value ? 'var(--primary)' : 'var(--gray-200)',
            transition: 'color 0.2s',
          }}
        >
          ★
        </span>
      ))}
    </div>
  )
}
