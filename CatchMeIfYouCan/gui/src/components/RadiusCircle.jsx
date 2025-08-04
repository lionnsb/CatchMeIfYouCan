import { useEffect } from 'react';
import * as turf from '@turf/turf';

export default function RadiusCircle({ map, center, radius }) {
  useEffect(() => {
    if (!map || !center || !radius) return;

    const circle = turf.circle(center, radius / 1000, {
      steps: 64,
      units: 'kilometers',
    });

    if (!map.getSource('radius-circle')) {
      map.addSource('radius-circle', {
        type: 'geojson',
        data: circle,
      });

      map.addLayer({
        id: 'radius-fill',
        type: 'fill',
        source: 'radius-circle',
        paint: {
          'fill-color': '#00cc99',
          'fill-opacity': 0.2,
        },
      });

      map.addLayer({
        id: 'radius-outline',
        type: 'line',
        source: 'radius-circle',
        paint: {
          'line-color': '#00cc99',
          'line-width': 2,
        },
      });
    } else {
      map.getSource('radius-circle').setData(circle);
    }
  }, [map, center, radius]);

  return null;
}
