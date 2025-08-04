import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createLobby } from "../services/api";

function CreateLobbyPage() {
  const [radius, setRadius] = useState(200);
  const [duration, setDuration] = useState(10);
  const navigate = useNavigate();

  const handleCreate = async () => {
    const nickname = localStorage.getItem("nickname");
    const response = await createLobby({ nickname, radius, duration });
    navigate(`/lobby/${response.lobbyId}`);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h2>Lobby konfigurieren</h2>
      <label>
        Radius (m):
        <input
          type="number"
          value={radius}
          onChange={(e) => setRadius(Number(e.target.value))}
        />
      </label>
      <br />
      <label>
        Spieldauer (min):
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
        />
      </label>
      <br />
      <button onClick={handleCreate}>Lobby starten</button>
    </div>
  );
}

export default CreateLobbyPage;
