// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { postMusicDB, checkConnection } from './Middleware/db';

// deleteAllTable()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const data = req.body;
    //   console.log(data);
      const result = await postMusicDB(data);
      res.status(200).json(result);
    // res.status(200).json({ message: 'File uploaded successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create music' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
