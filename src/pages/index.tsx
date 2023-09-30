import { useEffect, useState, useContext } from 'react';
import { Inter } from 'next/font/google'
import NoSsr from './components/NoSsr'
import axios from 'axios';
import fetchMusic from '../../utils';
import { AudioPlayerContext } from './context/AudioPlayerProvider';

import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import RadioMain from './components/Radio/Main'
import Player from './components/Player'
import { AudioPlayerContext } from './context/AudioPlayerProvider';
import { fetchMusic } from './utils';
import axios from 'axios';



const inter = Inter({ subsets: ['latin'] })

type Music = {
  name: any;
  album: any;
  length: any;
  title: string,
  artist: any,
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

  let handlePlay = (item: { title?: string; artist: any; blob?: Blob; name?: any; album?: any; length?: any; }) => () => {
    // console.log(item)
    
    fetchMusic(item.name).then((res: any) => {
      setSong((prev: any) => {
        return [...prev, {
          title: item.name,
          artist: item.artist.name,
        }]
      })
      setCurrentSong(song.length)
      setMusicBlob(res)
    })
  }

  let handleUploadMusic = async (file: any, albumId: any, artistId: any, albumName: any, artistName: any) => {
    let formData = new FormData()
    formData.append('music', file)
    formData.append('albumId', albumId)
    formData.append('artistId', artistId)
    formData.append('albumName', albumName)
    formData.append('artistName', artistName)

    const res = await axios.post('/api/uploadmusic', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    console.log(res)
  }

  console.log(song, currentSong, musicBlob)

  // console.log(song)
  return (
    // <NoSsr>
      <div className={`flex min-h-screen ${inter.className}`}>
        <aside className='bg-slate-950 text-white flex flex-col px-5 pt-3 items-center w-[calc(10%+3em)] fixed left-0 top-0 h-full'>
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
        <main className='bg-slate-700 flex flex-col items-start justify-start flex-1 p-4 ml-[calc(10%+3em)] pb-[calc(5%+3em)]'>
          <p className='text-2xl'>Main</p>
          <div className='grid lg:grid-cols-3 lg:grid-rows-2 gap-4 w-full sm:grid-cols-2 sm:grid-rows-2 md:grid-cols-2 md:grid-rows-3'>
            <RadioMain title='Radio' img='/col.jpg' />
            <RadioMain title='Radio' img='/col.jpg' />
            <RadioMain title='Radio' img='/ool.jpg' />
            <RadioMain title='Radio' img='/ool.jpg' />
            <RadioMain title='Radio' img='/ool.jpg' />
            <RadioMain title='Radio' img='/ool.jpg' />
          </div>
          <div>
            <p className='text-2xl'>uploadmusic</p>
            <form onSubmit={(e) => {handleUploadMusic(e.target.music.files[0], e.target.albumId.value, e.target.artistId.value, e.target.albumName.value, e.target.artistName.value)}} className='text-black'>
              <input type="file" name="music" />
              <input type="text" name="albumId" placeholder='albumId' />
              <input type="text" name="artistId" placeholder='artistId' />
              <input type="text" name="albumName" placeholder='albumName' />
              <input type="text" name="artistName" placeholder='artistName' />
              <button type="submit">Upload</button>

            </form>
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
                <MusicSelect
                  key={index}
                  title={item.name}
                  artist={item.artist.name}
                  album={item.album.name}
                  length={item.length}
                  handlePlay={handlePlay(item)}
                />
              )
            })
          }
        </main>
        <div className='bg-slate-900 fixed bottom-0 w-full h-[calc(5%+3em)]'>
          <Player />  
        </div>
      </div>
    // </NoSsr>
    
  )
}


