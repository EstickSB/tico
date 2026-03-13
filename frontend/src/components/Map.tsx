import { useEffect, useMemo } from 'react'
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet'
import L from 'leaflet'
import { CHICLAYO_CENTER } from '../lib/routing'

function createDivIcon(className: string, content: string) {
  return L.divIcon({
    className: '',
    html: `<div class="custom-marker ${className}">${content}</div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  })
}

export const originIcon = createDivIcon('marker-origin', 'A')
export const destIcon = createDivIcon('marker-dest', 'B')
export const driverIcon = L.divIcon({
  className: '',
  html: `<div class="custom-marker marker-driver">🚕</div>`,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
})
export const userIcon = L.divIcon({
  className: '',
  html: `<div class="pulse-dot"></div>`,
  iconSize: [16, 16],
  iconAnchor: [8, 8],
})

interface MapMarker {
  position: [number, number]
  icon: L.DivIcon
}

interface MapProps {
  center?: [number, number]
  zoom?: number
  markers?: MapMarker[]
  route?: [number, number][]
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
}

function FitBounds({ markers, route }: { markers?: MapMarker[]; route?: [number, number][] }) {
  const map = useMap()
  useEffect(() => {
    const points: [number, number][] = []
    markers?.forEach(m => points.push(m.position))
    route?.forEach(p => points.push(p))
    if (points.length >= 2) {
      const bounds = L.latLngBounds(points.map(p => L.latLng(p[0], p[1])))
      map.fitBounds(bounds, { padding: [50, 50] })
    }
  }, [markers?.length, route?.length])
  return null
}

export default function Map({ center, zoom = 14, markers, route, className, style, children }: MapProps) {
  const mapCenter = useMemo(() => center || CHICLAYO_CENTER, [center])

  return (
    <MapContainer
      center={mapCenter}
      zoom={zoom}
      className={className}
      style={{ width: '100%', height: '100%', ...style }}
      zoomControl={false}
      attributionControl={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      {markers?.map((m, i) => (
        <Marker key={i} position={m.position} icon={m.icon} />
      ))}
      {route && route.length >= 2 && (
        <Polyline positions={route} pathOptions={{ color: '#FFC107', weight: 5, opacity: 0.85 }} />
      )}
      <FitBounds markers={markers} route={route} />
      {children}
    </MapContainer>
  )
}
