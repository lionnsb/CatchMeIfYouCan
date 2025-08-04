// src/containers/LobbyContainer.jsx
import { useState, useEffect } from 'react';
import LobbyMenu from '../components/Lobby/LobbyMenu';
import MapWrapper from '../components/MapWrapper';
import { createLobby, joinLobby } from '../services/api';

export default function LobbyContainer() {
  const [session, setSession] = useState(null);

  // Prüfe beim Mount, ob bereits eine Session im localStorage liegt
  useEffect(() => {
    const playerId = localStorage.getItem('playerId');
    const lobbyId  = localStorage.getItem('lobbyId');
    if (playerId && lobbyId) {
      setSession({ playerId, lobbyId });
    }
  }, []);

  // Callback für „Lobby beitreten“
  const handleJoin = async (lobbyId) => {
    const playerId = await joinLobby(lobbyId);
    localStorage.setItem('playerId', playerId);
    localStorage.setItem('lobbyId', lobbyId);
    setSession({ playerId, lobbyId });
  };

  // Callback für „Neue Lobby erstellen & beitreten“
  const handleCreate = async () => {
    const lobbyId  = await createLobby();
    const playerId = await joinLobby(lobbyId);
    localStorage.setItem('playerId', playerId);
    localStorage.setItem('lobbyId', lobbyId);
    setSession({ playerId, lobbyId });
  };

  // Callback für „Lobby verlassen“
  const handleLeave = () => {
    localStorage.removeItem('playerId');
    localStorage.removeItem('lobbyId');
    setSession(null);
  };

  // Wenn eine Session existiert, zeige die Map mit Leave-Button
  if (session) {
    return (
      <MapWrapper
        playerId={session.playerId}
        lobbyId={session.lobbyId}
        onLeave={handleLeave}
      />
    );
  }

  // Ansonsten zeige das Lobby-Menu
  return (
    <LobbyMenu
      onJoin={handleJoin}
      onCreate={handleCreate}
    />
  );
}
