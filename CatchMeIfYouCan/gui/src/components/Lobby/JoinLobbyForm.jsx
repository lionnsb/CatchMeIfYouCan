import { useState } from 'react';

export default function JoinLobbyForm({ onJoin }) {
  const [lobbyId, setLobbyId] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const id = lobbyId.trim().toUpperCase();
    if (!id) {
      setError('Bitte Lobby-ID eingeben');
      return;
    }
    try {
      await onJoin(id);
    } catch (err) {
      setError(err.message || 'Beitritt fehlgeschlagen');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <label style={styles.label}>Lobby-Code eingeben:</label>
      <input
        type="text"
        value={lobbyId}
        onChange={(e) => setLobbyId(e.target.value)}
        placeholder="z. B. 5U3QX"
        style={styles.input}
      />
      <button type="submit" style={styles.button}>Beitreten</button>
      {error && <p style={styles.error}>{error}</p>}
    </form>
  );
}

const styles = {
  form: { textAlign: 'center' },
  label: { display: 'block', marginBottom: '0.5rem', color: '#fff' },
  input: {
    width: '100%',
    padding: '0.5rem',
    marginBottom: '0.5rem',
    borderRadius: 6,
    border: '1px solid #444',
    backgroundColor: '#333',
    color: '#fff',
    fontSize: '1rem',
  },
  button: {
    width: '100%',
    padding: '0.6rem',
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
    fontSize: '1rem',
  },
  error: { color: 'salmon', marginTop: '0.5rem' },
};
