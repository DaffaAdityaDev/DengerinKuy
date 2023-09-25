import { useEffect, useState, useContext } from 'react';
import { Inter } from 'next/font/google'
import NoSsr from './components/NoSsr'

import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import RadioMain from './components/Radio/Main'
import Player from './components/Player'
import { AudioPlayerContext } from './context/AudioPlayerProvider';
import { fetchMusic } from './utils';
import axios from 'axios';



const inter = Inter({ subsets: ['latin'] })

type Music = {
  title: string,
  artist: string,
  blob: Blob
}

export default function Home() {
  const { song, setSong, currentSong, setCurrentSong, musicBlob, setMusicBlob } = useContext(AudioPlayerContext);
  const [listMusic, setListMusic] = useState<Music[]>([]);
  
  // const [music, setMusic] = useState(null);
  
  //   useEffect(() => {
  //     fetchMusic("SPECIALZ").then((res) => {
  //       setArrayBlob(res)
  //     })
    
  // }, [])

  useEffect(() => {
    getMusicFromApi()
  }, [])

  let getMusicFromApi = async () => {
    const res = await axios.get('/api/getallmusic')
    setListMusic(res.data.data)
  }

  let handlePlay = (item) => () => {
    // console.log(item)
    
    fetchMusic(item.name).then((res) => {
      setSong(prev => {
        return [...prev, {
          title: item.name,
          artist: item.artist.name,
        }]
      })
      setCurrentSong(song.length)
      setMusicBlob(res)
    })
  }

  console.log(song, currentSong, musicBlob)

  // console.log(song)
  return (
    // <NoSsr>
      <div className={`flex min-h-screen ${inter.className}`}>
        <aside className='bg-red-300 flex flex-col items-center w-[calc(10%+3em)] fixed left-0 top-0 h-full'>
          <div className='flex'>
            <FontAwesomeIcon icon={faCoffee} />
            <p>Home</p>
          </div>
          <div className='flex'>
            <FontAwesomeIcon icon={faCoffee} />
            <p>Home</p>
          </div>
          <div className='flex'>
            <FontAwesomeIcon icon={faCoffee} />
            <p>Home</p>
          </div>
        </aside>
        <main className='bg-blue-300 flex flex-col items-start justify-start flex-1 p-4 ml-[calc(10%+3em)] pb-[calc(5%+3em)]'>
          <p className='text-2xl'>Main</p>
          <div className='grid lg:grid-cols-3 lg:grid-rows-2 gap-4 w-full sm:grid-cols-2 sm:grid-rows-2 md:grid-cols-2 md:grid-rows-3'>
            <RadioMain title='Radio' img='/cool.jpg' />
            <RadioMain title='Radio' img='/cool.jpg' />
            <RadioMain title='Radio' img='/cool.jpg' />
            <RadioMain title='Radio' img='/cool.jpg' />
            <RadioMain title='Radio' img='/cool.jpg' />
            <RadioMain title='Radio' img='/cool.jpg' />
          </div>
          <h1>main</h1>
          <button onClick={() => setSong([{
            title: "SPECIALZ",
            artist: "JACKBOYS",
            
          }, {
            title: "I REALLY WANT TO STAY AT YOUR HOUSE",
            artist: "JACKBOYS",
            
          }])}>set</button>

          {
            listMusic.map((item, index) => {
              return (
                <div key={index}>
                  <p>{item.name}</p>
                  <button onClick={handlePlay(item)}>play</button>
                </div>
              )
            })
          }
        </main>
        <div className='bg-green-300 fixed bottom-0 w-full h-[calc(5%+3em)]'>
          <Player songProps={song} />  
        </div>
      </div>
    // </NoSsr>
    
  )
}


