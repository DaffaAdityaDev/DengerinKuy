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
    // console.log(params)
    try {
        const params = req.query.musicName
        const filePath = join(process.cwd(), `src/pages/api/Resource/${params}.mp3`)
    
        const stream = createReadStream(filePath)

        stream.on('error', function(err) {
            console.error(err);
            res.status(400).json({
                Response: {
                    message: "Not Found"
                }
            })
        });
        

        res.setHeader('Content-Type', 'audio/mpeg')
        stream.pipe(res)
    } catch (error) {
        res.status(404).json({
            Response: {
                message: "Not Found"
            }
        })
    }
    
}
