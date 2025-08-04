// src/services/api.js

const BASE_URL = 'http://localhost:3001/api';

/**
 * Erstellt eine neue Lobby.
 * @returns {Promise<string>} Die neue Lobby-ID
 */
export async function createLobby(nickname) {
  const res = await fetch('http://localhost:3001/api/lobby', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    nickname: nickname,       // 👈 erforderlich
    admin: true             // 👈 falls du im Backend admin erwartest
  }),
});
  if (!res.ok) {
    const { error } = await res.json();
    throw new Error(error || 'Fehler beim Erstellen der Lobby');
  }
  return await res.json(); // enthält jetzt { lobbyId, playerId }
  // const res = await fetch(`${BASE_URL}/lobby`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({})   // Leerer Body, falls nötig
  // });
  // if (!res.ok) {
  //   const { error } = await res.json();
  //   throw new Error(error || 'Fehler beim Erstellen der Lobby');
  // }
  // const { lobbyId } = await res.json();
  // return lobbyId;
}

/**
 * Tritt einer Lobby bei.
 * @param {string} lobbyId 
 * @param {string} nickname 
 * @param {boolean} admin — ob der Spieler Admin-Rechte erhält
 * @returns {Promise<string>} Die neue Player-ID
 */
export async function joinLobby(lobbyId, nickname, admin = false) {
  const res = await fetch(`${BASE_URL}/player`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ lobbyId, nickname, admin })
  });
  if (!res.ok) {
    const { error } = await res.json();
    throw new Error(error || 'Beitritt fehlgeschlagen');
  }
  const { playerId } = await res.json();
  return playerId;
}

/**
 * Liest die Daten einer Lobby aus.
 * @param {string} lobbyId 
 * @returns {Promise<{ id: string, createdAt: number, players: Record<string, any> }>}
 */
export async function fetchLobby(lobbyId) {
  const res = await fetch(`${BASE_URL}/lobby/${lobbyId}`);
  if (!res.ok) {
    const { error } = await res.json();
    throw new Error(error || 'Lobby nicht gefunden');
  }
  return await res.json();
}

/**
 * Holt nur das players-Objekt einer Lobby.
 * @param {string} lobbyId 
 * @returns {Promise<any[]>} Array der Player-Objekte
 */
export async function getLobbyPlayers(lobbyId) {
  const { players } = await fetchLobby(lobbyId);
  // players ist ein Objekt { playerId: { … } }, wir wandeln es in ein Array um
  return Object.values(players || {});
}

/**
 * Entfernt einen Spieler aus der Lobby.
 * @param {string} lobbyId 
 * @param {string} playerId 
 */
export async function leaveLobby(lobbyId, playerId) {
  const res = await fetch(`${BASE_URL}/player/${lobbyId}/${playerId}`, {
    method: 'DELETE'
  });
  if (!res.ok) {
    const { error } = await res.json();
    throw new Error(error || 'Lobby-Verlassen fehlgeschlagen');
  }
  return true;
}


// src/services/api.js
export async function createLobbyWithAdmin(nickname) {
const res = await fetch('http://localhost:3001/api/lobby', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    nickname: nickname,       // 👈 erforderlich
    admin: true             // 👈 falls du im Backend admin erwartest
  }),
});
  if (!res.ok) {
    const { error } = await res.json();
    throw new Error(error || 'Fehler beim Erstellen der Lobby');
  }
  return await res.json(); // enthält jetzt { lobbyId, playerId }
}
