// context/AudioPlayerContext.jsx

import React, { createContext, useEffect, useState } from 'react';

export const AudioPlayerContext = createContext();

export const AudioPlayerProvider = ({ children }) => {
  let storedState;
  if (typeof window !== "undefined") {
    storedState = localStorage.getItem('audioPlayerState');
  }
  const initialState = storedState ? JSON.parse(storedState) : {
    song: [{}],
    currentSong: 0,
  };

  const [song, setSong] = useState(initialState.song);
  const [currentSong, setCurrentSong] = useState(initialState.currentSong);
  const [musicBlob, setMusicBlob] = useState();

  useEffect(() => {
    localStorage.setItem('audioPlayerState', JSON.stringify({ song, currentSong, musicBlob }));
    console.log('song', song)
    console.log('blob', musicBlob)
  }, [song, currentSong]);

  return (
    <AudioPlayerContext.Provider value={{ song, setSong, currentSong, setCurrentSong , musicBlob, setMusicBlob}}>
      {children}
    </AudioPlayerContext.Provider>
  );
};
