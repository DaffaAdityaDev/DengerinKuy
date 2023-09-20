import { IncomingForm } from 'formidable';
import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function uploadFile(req: NextApiRequest, res: NextApiResponse) {
  const form = new IncomingForm();

  form.parse(req, (err, fields, files) => {
    if (err) {
      res.status(500).json({ message: 'Something went wrong', error: err });
      return;
    }

    console.log(files['file']);

    const oldPath = files['file'][0].filepath;
    const fileName = files['file'][0].newFilename.endsWith('.mp3') ? files['file'][0].newFilename : `${files['file'][0].newFilename}.mp3`;
    const newPath = path.join(process.cwd(), 'src/pages/api/Resource', fileName);

    fs.copyFile(oldPath, newPath, function (err) {
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
  });
}
