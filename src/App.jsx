import './App.css'
import icon1 from './assets/casseteIcon.png'
import Player from './components/player.jsx'
import Clock from './components/Clock.jsx'
import { useState } from 'react';

export default function App() {
  const [showPlayer, setShowPlayer] = useState(false);

  function handlePlayer() {
    setShowPlayer(true);
  }

  function handleClosePlayer() {
    setShowPlayer(false);
  }

  return (
    <div className="main">
      <div className={`background${showPlayer ? ' blur' : ''}`}>
        
          <img 
            className="icon1" 
            src={icon1} 
            alt="player icon"
            onClick={handlePlayer}
          />
        
        <Clock />
        
      </div>

      {showPlayer && (
        <div className="playerOverlay">
          <Player onClose={handleClosePlayer} />
        </div>
      )}

    </div>
  )
}