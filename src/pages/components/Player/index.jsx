import React, { useState, useContext, useRef, useEffect } from 'react';
import { AudioPlayerContext } from '../../context/AudioPlayerProvider';
import { fetchMusic } from '../../../../utils';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faArrowRight, faArrowLeft, faPause } from "@fortawesome/free-solid-svg-icons";

function Player() {
    const [volume, setVolume] = useState(0.1)
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [endDuration, setEndDuration] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    

    const { song, setSong, currentSong, setCurrentSong, musicBlob, setMusicBlob } = useContext(AudioPlayerContext); 
    
    const audioRef = useRef();

    useEffect(() => {
        console.log('blob', musicBlob)
        if (song.length !== 0 && musicBlob === undefined) {
            fetchMusic(song[currentSong].title).then((res) => {
                setMusicBlob(res)
            })
        }
        
        if (musicBlob instanceof Blob) {
            const blobUrl = URL.createObjectURL(musicBlob);
            audioRef.current.querySelector('source').src = blobUrl
            audioRef.current.load()
            audioRef.current.play()
            setIsPlaying(true)
        }

        audioRef.current.addEventListener('timeupdate', () => {
            setCurrentTime(audioRef.current.currentTime)
        })

        audioRef.current.addEventListener('loadedmetadata', () => {
            setDuration(audioRef.current.duration)
        })

        audioRef.current.addEventListener('ended', () => {
            handleNext()
        })

        return () => {
            audioRef.current.removeEventListener('timeupdate', () => {
                setCurrentTime(audioRef.current.currentTime)
            })
            audioRef.current.removeEventListener('loadedmetadata', () => {
                setDuration(audioRef.current.duration)
            })
            audioRef.current.removeEventListener('ended', () => {
                handleNext()
            })
        }
    }, [song, currentSong, musicBlob])

    useEffect(() => {
        audioRef.current.volume = volume
    }, [volume]) 

    
    const handleSeekerChange = (e) => {
        const newCurrentTime = e.target.value;
        setCurrentTime(newCurrentTime);
        audioRef.current.currentTime = newCurrentTime;
    };
    
    function handleFormatTime(time) {
        // format 00:00
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
    }

    function handlePrev() {
        let prevSong
        
        if ((currentSong - 1) < 0) {
            prevSong = song.length - 1
        } else {
            prevSong = currentSong - 1
        }
        let prevSongSrc = song[prevSong].title
        
        fetchMusic(prevSongSrc).then((res) => {
            setMusicBlob(res)
            
        }).then(() => {
            audioRef.current.pause()
            audioRef.current.querySelector('source').src = prevSongSrc
            audioRef.current.load()
            audioRef.current.play()
            setCurrentSong(prevSong)
            setIsPlaying(true)
        })
    
       
    }

    function handleNext() {
        let nextSong
        
        if ((currentSong + 1) > song.length - 1) {
            nextSong = 0
        } else {
            nextSong = currentSong + 1
        }
        let nextSongSrc = song[nextSong].title
        
        fetchMusic(nextSongSrc).then((res) => {
            setMusicBlob(res)
        }).then(() => {
            audioRef.current.pause()
            audioRef.current.querySelector('source').src = nextSongSrc
            audioRef.current.load()
            audioRef.current.play()

            setCurrentSong(nextSong)
            setIsPlaying(true)
        })
    }

    function handlePlay() {

        if (isPlaying) {
            audioRef.current.pause()
        } else {
            audioRef.current.play()
        }
        setIsPlaying(!isPlaying)
    }  

  return (
    <div className='flex justify-between items-center h-full'>
        {/* <button onClick={goPrev}>prev</button> */}
        <div className='text-white'>
            {/* <img src={song[currentSong].cover} alt="" /> */}
            <h3>{song[currentSong]?.title}</h3>
            <p>{song[currentSong]?.artist}</p>
        </div>
       
        <div className="flex flex-col justify-center items-center h-full">
            <div> 
                <FontAwesomeIcon onClick={handlePrev} icon={faArrowLeft} className=" text-white font-bold py-2 px-4 rounded cursor-pointer">
                Prev
                </FontAwesomeIcon>
                {
                    isPlaying ?
                        (<FontAwesomeIcon onClick={handlePlay} icon={faPause} className="text-white font-bold py-2 px-4 rounded w-5 h-5 cursor-pointer">
                            play
                        </FontAwesomeIcon>) : (<FontAwesomeIcon onClick={handlePlay} icon={faPlay} className="text-white font-bold py-2 px-4 rounded w-5 h-5 cursor-pointer">
                            pause
                        </FontAwesomeIcon>)
                }
                
                <FontAwesomeIcon onClick={handleNext} icon={faArrowRight} className="text-white font-bold py-2 px-4 rounded cursor-pointer">
                    Next
                </FontAwesomeIcon>
            </div>
            <div className="relative flex justify-center items-center gap-3 pt-1 w-64 mx-2 ">
                    <p className="text-xs font-semibold inline-block text-gray-600">
                        {handleFormatTime(currentTime)}
                    </p>
                    <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-200 w-full">
                        <input 
                            type="range"
                            min="0"
                            max={duration}
                            step="1"
                            value={currentTime}
                            onChange={handleSeekerChange}

                            className="absolute left-0 w-full h-2 opacity-0 cursor-pointer z-10 "
                            
                        />
                        <div style={{ width: `${(currentTime/duration)*100}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"></div>
                    </div>
                    <p className="text-xs font-semibold inline-block text-gray-600">
                        {handleFormatTime(duration)}
                    </p>
                </div>
            
            
        </div>

        <div className="flex justify-center items-center relative">
            <div className='overflow-hidden h-2 text-xs flex rounded bg-blue-200 w-40'>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={e => setVolume(e.target.value)}
                    className="absolute left-0 w-full h-2 opacity-0 cursor-pointer z-10"
                />
                <div style={{ width: `${volume*100}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"></div>
            </div>
        </div>

        <audio ref={audioRef}>
            
            <source src={musicBlob} type="audio/mpeg" />
            Your browser does not support the audio element.
        </audio>
        {/* <button onClick={goNext}>next</button> */}
        
    </div>
  )
}

export default Player