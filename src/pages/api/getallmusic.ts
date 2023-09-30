// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { checkConnection, getAllDataMusic } from './Middleware/db'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  await checkConnection();

  let data = await getAllDataMusic()
  
  res.status(200).json({
    
    data: data,
    message: "Success"
  
  })
}
