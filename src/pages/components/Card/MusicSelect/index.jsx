import React from 'react'

function MusicSelect({ title, img, artist, album, length, handlePlay }) {

    function convertDuration(duration) {
        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;
        return `${minutes}:${seconds}`;
    }

    console.log(length)
    return (
        <div>
            <div className="flex text-white items-center rounded-[10px] relative">
                <div className="absolute w-full h-full bg-white bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg left-0 top-0 z-10 rounded-l-[10px]"></div>
                <img src={img} alt="radio" className="object-cover w-[100px] h-[100px] rounded-l-[10px] z-20" />
                <div className="flex flex-wrap ml-2 z-20">
                <p className="w-full sm:w-auto">{title}</p>
                <p className="w-full sm:w-auto">{artist}</p>
                <p className="w-full sm:w-auto">{album}</p>
                <p className="w-full sm:w-auto">{convertDuration(length)}</p>
                </div>
                <button onClick={handlePlay} className="ml-auto mr-2 z-20">Play</button>
            </div>
        </div>
    )
}

export default MusicSelect