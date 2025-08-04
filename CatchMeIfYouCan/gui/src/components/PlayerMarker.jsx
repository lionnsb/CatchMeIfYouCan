import { useEffect } from 'react';
import maplibregl from 'maplibre-gl';

export default function PlayerMarker({ map, position }) {
  useEffect(() => {
    if (!map || !position) return;

    const marker = new maplibregl.Marker().setLngLat(position).addTo(map);

    return () => marker.remove(); // Marker bereinigen beim Unmount
  }, [map, position]);

  return null;
}
