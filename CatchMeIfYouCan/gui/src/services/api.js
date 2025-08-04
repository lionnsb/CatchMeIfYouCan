// gui/src/services/api.js
const BASE = 'http://localhost:3001/api';

export async function createLobby() {
  const res = await fetch(`${BASE}/lobby`, { method: 'POST' });
  if (!res.ok) throw new Error('Lobby konnte nicht erstellt werden');
  const { lobbyId } = await res.json();
  return lobbyId;
}

export async function joinLobby(lobbyId) {
  const res = await fetch(`${BASE}/player`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ lobbyId }),
  });
  if (!res.ok) {
    const { error } = await res.json();
    throw new Error(error || 'Fehler beim Beitreten');
  }
  const { playerId } = await res.json();
  return playerId;
}

export async function fetchLobby(lobbyId) {
  const res = await fetch(`${BASE}/lobby/${lobbyId}`);
  if (!res.ok) throw new Error('Lobby nicht gefunden');
  return res.json();
}

export async function postPosition(lobbyId, playerId, position) {
  const res = await fetch(`${BASE}/position`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ lobbyId, playerId, position }),
  });
  if (!res.ok) throw new Error('Position konnte nicht gesendet werden');
  return res.json();
}
