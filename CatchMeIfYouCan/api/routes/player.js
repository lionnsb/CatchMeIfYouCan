import express from 'express';
import { db } from '../firebase.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

router.post('/', async (req, res) => {
  const { lobbyId } = req.body;

  if (!lobbyId) return res.status(400).json({ error: 'lobbyId fehlt' });

  const lobbyRef = db.ref(`lobbies/${lobbyId}`);
  const snapshot = await lobbyRef.once('value');

  if (!snapshot.exists()) {
    return res.status(404).json({ error: 'Lobby nicht gefunden' });
  }

  const playerId = uuidv4();
  const playerData = {
    id: playerId,
    joinedAt: new Date().toISOString(),
  };

  await db.ref(`lobbies/${lobbyId}/players/${playerId}`).set(playerData);

  res.status(201).json({ playerId });
});

export default router;
