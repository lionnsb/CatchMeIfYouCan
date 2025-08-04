// routes/player.js

import express from 'express';
import { db } from '../firebase.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// POST /api/player
router.post('/', async (req, res) => {
  const { lobbyId, nickname, admin = false } = req.body;
  if (!lobbyId || !nickname) {
    return res.status(400).json({ error: 'lobbyId und nickname erforderlich' });
  }

  const lobbyRef = db.ref(`lobbies/${lobbyId}`);
  const snap = await lobbyRef.once('value');
  if (!snap.exists()) {
    return res.status(404).json({ error: 'Lobby nicht gefunden' });
  }

  const playerId = uuidv4();
  const playerData = {
    id: playerId,
    joinedAt: Date.now(),
    nickname,
    admin,
    position: null
  };

  await db.ref(`lobbies/${lobbyId}/players/${playerId}`).set(playerData);
  res.status(201).json({ playerId });
});

// ✅ Das ist die richtige und einzige DELETE-Route
router.delete('/:lobbyId/:playerId', async (req, res) => {
  const { lobbyId, playerId } = req.params;
  try {
    await db.ref(`lobbies/${lobbyId}/players/${playerId}`).remove();
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Fehler beim Löschen des Spielers:', err);
    return res.status(500).json({ error: 'Konnte Spieler nicht entfernen' });
  }
});


export default router;
