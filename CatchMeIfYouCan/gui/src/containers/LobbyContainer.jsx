// src/containers/LobbyContainer.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import LobbyMenu from '../components/Lobby/LobbyMenu';
import LobbySetup from '../components/Lobby/LobbySetup';
import MapWrapper from '../components/MapWrapper';

import {
  createLobbyWithAdmin,
  getLobbyPlayers,
  leaveLobby
} from '../services/api';

export default function LobbyContainer() {
  const [session, setSession] = useState(null);
  const [phase, setPhase] = useState('menu');           // 'menu' | 'setup' | 'play'
  const [gameSettings, setGameSettings] = useState(null);
  const navigate = useNavigate();

  // Beim ersten Laden: Session aus localStorage wiederherstellen
  useEffect(() => {
    const playerId = localStorage.getItem('playerId');
    const lobbyId  = localStorage.getItem('lobbyId');
    const nickname = localStorage.getItem('nickname');
    const admin    = localStorage.getItem('admin') === 'true';
    const gs       = localStorage.getItem('gameSettings');
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


const handleCreate = async (nickname) => {
  // nickname kommt von deiner LobbyMenu-Komponente
  const { lobbyId, playerId } = await createLobbyWithAdmin(nickname);

  localStorage.setItem('playerId', playerId);
  localStorage.setItem('lobbyId', lobbyId);
  localStorage.setItem('nickname', nickname);
  localStorage.setItem('admin', 'true');

  setSession({ playerId, lobbyId, nickname, admin: true });
  setPhase('setup');
  navigate(`/lobby/${lobbyId}`);
};

  // 2) Handler zum Beitreten (nicht-Admin)
  const handleJoin = async (lobbyId, nickname) => {
    // Hole bestehende Spieler und checke direkt Client-seitig?
    // Nutze getLobbyPlayers in der Setup-Phase
    const playerId = await getLobbyPlayers(lobbyId) /* oder eigener join-Call */;
    // Falls du eine eigene API-Route brauchst, bau sie analog ein:
    // const playerId = await joinLobby(lobbyId, nickname, false);

    localStorage.setItem('playerId', playerId);
    localStorage.setItem('lobbyId', lobbyId);
    localStorage.setItem('nickname', nickname);
    localStorage.setItem('admin', 'false');

    setSession({ playerId, lobbyId, nickname, admin: false });
    setPhase('setup');
    navigate(`/lobby/${lobbyId}`);
  };

  // 3) Spiel starten (nur Admin)
  const handleStart = (settings) => {
    if (!session?.admin) return;
    localStorage.setItem('gameSettings', JSON.stringify(settings));
    setGameSettings(settings);
    setPhase('play');
  };

  // 4) Lobby verlassen
  const handleLeave = async () => {
    if (session) {
      try {
        await leaveLobby(session.lobbyId, session.playerId);
      } catch (err) {
        console.warn('Fehler beim Verlassen der Lobby:', err);
      }
    }
    localStorage.clear();
    setSession(null);
    setGameSettings(null);
    setPhase('menu');
    navigate(`/`);
  };

  // Phase-basiertes Rendering
  if (phase === 'menu') {
    return <LobbyMenu onJoin={handleJoin} onCreate={handleCreate} />;
  }

  if (phase === 'setup' && session) {
    return (
      <LobbySetup
        lobbyId={session.lobbyId}
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
