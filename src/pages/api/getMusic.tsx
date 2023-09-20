// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { checkConnection, getAllDataMusic } from './Middleware/db'
import { createReadStream } from 'fs';
import { join } from 'path';

// deleteAllTable()
// checkConnection()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const params = req.query.musicName
    console.log(params)
    const filePath = join(process.cwd(), `src/pages/api/Resource/${params}.mp3`)
    const stream = createReadStream(filePath)

    res.setHeader('Content-Type', 'audio/mpeg')
    stream.pipe(res)
}
