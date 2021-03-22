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
  const { name } = request.query

  const db = await connectToDatabase(process.env.MONGODB_URI)

  const collection = db.collection('users')

  const user = await collection.findOne({name})

  return response.json(user);
}