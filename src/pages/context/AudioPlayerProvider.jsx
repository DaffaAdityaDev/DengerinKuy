// context/AudioPlayerContext.jsx

import React, { createContext, useEffect, useState } from 'react';

export const AudioPlayerContext = createContext();

export const AudioPlayerProvider = ({ children }) => {
  // let storedState;
  // if (typeof window !== "undefined") {
  //   storedState = localStorage.getItem('audioPlayerState');
  // }
  // const initialState = storedState ? JSON.parse(storedState) : {
  //   song: [],
  //   currentSong: 0,
  // };

  const [song, setSong] = useState([]);
  const [currentSong, setCurrentSong] = useState(0);
  const [musicBlob, setMusicBlob] = useState();
  
  // const updateLocalStorage = () => {
  //   localStorage.setItem('audioPlayerState', JSON.stringify({ song, currentSong, musicBlob }));
  //   console.log('song', song)
  //   console.log('blob', musicBlob)
  // };

  // useEffect(() => {
  
  //   const interval = setInterval(updateLocalStorage, 1000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [song, currentSong]);

  return (
    <AudioPlayerContext.Provider value={{ song, setSong, currentSong, setCurrentSong , musicBlob, setMusicBlob}}>
      {children}
    </AudioPlayerContext.Provider>
  );
};
