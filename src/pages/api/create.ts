import { VercelRequest, VercelResponse } from '@vercel/node'
import { Db, MongoClient } from "mongodb";

let cachedDb: Db = null;

async function connectToDatabase(uri: string) {
  if (cachedDb) {
    console.log('cache')
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
  const { name } = request.body

  const db = await connectToDatabase(process.env.MONGODB_URI)

  const collection = db.collection('users')

  const user = await collection.findOne({name})

  if (user) {
    return response.status(201).json({user})
  }

  await collection.insertOne({
    name,
    level: 1,
    CompletedChallenges: 0,
    experience: 0,
    subscribedAt: new Date()
  })
  
  return response.status(201).json({message: 'Created!'})
}