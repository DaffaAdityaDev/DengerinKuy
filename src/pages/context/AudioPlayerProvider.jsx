// context/AudioPlayerContext.jsx

import React, { createContext, useState } from 'react';

export const AudioPlayerContext = createContext();

export const AudioPlayerProvider = ({ children }) => {
  const [song, setSong] = useState([{
    
  }]);
  const [currentSong, setCurrentSong] = useState(0);
  const [arrayBlob, setArrayBlob] = useState();

  return (
    <AudioPlayerContext.Provider value={{ song, setSong, currentSong, setCurrentSong , arrayBlob, setArrayBlob}}>
      {children}
    </AudioPlayerContext.Provider>
  );
};
