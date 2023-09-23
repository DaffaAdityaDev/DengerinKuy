import React, { useContext, useRef, useEffect } from 'react';
import { AudioPlayerContext } from '../../context/AudioPlayerProvider';

function Player() {

    const { song, setSong, currentSong, setCurrentSong } = useContext(AudioPlayerContext);
    const audioRef = useRef();

    useEffect(() => {
        audioRef.current.querySelector('source').src = song[currentSong].src
        audioRef.current.load()
        audioRef.current.play()
    }, [song, currentSong])
    

    function goPrev() {
        let prevSong
        
        if ((currentSong - 1) < 0) {
            prevSong = song.length - 1
        } else {
            prevSong = currentSong - 1
        }
        let prevSongSrc = song[prevSong].src
        
        audioRef.current.pause()
        audioRef.current.querySelector('source').src = prevSongSrc
        audioRef.current.load()
        audioRef.current.play()

        setCurrentSong(prevSong)
    }

    function goNext() {
        let nextSong
        
        if ((currentSong + 1) > song.length - 1) {
            nextSong = 0
        } else {
            nextSong = currentSong + 1
        }
        let nextSongSrc = song[nextSong].src
        
        audioRef.current.pause()
        audioRef.current.querySelector('source').src = nextSongSrc
        audioRef.current.load()
        audioRef.current.play()

        setCurrentSong(nextSong)
    }

  return (
    <div className='flex justify-center items-center'>
        <button onClick={goPrev}>prev</button>
        <audio controls ref={audioRef}>
            
            <source src={song[currentSong]?.src} type="audio/mpeg" />
            Your browser does not support the audio element.
        </audio>
        <button onClick={goNext}>next</button>
    </div>
  )
}

export default Player