import axios from 'axios';

export const fetchMusic = async ( music : String ) => {
    let url = "http://localhost:3000/api/getMusic";

    // console.log('fetchMusic', url, music);
    try {
      const res = await axios.get(url, {
        responseType: 'arraybuffer',
        params: {
          musicName: music,
        },
        headers: {
          'Content-Type': 'audio/mpeg',
        },
      })
      const blob = new Blob([res.data], { type: 'audio/mpeg' });

      return blob;

      // audio.play();
      

  } catch (error) {
    console.error(error);
  }
};
  