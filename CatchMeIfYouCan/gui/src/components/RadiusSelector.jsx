export default function RadiusSelector({ radius, setRadius }) {
  return (
    <>
      <label>🏃 Max. Radius:</label>
      <select value={radius} onChange={(e) => setRadius(Number(e.target.value))}>
        <option value={100}>100 m</option>
        <option value={200}>200 m</option>
        <option value={300}>300 m</option>
      </select>
    </>
  );
}
