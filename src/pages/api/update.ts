import { VercelRequest, VercelResponse } from '@vercel/node'
import { Db, MongoClient } from "mongodb";

let cachedDb: Db = null;

async function connectToDatabase(uri: string) {
  if (cachedDb) {
    return cachedDb;
  }
  
  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  const db = client.db('moveit');

  cachedDb = db;

  return db;
}

export default async function (request: VercelRequest, response: VercelResponse) {
  const { completedChallenges, level, experience, name } = request.body

  const db = await connectToDatabase(process.env.MONGODB_URI)

  const collection = db.collection('users')

  console.log('chegou')

  const user = await collection.findOneAndUpdate({name}, [completedChallenges, level, experience])
  
  return response.status(201).json({user})
}