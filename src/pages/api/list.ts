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
  const db = await connectToDatabase(process.env.MONGODB_URI)

  const collection = db.collection('users')

  const cursor = collection.find()

  const users = await cursor.toArray()

  const top10 = users.sort(function (user1, user2) {
    return user2.CompletedChallenges - user1.CompletedChallenges
  }).slice(0, 10)

  return response.json(top10);
}