import express from 'express';
import cors from 'cors';
import lobbyRoutes from './routes/lobby.js';
import playerRoutes from './routes/player.js';

const app = express();
const PORT = 3001;

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));


// Diese Zeile hinzufügen 👇
// app.options('*', cors()); 

app.use(express.json());

app.use('/api/lobby', lobbyRoutes);
app.use('/api/player', playerRoutes);

app.listen(PORT, () => {
  console.log(`✅ API läuft auf http://localhost:${PORT}`);
});
