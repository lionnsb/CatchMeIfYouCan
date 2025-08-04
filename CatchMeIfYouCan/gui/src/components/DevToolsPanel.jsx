export default function DevToolsPanel({ devMode, setDevMode, setPosition }) {
  const testPositions = [
    { label: '↪️ Innerhalb Radius', coords: [6.9509, 51.1402] },
    { label: '🚫 Außerhalb Radius', coords: [6.9600, 51.1500] },
    { label: '🎯 Zentrumspunkt', coords: [6.9509, 51.1400] },
  ];

  return (
    <div style={{ marginBottom: '1rem' }}>
      <label style={{ marginRight: '1rem' }}>
        <input
          type="checkbox"
          checked={devMode}
          onChange={(e) => setDevMode(e.target.checked)}
        />{' '}
        🛠️ Dev Mode aktivieren
      </label>

      {devMode && (
        <div style={{ marginTop: '0.5rem' }}>
          <p style={{ margin: '0.3rem 0' }}>📍 Test-Positionen:</p>
          {testPositions.map((pos, i) => (
            <button
              key={i}
              onClick={() => setPosition(pos.coords)}
              style={{
                marginRight: '0.5rem',
                padding: '0.3rem 0.6rem',
                fontSize: '0.9rem',
                cursor: 'pointer',
              }}
            >
              {pos.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
