// src/components/MapWrapper.jsx
import { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useLobbyPlayers } from '../hooks/useLobbyPlayers';
import PlayerMarker from './PlayerMarker';
import RadiusCircle from './RadiusCircle';
import RadiusSelector from './RadiusSelector';
import GeoFenceWarning from './GeoFenceWarning';
import DevToolsPanel from './DevToolsPanel';
import * as turf from '@turf/turf';

export default function MapWrapper({ lobbyId, playerId, onLeave }) {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);

  const [position, setPosition] = useState(null);
  const [radius, setRadius] = useState(200);
  const [outsideZone, setOutsideZone] = useState(false);
  const [startCenter, setStartCenter] = useState(null);
  const [devMode, setDevMode] = useState(false);

  // Hook: alle Spieler-Positionen der Lobby (Polling alle 3s)
  const players = useLobbyPlayers(lobbyId, 3000);

  // Live-GPS-Tracking (setzt eigene Position und Center)
  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const coords = [pos.coords.longitude, pos.coords.latitude];
        setPosition(coords);
        setStartCenter((sc) => sc || coords);
        if (mapRef.current) mapRef.current.setCenter(coords);
      },
      (err) => console.error('Geolocation-Fehler:', err),
      { enableHighAccuracy: true }
    );
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  // Map initialisieren
  useEffect(() => {
    if (!mapContainer.current || mapRef.current || !position) return;
    mapRef.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets/style.json?key=P6K1Aupk86BRSs1GmAHF`,
      center: position,
      zoom: 17,
    });

    // DevMode-Klick zum Setzen der Test-Position
    mapRef.current.on('click', (e) => {
      if (!devMode) return;
      setPosition([e.lngLat.lng, e.lngLat.lat]);
    });
  }, [position, devMode]);

  // Geo-Fence Warnung, wenn außerhalb des Radius
  useEffect(() => {
    if (!position || !startCenter) return;
    const pt = turf.point(position);
    const circle = turf.circle(startCenter, radius / 1000, { steps: 64, units: 'kilometers' });
    setOutsideZone(!turf.booleanPointInPolygon(pt, circle));
  }, [position, startCenter, radius]);

  // Style fürs Control-Panel oben links
  const panelStyle = {
    position: 'absolute',
    top: '1rem',
    left: '1rem',
    zIndex: 10,
    padding: '1rem',
    backgroundColor: 'rgba(255,255,255,0.9)',
    color: '#222',
    borderRadius: '12px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    maxWidth: '280px',
    fontFamily: 'sans-serif',
  };

  return (
    <div>
      {/* Control-Panel */}
      <div style={panelStyle}>
        {/* 1) Lobby verlassen */}
        <button
          onClick={onLeave}
          style={{
            width: '100%',
            marginBottom: '0.75rem',
            padding: '0.5rem',
            backgroundColor: '#e74c3c',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Lobby verlassen
        </button>

        {/* 2) Dev-Tools, Radius-Selector & Warnung */}
        <DevToolsPanel devMode={devMode} setDevMode={setDevMode} setPosition={setPosition} />
        <RadiusSelector radius={radius} setRadius={setRadius} />
        <GeoFenceWarning isOutside={outsideZone} />
      </div>

      {/* Map-Container */}
      <div ref={mapContainer} style={{ height: '100vh', width: '100vw' }} />

      {/* Lade-Hinweis, bis GPS da ist */}
      {!position && <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>📡 GPS wird geladen…</p>}

      {/* Marker, sobald Map & Position verfügbar sind */}
      {position && mapRef.current && (
        <>
          {/* Eigener Spieler */}
          <PlayerMarker map={mapRef.current} position={position} color="green" />

          {/* Radius-Kreis */}
          <RadiusCircle map={mapRef.current} center={startCenter} radius={radius} />

          {/* Alle anderen Spieler */}
          {Object.values(players).map((p) =>
            p.position ? (
              <PlayerMarker
                key={p.id}
                map={mapRef.current}
                position={p.position}
                color={p.id === playerId ? 'green' : 'blue'}
              />
            ) : null
          )}
        </>
      )}
    </div>
  );
}
