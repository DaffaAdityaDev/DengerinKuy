// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { checkConnection, getAllDataMusic } from './Middleware/db'

export default async function handler(
  req,
  res
) {

  await checkConnection();

  let data = await getAllDataMusic()
  
  res.status(200).json({
    
    data: data,
    message: "Success"
  
  })
}
