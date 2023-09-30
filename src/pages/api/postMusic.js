import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';
import { postMusicDB, checkConnection } from './Middleware/db';

export const config = {
  api: {
    bodyParser: false,
  },
};

checkConnection();

export default async function uploadFile(req, res) {
  // await checkConnection();
  
  const form = new IncomingForm();

  form.parse(req, (err, fields, files) : (err: any, fields: any, files: any) => {
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

    const data = {
        albumId: fields.albumId[0],
        artistId: fields.artistId[0],
        music: {
            name : musicName,
            path: newPath,
            length: length,
            // image: fields.image,
        },
    };

    let result = postMusicDB(data);
    

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
      console.log(result);
      putDataToFile();

    }).catch((err) => {
        console.log(err);
        res.status(500).json({ message: 'Failed to create music', error: err });
    })
  });
}

