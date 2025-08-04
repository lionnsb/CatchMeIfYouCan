// src/pages/StartPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createLobby, joinLobby } from '../services/api';
import '../App.css'; // für zentriertes Layout

export default function StartPage() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState(localStorage.getItem('nickname') || '');
  const [lobbyIdInput, setLobbyIdInput] = useState('');

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
    localStorage.setItem('nickname', e.target.value);
  };

  const handleCreateLobby = async () => {
    const newLobbyId = await createLobby(nickname);
    navigate(`/lobby/${newLobbyId}`);
  };

  const handleJoinLobby = async () => {
    if (!lobbyIdInput) return;
    try {
      await joinLobby(lobbyIdInput, nickname);
      navigate(`/lobby/${lobbyIdInput}`);
    } catch (err) {
      alert(err.message || 'Beitritt fehlgeschlagen');
    }
  };

  return (
    <div className="centered-container">
      <div className="box">
        <h2>🎮 Catch Me If You Can</h2>

        <label>Dein Nickname:</label>
        <input
          value={nickname}
          onChange={handleNicknameChange}
          placeholder="z. B. Lion"
        />

        <button onClick={handleCreateLobby} disabled={!nickname}>
          Lobby erstellen
        </button>

        <hr />

        <label>Lobby-Code eingeben:</label>
        <input
          value={lobbyIdInput}
          onChange={(e) => setLobbyIdInput(e.target.value.toUpperCase())}
          placeholder="z. B. 5U3QX"
        />

        <button onClick={handleJoinLobby} disabled={!nickname || !lobbyIdInput}>
          Lobby beitreten
        </button>
      </div>
    </div>
  );
}
