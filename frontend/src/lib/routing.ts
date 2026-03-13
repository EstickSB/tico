export async function getRoute(from: [number, number], to: [number, number]) {
  try {
    const res = await fetch(
      `https://router.project-osrm.org/route/v1/driving/${from[1]},${from[0]};${to[1]},${to[0]}?overview=full&geometries=geojson`
    );
    const data = await res.json();
    if (data.routes?.[0]) {
      return {
        coordinates: data.routes[0].geometry.coordinates.map(([lng, lat]: number[]) => [lat, lng] as [number, number]),
        distance: data.routes[0].distance,
        duration: data.routes[0].duration,
      };
    }
  } catch (e) {
    console.warn('OSRM routing failed:', e);
  }
  return null;
}

export const CHICLAYO_CENTER: [number, number] = [-6.7714, -79.8409];

export const DEMO_LOCATIONS: Record<string, [number, number]> = {
  'Plaza de Armas': [-6.7701, -79.8400],
  'Real Plaza': [-6.7650, -79.8380],
  'Hospital Regional': [-6.7740, -79.8350],
  'Terminal EPSEL': [-6.7800, -79.8430],
  'Aeropuerto': [-6.7875, -79.8281],
  'Open Plaza': [-6.7630, -79.8410],
  'USAT': [-6.7560, -79.8440],
  'Terminal': [-6.7800, -79.8430],
  'Hospital': [-6.7740, -79.8350],
};
