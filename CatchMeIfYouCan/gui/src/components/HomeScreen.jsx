import LobbyMenu from '../components/Lobby/LobbyMenu';

export default function HomeScreen({ onJoin, onCreate }) {
  return (
    <LobbyMenu onJoin={onJoin} onCreate={onCreate} />
  );
}
