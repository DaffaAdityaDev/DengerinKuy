import { IncomingForm } from 'formidable';
import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { postMusicDB, checkConnection } from './Middleware/db';
import { parseFile } from 'music-metadata';

export const config = {
  api: {
    bodyParser: false,
  },
};


export default async function uploadFile(req: NextApiRequest, res: NextApiResponse) {
  // await checkConnection();
  
  const form = new IncomingForm();
  
  form.parse(req, (err, fields, files) => {
    if (err) {
      res.status(500).json({ message: 'Something went wrong', error: err });
      return;
    }

    if(!files['file']) {
        res.status(405).json({ message: 'key Should be file' });
        return;
    }



    // console.log(files['file']);

    const oldPath = files['file'][0].filepath;
    const fileName = files['file'][0].originalFilename.endsWith('.mp3') ? files['file'][0].originalFilename : `${files['file'][0].originalFilename}.mp3`;
    const newPath = path.join(process.cwd(), 'src/pages/api/Resource/music', fileName);
    
    const musicName = fileName.split('.mp3')[0];
    const length = files['file'][0].size;

    let result = parseFile(oldPath)
    .then(async metadata => {
      const data = {
        albumId: fields?.albumId ? fields.albumId[0] : undefined,
        artistId: fields?.artistId ? fields.artistId[0] : undefined,
        albumName: fields?.albumName ? fields.albumName[0] : undefined,
        artistName: fields?.artistName ? fields.artistName[0] : undefined,
        music: {
            name : musicName,
            path: newPath,
            length: metadata.format.duration
            // image: fields.image,
        },
      }

      let postMusic = await postMusicDB(data);

      return Promise.resolve(postMusic);
    }).catch(err => {
      console.error(err.message);
      return Promise.reject(err);
    });
  
    const putDataToFile = () => fs.copyFile(oldPath, newPath, function (err) {
      if (err) {
        res.status(500).json({ message: 'File upload failed', error: err });
        return;
      }

      fs.unlink(oldPath, function(err) {
        if (err) {
          res.status(500).json({ message: 'Failed to delete old file', error: err });
          return;
        }

        res.status(200).json({ message: 'File uploaded successfully' });
      });
    });

    result.then((result) => {
      console.log("result", result);
      putDataToFile();

    }).catch((err) => {
        console.log("error", err);
        res.status(500).json({ message: 'Something went wrong', error: err });

    })
  });
}

