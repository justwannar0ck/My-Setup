import '../App.css'
import { useState } from 'react';
import BackButton from '../assets/backButton.png'
import PlayButton from '../assets/playButton.png'
import PreviousButton from '../assets/previousButton.png'
import NextButton from '../assets/nextButton.png'
import PauseButton from '../assets/pauseButton.png'

export default function Player({ onClose }) {
  const [image, setImage] = useState(PlayButton);

  function handlePlayPause() {
    if (image === PlayButton) {
      setImage(PauseButton);
    } else {
      setImage(PlayButton);
    }
  }

  return (
    <div className="playerContainer">
      <div className="cassete">
        <img 
          id="back" 
          src={BackButton} 
          alt="Quit player" 
          onClick={onClose} 
        />
        <img id="previous" src={PreviousButton} alt="Previous song" />
        <img id="next" src={NextButton} alt="Next song" />
        <img 
          id="play" 
          src={image} 
          onClick={handlePlayPause} 
          alt="Control button" 
        />
      </div>
    </div>
  )
}