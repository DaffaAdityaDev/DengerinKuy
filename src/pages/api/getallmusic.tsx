// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { checkConnection, getAllDataMusic } from './Middleware/db'

// deleteAllTable()
checkConnection()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let data = await getAllDataMusic()
  res.status(200).json({
    Response: {
      data: data,
      message: "Success"
    }
  })
}
