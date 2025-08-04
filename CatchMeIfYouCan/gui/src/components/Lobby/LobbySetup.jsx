import { useEffect, useState } from 'react';
import { getLobbyPlayers } from '../../services/api';
import { FaCrown } from 'react-icons/fa';

export default function LobbySetup({ lobbyId, isAdmin, onStart }) {
  const [players, setPlayers] = useState([]);
  const [radius, setRadius] = useState(200);
  const [roundTime, setRoundTime] = useState(10);

  // Live-Update der Spielerliste alle 3 Sekunden
  useEffect(() => {
    let cancelled = false;
    const fetchPlayers = async () => {
      try {
        const obj = await getLobbyPlayers(lobbyId);
        const list = Object.values(obj);
        if (!cancelled) setPlayers(list);
      } catch (err) {
        console.error('Fehler beim Laden der Spieler:', err);
      }
    };
    fetchPlayers();
    const id = setInterval(fetchPlayers, 3000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [lobbyId]);

  const handleStart = () => {
    onStart({ radius, roundTime });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Lobby: {lobbyId}</h2>
      <p style={styles.subheading}>{players.length} Spieler in der Lobby</p>

      <ul style={styles.list}>
        {players.map((p) => (
          <li key={p.id} style={styles.listItem}>
            {p.nickname}
            {p.admin && <FaCrown style={styles.crown} />}
          </li>
        ))}
      </ul>

      {isAdmin && (
        <div style={styles.settings}>
          <div style={styles.settingRow}>
            <label style={styles.label}>
              Radius: <strong>{radius} m</strong>
            </label>
            <input
              type="range"
              min="100"
              max="500"
              step="50"
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              style={styles.slider}
            />
          </div>

          <div style={styles.settingRow}>
            <label style={styles.label}>Rundenzeit:</label>
            <select
              value={roundTime}
              onChange={(e) => setRoundTime(Number(e.target.value))}
              style={styles.select}
            >
              {[5, 10, 15, 20, 30].map((m) => (
                <option key={m} value={m}>
                  {m} Minuten
                </option>
              ))}
            </select>
          </div>

          <button onClick={handleStart} style={styles.startButton}>
            🚀 Spiel starten
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 500,
    margin: '2rem auto',
    padding: '1.5rem',
    backgroundColor: '#2c2c2c',
    borderRadius: 8,
    color: '#fff',
    fontFamily: 'sans-serif',
    textAlign: 'center',
  },
  heading: {
    marginBottom: '0.5rem',
  },
  subheading: {
    marginBottom: '1rem',
    fontSize: '1rem',
    color: '#ccc',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    marginBottom: '1.5rem',
  },
  listItem: {
    padding: '0.4rem 0',
    fontSize: '1.1rem',
  },
  crown: {
    color: 'gold',
    marginLeft: 6,
    verticalAlign: 'middle',
  },
  settings: {
    marginTop: '1rem',
    textAlign: 'left',
  },
  settingRow: {
    marginBottom: '1rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.3rem',
  },
  slider: {
    width: '100%',
  },
  select: {
    width: '100%',
    padding: '0.4rem',
    borderRadius: 4,
    border: 'none',
    fontSize: '1rem',
  },
  startButton: {
    width: '100%',
    padding: '0.6rem',
    backgroundColor: '#27ae60',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    fontSize: '1rem',
    cursor: 'pointer',
  },
};
