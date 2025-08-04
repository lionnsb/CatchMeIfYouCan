import { Routes, Route } from 'react-router-dom';
import StartPage from './pages/StartPage';
import LobbyPage from './pages/LobbyPage';
// import GamePage from './pages/GamePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/lobby/:lobbyId" element={<LobbyPage />} />
      {/* <Route path="/game/:lobbyId" element={<GamePage />} /> */}
    </Routes>
  );
}

export default App;
