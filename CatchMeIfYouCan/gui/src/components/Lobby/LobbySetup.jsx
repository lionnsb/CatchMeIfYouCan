// src/components/Lobby/LobbySetup.jsx

import { useEffect, useState } from 'react';
import { getLobbyPlayers } from '../../services/api';

export default function LobbySetup({ lobbyId, playerId, isAdmin, onStart, onLeaveLobby }) {
  const [players, setPlayers] = useState({});
  const [radius, setRadius] = useState(200);
  const [duration, setDuration] = useState(10);

  useEffect(() => {
    const interval = setInterval(async () => {
      const data = await getLobbyPlayers(lobbyId);
      setPlayers(data || {});
    }, 2000); // alle 2 Sek. updaten
    return () => clearInterval(interval);
  }, [lobbyId]);

  const handleStart = () => {
    onStart({ radius, duration });
  };

  const handleLeave = async () => {
    try {
      await fetch(`http://localhost:3001/api/player/${playerId}`, {
        method: 'DELETE',
      });
    } catch (err) {
      console.warn('Fehler beim Verlassen der Lobby:', err);
    }
    onLeaveLobby();
  };

  return (
    <div style={wrapperStyle}>
      <h2>🎯 Lobby: {lobbyId}</h2>
      <p>🧍 Spieler: {Object.keys(players).length}</p>
      <ul>
        {Object.values(players).map((p) => (
          <li key={p.id}>{p.nickname || '👤 Unbekannt'}</li>
        ))}
      </ul>

      {isAdmin && (
        <>
          <div style={formGroup}>
            <label>🎮 Radius (Meter):</label>
            <input
              type="number"
              value={radius}
              onChange={(e) => setRadius(parseInt(e.target.value))}
            />
          </div>

          <div style={formGroup}>
            <label>⏱️ Zeitlimit (Minuten):</label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value))}
            />
          </div>

          <button style={buttonStyle} onClick={handleStart}>🚀 Spiel starten</button>
        </>
      )}

      <button style={leaveButton} onClick={handleLeave}>❌ Lobby verlassen</button>
    </div>
  );
}

const wrapperStyle = {
  maxWidth: '400px',
  margin: '5rem auto',
  padding: '2rem',
  backgroundColor: '#f7f7f7',
  borderRadius: '10px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  fontFamily: 'sans-serif',
  textAlign: 'center'
};

const formGroup = {
  margin: '1rem 0'
};

const buttonStyle = {
  padding: '0.7rem 1.5rem',
  backgroundColor: '#2ecc71',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  marginTop: '1rem'
};

const leaveButton = {
  ...buttonStyle,
  backgroundColor: '#e74c3c'
};
