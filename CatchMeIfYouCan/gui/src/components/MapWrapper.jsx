// src/components/MapWrapper.jsx
import { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import PlayerMarker from './PlayerMarker';
import RadiusCircle from './RadiusCircle';
import RadiusSelector from './RadiusSelector';
import GeoFenceWarning from './GeoFenceWarning';
import DevToolsPanel from './DevToolsPanel';

import * as turf from '@turf/turf';

const MAPTILER_KEY = 'P6K1Aupk86BRSs1GmAHF';
const mapStyle = `https://api.maptiler.com/maps/streets/style.json?key=${MAPTILER_KEY}`;

export default function MapWrapper() {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const [position, setPosition] = useState(null);
  const [radius, setRadius] = useState(200);
  const [outsideZone, setOutsideZone] = useState(false);
  const [startCenter, setStartCenter] = useState(null);
  const [devMode, setDevMode] = useState(false);

  // GPS Live-Tracking (manuell klickbar nur im DevMode)
  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const coords = [pos.coords.longitude, pos.coords.latitude];
        setPosition(coords);
        setStartCenter(coords); // Startposition nur einmal setzen
        if (mapRef.current) {
          mapRef.current.setCenter(coords);
        }
      },
      (err) => console.error('Geolocation-Fehler:', err),
      { enableHighAccuracy: true }
    );
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  // Initialisiere Map
  useEffect(() => {
    if (mapContainer.current && !mapRef.current && position) {
      mapRef.current = new maplibregl.Map({
        container: mapContainer.current,
        style: mapStyle,
        center: position,
        zoom: 17,
      });

      mapRef.current.on('click', (e) => {
        if (!devMode) return;
        const coords = [e.lngLat.lng, e.lngLat.lat];
        setPosition(coords);
      });
    }
  }, [position, devMode]);

  // Warnung bei Verlassen des Radius (vom Startpunkt aus)
  useEffect(() => {
    if (!position || !startCenter || !radius) return;
    const pt = turf.point(position);
    const circle = turf.circle(startCenter, radius / 1000, {
      steps: 64,
      units: 'kilometers',
    });
    const inside = turf.booleanPointInPolygon(pt, circle);
    setOutsideZone(!inside);
  }, [position, startCenter, radius]);

  return (
    <div>
      <div style={{ position: 'absolute', zIndex: 10, padding: '1rem' }}>
       <DevToolsPanel
        devMode={devMode}
        setDevMode={setDevMode}
        setPosition={setPosition}/>
        <RadiusSelector radius={radius} setRadius={setRadius} />
        <GeoFenceWarning isOutside={outsideZone} />
      </div>

      <div ref={mapContainer} style={{ height: '100vh', width: '100vw' }} />
      {!position && <p>📡 GPS wird geladen…</p>}
      {position && mapRef.current && (
        <>
          <PlayerMarker map={mapRef.current} position={position} />
          <RadiusCircle map={mapRef.current} center={startCenter} radius={radius} />
        </>
      )}
    </div>
  );
}
