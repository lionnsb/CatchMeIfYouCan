// api/index.js
import express from 'express';
import cors from 'cors';
import lobbyRoutes from './routes/lobby.js';
import playerRoutes from './routes/player.js';
// import positionRoutes from './routes/position.js';

const app = express();
const PORT = 3001;

// Erlaube Anfragen von deinem Vite-Server
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET','POST','OPTIONS'],
}));

// JSON-Body parsen
app.use(express.json());

// Routen
app.use('/api/lobby', lobbyRoutes);
app.use('/api/player', playerRoutes);
// app.use('/api/position', positionRoutes);

// Starte Server
app.listen(PORT, () => {
  console.log(`✅ API läuft auf http://localhost:${PORT}`);
});
