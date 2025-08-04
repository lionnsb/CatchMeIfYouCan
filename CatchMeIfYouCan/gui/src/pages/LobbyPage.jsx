// src/pages/LobbyPage.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchLobby, leaveLobby } from '../services/api';
import LobbySetup from '../components/Lobby/LobbySetup';

export default function LobbyPage() {
  const { lobbyId } = useParams();
  const navigate = useNavigate();
  const [lobby, setLobby] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const nickname = localStorage.getItem('nickname');
  const playerId = localStorage.getItem('playerId');

  // Hole aktuelle Lobby-Daten
  useEffect(() => {
    const loadLobby = async () => {
      try {
        const data = await fetchLobby(lobbyId);
        setLobby(data);
        if (data.players[playerId]?.isAdmin) {
          setIsAdmin(true);
        }
      } catch (err) {
        console.error(err);
        alert('Lobby nicht gefunden');
        navigate('/');
      }
    };
    loadLobby();
  }, [lobbyId, navigate, playerId]);

  const handleLeave = async () => {
    await leaveLobby(lobbyId, playerId);
    localStorage.removeItem('lobbyId');
    localStorage.removeItem('playerId');
    navigate('/');
  };

  if (!lobby) return <p>Lade Lobby-Daten...</p>;

  return (
    <div className="centered-container">
      <div className="box">
        <h2>Lobby: {lobby.id}</h2>
        <p>👤 Du bist: {nickname}</p>

        <h4>👥 Spieler in der Lobby:</h4>
        <ul>
          {Object.values(lobby.players).map((p) => (
            <li key={p.id}>
              {p.nickname} {p.isAdmin ? '👑' : ''}
            </li>
          ))}
        </ul>

        {isAdmin && <LobbySetup lobbyId={lobbyId} />}

        <button onClick={handleLeave} style={{ backgroundColor: '#f44336' }}>
          Lobby verlassen
        </button>
      </div>
    </div>
  );
}
