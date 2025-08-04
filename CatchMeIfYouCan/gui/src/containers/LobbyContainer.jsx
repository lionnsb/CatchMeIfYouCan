// src/containers/LobbyContainer.jsx

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LobbyMenu from '../components/Lobby/LobbyMenu';
import LobbySetup from '../components/Lobby/LobbySetup';
import MapWrapper from '../components/MapWrapper';
import {
  createLobby,
  joinLobby,
  leaveLobby as apiLeaveLobby,
} from '../services/api';

export default function LobbyContainer() {
  const [session, setSession] = useState(null);
  const [phase, setPhase] = useState('menu'); // 'menu' | 'setup' | 'play'
  const [gameSettings, setGameSettings] = useState(null);
  const navigate = useNavigate();

  // Beim ersten Mount: Daten aus localStorage laden
  useEffect(() => {
    const playerId = localStorage.getItem('playerId');
    const lobbyId = localStorage.getItem('lobbyId');
    const nickname = localStorage.getItem('nickname');
    const admin = localStorage.getItem('admin') === 'true';
    const gs = localStorage.getItem('gameSettings');
    const parsedGS = gs ? JSON.parse(gs) : null;

    if (playerId && lobbyId && nickname) {
      setSession({ playerId, lobbyId, nickname, admin });
      if (parsedGS) {
        setGameSettings(parsedGS);
        setPhase('play');
        navigate(`/lobby/${lobbyId}`);
      } else {
        setPhase('setup');
        navigate(`/lobby/${lobbyId}`);
      }
    }
  }, [navigate]);

  // Handler: Join
  const handleJoin = async (lobbyId, nickname) => {
    const playerId = await joinLobby(lobbyId, nickname, false);
    localStorage.setItem('playerId', playerId);
    localStorage.setItem('lobbyId', lobbyId);
    localStorage.setItem('nickname', nickname);
    localStorage.setItem('admin', 'false');
    setSession({ playerId, lobbyId, nickname, admin: false });
    setPhase('setup');
    navigate(`/lobby/${lobbyId}`);
  };

  // Handler: Create
  const handleCreate = async (nickname) => {
    const lobbyId = await createLobby();
    const playerId = await joinLobby(lobbyId, nickname, true);
    localStorage.setItem('playerId', playerId);
    localStorage.setItem('lobbyId', lobbyId);
    localStorage.setItem('nickname', nickname);
    localStorage.setItem('admin', 'true');
    setSession({ playerId, lobbyId, nickname, admin: true });
    setPhase('setup');
    navigate(`/lobby/${lobbyId}`);
  };

  // Handler: Start
  const handleStart = (settings) => {
    if (!session.admin) return;
    localStorage.setItem('gameSettings', JSON.stringify(settings));
    setGameSettings(settings);
    setPhase('play');
  };

  // Handler: Leave
  const handleLeave = async () => {
    if (session) {
      try {
        await apiLeaveLobby(session.lobbyId, session.playerId);
      } catch (err) {
        console.warn('Fehler beim Verlassen der Lobby:', err);
      }
    }
    localStorage.removeItem('playerId');
    localStorage.removeItem('lobbyId');
    localStorage.removeItem('nickname');
    localStorage.removeItem('admin');
    localStorage.removeItem('gameSettings');
    setSession(null);
    setGameSettings(null);
    setPhase('menu');
    navigate(`/`);
  };

  // Rendering je nach Phase
  if (phase === 'menu' && !session) {
    return <LobbyMenu onJoin={handleJoin} onCreate={handleCreate} />;
  }

  if (phase === 'setup' && session) {
    return (
      <LobbySetup
        lobbyId={session.lobbyId}
        playerId={session.playerId}
        isAdmin={session.admin}
        onStart={handleStart}
        onLeaveLobby={handleLeave}
      />
    );
  }

  if (phase === 'play' && session) {
    return (
      <MapWrapper
        lobbyId={session.lobbyId}
        playerId={session.playerId}
        onLeave={handleLeave}
        gameSettings={gameSettings}
      />
    );
  }

  return null;
}
