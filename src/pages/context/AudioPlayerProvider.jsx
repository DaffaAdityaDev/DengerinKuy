// context/AudioPlayerContext.jsx

import React, { createContext, useState } from 'react';

export const AudioPlayerContext = createContext();

export const AudioPlayerProvider = ({ children }) => {
  const [song, setSong] = useState([{
    
  }]);
  const [currentSong, setCurrentSong] = useState(0);

  return (
    <AudioPlayerContext.Provider value={{ song, setSong, currentSong, setCurrentSong }}>
      {children}
    </AudioPlayerContext.Provider>
  );
};
