import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();

  const handleStart = () => {
    if (nickname.trim()) {
      localStorage.setItem("nickname", nickname);
      navigate("/"); // du kannst hier direkt zu "create-lobby" oder "join-lobby" weiterleiten
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20vh" }}>
      <h1>Catch Me If You Can</h1>
      <input
        type="text"
        placeholder="Dein Nickname"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      <button onClick={handleStart}>Los geht's</button>
    </div>
  );
}

export default Home;
