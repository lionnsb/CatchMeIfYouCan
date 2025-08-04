// gui/src/hooks/useLobbyPlayers.js
import { useState, useEffect, useRef } from 'react';
import { fetchLobby } from '../services/api';

export function useLobbyPlayers(lobbyId, interval = 3000) {
  const [players, setPlayers] = useState({});
  const timerRef = useRef();

  useEffect(() => {
    if (!lobbyId) return;
    let cancelled = false;

    async function load() {
      try {
        const { players } = await fetchLobby(lobbyId);
        if (!cancelled) setPlayers(players);
      } catch {
        // optional: setPlayers({}); 
      } finally {
        timerRef.current = setTimeout(load, interval);
      }
    }

    load();
    return () => {
      cancelled = true;
      clearTimeout(timerRef.current);
    };
  }, [lobbyId, interval]);

  return players;
}
