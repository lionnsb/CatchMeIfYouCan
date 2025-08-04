export default function CreateLobbyButton({ onCreate }) {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🆕 Neue Lobby erstellen</h2>
      <button onClick={onCreate} style={styles.createButton}>
        Erstellen
      </button>
    </div>
  );
}

const styles = {
  container: { display: 'flex', flexDirection: 'column', gap: '0.75rem' },
  heading: { color: '#fff', textAlign: 'center', margin: 0 },
  createButton: {
    padding: '0.6rem',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: '#3498db',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '1rem',
  },
};
