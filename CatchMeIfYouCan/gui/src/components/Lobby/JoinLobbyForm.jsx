import { useState } from 'react';

export default function JoinLobbyForm({ onJoin }) {
  const [lobbyId, setLobbyId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onJoin(lobbyId.trim().toUpperCase());
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.heading}>🎮 Einer Lobby beitreten</h2>
      <input
        type="text"
        placeholder="Lobby-ID eingeben"
        value={lobbyId}
        onChange={(e) => setLobbyId(e.target.value)}
        style={styles.input}
      />
      <button type="submit" style={styles.joinButton}>
        Beitreten
      </button>
    </form>
  );
}

const styles = {
  form: { display: 'flex', flexDirection: 'column', gap: '0.75rem' },
  heading: { color: '#fff', textAlign: 'center', margin: 0 },
  input: {
    padding: '0.6rem',
    borderRadius: '6px',
    border: '1px solid #555',
    backgroundColor: '#333',
    color: '#fff',
    fontSize: '1rem',
  },
  joinButton: {
    padding: '0.6rem',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: '#2ecc71',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '1rem',
  },
};
