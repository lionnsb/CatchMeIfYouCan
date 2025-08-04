export default function GeoFenceWarning({ isOutside }) {
  if (!isOutside) return null;

  return (
    <p style={{ color: 'red', fontWeight: 'bold' }}>
      🚨 Du hast den erlaubten Bereich verlassen!
    </p>
  );
}
