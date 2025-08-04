import express from 'express';
import cors from 'cors';
import lobbyRoutes from './routes/lobby.js';
import playerRoutes from './routes/player.js';

const app = express();
const PORT = 3001;

app.use(cors());             // ✅ CORS ist okay
app.use(express.json());     // ✅ DAS hier ist das Entscheidende!

// Danach erst die Routen
app.use('/api/lobby', lobbyRoutes);
app.use('/api/player', playerRoutes);

app.use('/api/lobby', lobbyRoutes);
app.use('/api/player', playerRoutes);

app.listen(PORT, () => {
  console.log(`✅ API läuft auf http://localhost:${PORT}`);
});
