// src/components/Lobby/MiniMap.jsx

import { MapContainer, TileLayer, Circle, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function MiniMap({ radius }) {
  const center = [51.1657, 10.4515]; // Deutschland-Zentrum als Dummy-Startpunkt

  return (
    <MapContainer center={center} zoom={15} style={{ height: '200px', width: '100%', marginTop: '10px' }} scrollWheelZoom={false}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Circle center={center} radius={radius} pathOptions={{ color: 'red' }} />
      <Marker position={center} />
    </MapContainer>
  );
}
