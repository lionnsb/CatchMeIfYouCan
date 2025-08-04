// routes/player.js

import express from 'express';
import { db } from '../firebase.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// POST /api/player
router.post('/', async (req, res) => {
  const { lobbyId, nickname, admin = false } = req.body;
  if (!lobbyId || !nickname) {
    console.warn(`⚠️  INVALID PLAYER POST: missing lobbyId or nickname`);
    return res.status(400).json({ error: 'lobbyId und nickname erforderlich' });
  }

  // Existenz der Lobby prüfen
  const lobbyRef = db.ref(`lobbies/${lobbyId}`);
  const snap = await lobbyRef.once('value');
  if (!snap.exists()) {
    console.warn(`❓  LOBBY NOT FOUND FOR PLAYER: ${lobbyId}`);
    return res.status(404).json({ error: 'Lobby nicht gefunden' });
  }

  // Neuen Spieler anlegen
  const playerId = uuidv4();
  const playerData = {
    id: playerId,
    joinedAt: Date.now(),
    nickname,
    admin,
    position: null
  };

  await db.ref(`lobbies/${lobbyId}/players/${playerId}`).set(playerData);
  console.log(`👤  PLAYER STORED: ${playerId} (${nickname}) in Lobby ${lobbyId}` + (admin ? ' 👑' : ''));
  res.status(201).json({ playerId });
});

// DELETE /api/player/:lobbyId/:playerId
router.delete('/:lobbyId/:playerId', async (req, res) => {
  const { lobbyId, playerId } = req.params;
  try {
    await db.ref(`lobbies/${lobbyId}/players/${playerId}`).remove();
    console.log(`❌  PLAYER REMOVED: ${playerId} from Lobby ${lobbyId}`);
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(`⚠️  ERROR REMOVING PLAYER ${playerId}:`, err.message);
    return res.status(500).json({ error: 'Konnte Spieler nicht entfernen' });
  }
});

export default router;
