import express from 'express';
import { db } from '../firebase.js';

const router = express.Router();

// Hilfs-Funktion zum Generieren
function generateLobbyCode(length = 5) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// 1) POST /api/lobby  → Lobby erstellen
router.post('/', async (req, res) => {
  try {
    const lobbyId = generateLobbyCode();
    await db.ref(`lobbies/${lobbyId}`).set({
      id: lobbyId,
      createdAt: Date.now(),
      players: {}
    });
    res.status(201).json({ lobbyId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Lobby konnte nicht erstellt werden' });
  }
});

// ⇣ Neu: GET /api/lobby/:lobbyId  → Lobby-Daten auslesen
router.get('/:lobbyId', async (req, res) => {
  const { lobbyId } = req.params;
  try {
    const snap = await db.ref(`lobbies/${lobbyId}`).once('value');
    if (!snap.exists()) {
      return res.status(404).json({ error: 'Lobby nicht gefunden' });
    }
    const lobby = snap.val();
    // wir geben id + players zurück (inkl. ihrer Position, wenn gesetzt)
    return res.json({
      id: lobby.id,
      createdAt: lobby.createdAt,
      players: lobby.players || {}
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Fehler beim Lesen der Lobby' });
  }
});

// z. B. in player.routes.js
router.delete('/:playerId', async (req, res) => {
  const { playerId } = req.params;
  try {
    const snap = await db.ref('lobbies').once('value');
    let removed = false;

    snap.forEach((lobbySnap) => {
      const lobby = lobbySnap.val();
      if (lobby.players && lobby.players[playerId]) {
        db.ref(`lobbies/${lobbySnap.key}/players/${playerId}`).remove();
        removed = true;
      }
    });

    if (removed) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(404).json({ error: 'Player not found in any lobby' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Fehler beim Entfernen des Spielers' });
  }
});


export default router;
