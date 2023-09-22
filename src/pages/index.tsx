import { Inter } from 'next/font/google'
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from 'react';
import RadioMain from './components/Radio/Main'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [data, setData] : [number[], Function] = useState([]) 

  useEffect(() => {
    const data = []
    for (let i = 0; i < 1000; i++) {
      data.push(i)
    }

    setData(data)
  
  }, [])

  
  return (
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
          <RadioMain title='Radio'/>
          <RadioMain title='Radio'/>
          <RadioMain title='Radio'/>
          <RadioMain title='Radio'/>
          <RadioMain title='Radio'/>
          <RadioMain title='Radio'/>
        </div>
        {
          data.map((item, index) => {
            return (
              <p key={index}>{item}</p>
            )
          })
        }
        
        
        
      </main>
      <div className='bg-green-300 fixed bottom-0 w-full h-[calc(5%+3em)]'>
        <p>footer</p>
      </div>
    </div>
  )
}


