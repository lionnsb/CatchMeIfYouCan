import { useState } from 'react';

export default function LobbyMenu({ onJoin, onCreate }) {
  const [nickname, setNickname] = useState('');
  const [lobbyId, setLobbyId]       = useState('');
  const [error, setError]           = useState(null);
  const [loadingJoin, setLoadingJoin]   = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false);

  // Lobby beitreten
  const handleJoin = async (e) => {
    e.preventDefault();
    setError(null);
    if (!nickname.trim()) {
      setError('Bitte einen Nickname eingeben.');
      return;
    }
    setLoadingJoin(true);
    try {
      await onJoin(lobbyId.trim().toUpperCase(), nickname.trim());
    } catch (err) {
      setError(err.message || 'Lobby nicht gefunden');
    } finally {
      setLoadingJoin(false);
    }
  };

  // Neue Lobby erstellen
  const handleCreate = async () => {
    setError(null);
    if (!nickname.trim()) {
      setError('Bitte einen Nickname eingeben.');
      return;
    }
    setLoadingCreate(true);
    try {
      await onCreate(nickname.trim());
    } catch {
      setError('Lobby konnte nicht erstellt werden');
    } finally {
      setLoadingCreate(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.panel}>
        <h2 style={styles.title}>🎯 Catch Me If You Can</h2>

        <label style={styles.label}>
          Dein Nickname:
          <input
            type="text"
            value={nickname}
            onChange={e => setNickname(e.target.value)}
            placeholder="z. B. Lion"
            style={styles.input}
          />
        </label>

        <form onSubmit={handleJoin} style={{ marginTop: '1rem' }}>
          <input
            type="text"
            value={lobbyId}
            onChange={e => setLobbyId(e.target.value)}
            placeholder="Lobby-ID eingeben"
            style={styles.input}
            disabled={loadingJoin || loadingCreate}
          />
          <button
            type="submit"
            disabled={loadingJoin || loadingCreate}
            style={{
              ...styles.button,
              backgroundColor: loadingJoin ? '#888' : '#2ecc71'
            }}
          >
            {loadingJoin ? 'Warte…' : 'Beitreten'}
          </button>
        </form>

        <button
          onClick={handleCreate}
          disabled={loadingJoin || loadingCreate}
          style={{
            ...styles.button,
            marginTop: '1rem',
            backgroundColor: loadingCreate ? '#888' : '#3498db'
          }}
        >
          {loadingCreate ? 'Warte…' : '🆕 Neue Lobby erstellen'}
        </button>

        {error && <p style={styles.error}>{error}</p>}
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: '100vh', width: '100vw',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#1e1e1e', fontFamily: 'sans-serif'
  },
  panel: {
    backgroundColor: '#2c2c2c',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
    minWidth: '320px',
    color: '#fff',
    display: 'flex', flexDirection: 'column'
  },
  title: {
    textAlign: 'center', margin: 0, marginBottom: '1rem'
  },
  label: {
    display: 'flex', flexDirection: 'column', fontSize: '0.9rem'
  },
  input: {
    marginTop: '0.3rem',
    padding: '0.6rem',
    borderRadius: '6px',
    border: '1px solid #555',
    backgroundColor: '#333',
    color: '#fff',
    fontSize: '1rem',
    width: '100%'
  },
  button: {
    width: '100%',
    padding: '0.6rem',
    border: 'none',
    borderRadius: '6px',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '1rem'
  },
  error: {
    color: 'red',
    marginTop: '1rem',
    textAlign: 'center'
  }
};
