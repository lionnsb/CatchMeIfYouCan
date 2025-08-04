export default function CenteredCard({ children }) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        width: '100vw',
        background: '#121212',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'sans-serif',
        color: '#fff',
      }}
    >
      <div
        style={{
          background: '#1e1e1e',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
          minWidth: '300px',
        }}
      >
        {children}
      </div>
    </div>
  );
}
