import axios from 'axios'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import Image from 'next/image'
import SyncLoader from 'react-spinners/SyncLoader';
import {css} from '@emotion/core'
import style from '../../styles/pages/Share.module.css'
import { Db, MongoClient } from 'mongodb';

interface UserProps {
  user: User
}

interface User {
  level: number;
  CompletedChallenges: number;
  experience: number;
}

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

const styles = css`
  position: absolute;
  top: 50%;
  left: 50%;
`

export default function User({user}: UserProps) {
  const { isFallback } = useRouter()

  if(isFallback) {
    return <SyncLoader color="#5965E0" loading={true} size={15} css={styles} />
  }
  
  return (
    <div className={style.container}>
      <div className={style.leftContainer}>
        <div className={style.levelBackground}>
         <h1 className={style.level}>{user.level}</h1>
        </div>
        <p className={style.bigText}>Avancei para o próximo level</p>
      </div>

      <div className={style.rightContainer}>
        <div className={style.challenges}>
          <h2>DESAFIOS</h2>
          <p className={style.description}><span>{user.CompletedChallenges}</span> completados</p>
        </div>

        <div className={style.experience}>
          <h2>EXPERIENCIA</h2>
          <p className={style.description}><span>{user.experience}</span> xp</p>
        </div>

        <Image src="/icons/Logo-purple.png" width={250} height={50} />
      </div>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const db = await connectToDatabase(process.env.MONGODB_URI)

  const collection = db.collection('users')

  const cursor = collection.find()

  const users = await cursor.toArray()

  const paths = users.map(user => {
    return { params: { name: user.name }}
  })
  
  return {
    paths,
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { name } = context.params
  
  const db = await connectToDatabase(process.env.MONGODB_URI)

  const collection = db.collection('users')

  const user = await collection.findOne({name})

  delete user._id
  delete user.subscribedAt

  return {
    props: {
      user
    },
    revalidate: 1500
  }
}
