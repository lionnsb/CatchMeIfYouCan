import JoinLobbyForm from './JoinLobbyForm';
import CreateLobbyButton from './CreateLobbyButton';

export default function LobbyMenu({ onJoin, onCreate }) {
  return (
    <div style={styles.container}>
      <div style={styles.panel}>
        <JoinLobbyForm onJoin={onJoin} />
        <div style={{ height: '1px', background: '#555', margin: '1.5rem 0' }} />
        <CreateLobbyButton onCreate={onCreate} />
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1e1e1e',
  },
  panel: {
    backgroundColor: '#2c2c2c',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
    minWidth: '320px',
    display: 'flex',
    flexDirection: 'column',
  },
};
