// routes/lobby.js

import express from 'express';
import { db } from '../firebase.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Hilfs-Funktion: Lobby-Code generieren
function generateLobbyCode(length = 5) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// POST /api/lobby
// Body: { nickname }
router.post('/', async (req, res) => {
    console.log('REQUEST BODY:', req.body); // 👈 Hinzufügen

  const { nickname } = req.body;
  if (!nickname) {
    return res.status(400).json({ error: 'nickname erforderlich' });
  }
  console.log(`🆕  LOBBY CREATE REQUEST: ${nickname}`);
  try {
    // 1) Lobby anlegen
    const lobbyId = generateLobbyCode();
    await db.ref(`lobbies/${lobbyId}`).set({
      id: lobbyId,
      createdAt: Date.now(),
      players: {}
    });
    console.log(`🆕  LOBBY CREATED: ${lobbyId}`);

    // 2) Admin-Spieler anlegen
    const playerId = uuidv4();
    const playerData = {
      id: playerId,
      joinedAt: Date.now(),
      nickname,
      admin: true,
      position: null
    };
    await db.ref(`lobbies/${lobbyId}/players/${playerId}`).set(playerData);
    console.log(`👤  PLAYER STORED: ${playerId} (${nickname}) in Lobby ${lobbyId} 👑`);

    // 3) Alles zurückgeben
    res.status(201).json({ lobbyId, playerId });
  } catch (err) {
    console.error(`⚠️  ERROR CREATING LOBBY+PLAYER:`, err.message);
    res.status(500).json({ error: 'Lobby konnte nicht erstellt werden' });
  }
});

// GET /api/lobby/:lobbyId  → Lobby-Daten auslesen
router.get('/:lobbyId', async (req, res) => {
  const { lobbyId } = req.params; // lobbyId sollte hier ein String sein
  if (!lobbyId || typeof lobbyId !== 'string') {
    return res.status(400).json({ error: 'Ungültige Lobby-ID' });
  }
  try {
    const snapshot = await db.ref(`lobbies/${lobbyId}`).once('value');
    const lobbyData = snapshot.val();
    if (!lobbyData) {
      return res.status(404).json({ error: 'Lobby nicht gefunden.' });
    }
    res.json(lobbyData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


export default router;
