import { useState } from 'react';
import JoinLobbyForm from './JoinLobbyForm';

export default function LobbyMenu({ onJoin, onCreate }) {
  const [nickname, setNickname] = useState(
    localStorage.getItem('nickname') || ''
  );

  const handleCreateClick = () => {
    const name = nickname.trim();
    if (!name) return alert('Bitte Nickname eingeben');
    localStorage.setItem('nickname', name);
    onCreate(name);
  };

  const handleJoinClick = (lobbyId) => {
    const name = nickname.trim();
    if (!name) return alert('Bitte Nickname eingeben');
    localStorage.setItem('nickname', name);
    onJoin(lobbyId, name);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🎮 Catch Me If You Can</h1>

      <label style={styles.label}>Dein Nickname:</label>
      <input
        type="text"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        placeholder="z. B. Lion"
        style={styles.input}
      />

      <button
        onClick={handleCreateClick}
        style={styles.buttonCreate}
        disabled={!nickname.trim()}
      >
        ➕ Neue Lobby erstellen
      </button>

      <hr style={styles.divider} />

      <JoinLobbyForm onJoin={handleJoinClick} />
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 360,
    margin: '5rem auto',
    padding: '2rem',
    backgroundColor: '#2b2b2b',
    borderRadius: 8,
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'sans-serif',
  },
  title: {
    marginBottom: '1rem',
    fontSize: '1.5rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    fontSize: '1rem',
  },
  input: {
    width: '100%',
    padding: '0.5rem',
    marginBottom: '1rem',
    borderRadius: 6,
    border: '1px solid #444',
    backgroundColor: '#333',
    color: '#fff',
    fontSize: '1rem',
  },
  buttonCreate: {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#27ae60',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    fontSize: '1rem',
    cursor: 'pointer',
    marginBottom: '1rem',
  },
  divider: {
    border: 'none',
    borderTop: '1px solid #444',
    margin: '1.5rem 0',
  },
};
