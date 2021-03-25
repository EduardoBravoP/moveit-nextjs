import axios from 'axios';
import Image from 'next/image'
import { useEffect, useState } from 'react';
import Sidebar from "../components/Sidebar";
import styles from '../styles/pages/leaderboard.module.css'
import SyncLoader from 'react-spinners/SyncLoader';

export default function Leaderboard() {
  const [top10, setTop10] = useState(null);
  
  useEffect(() => {
    axios.get('/api/list').then(response => {
      setTop10(response.data)
    })
  }, [])

  return (
    <>
      <div className={`${styles.container} ${styles.dark}`}>
        <Sidebar />
        <h1>Leaderboard</h1>

       {!top10 ? (
        <SyncLoader color="#5965E0" loading={true} size={15} />
       ) : (
        <table cellSpacing="0" className={styles.table}>
          <thead>
            <tr>
              <th>
                POSIÇÃO
              </th>
              <th className={styles.thUser}>
                USUÁRIO
              </th>
              <th>
                DESAFIOS
              </th>
              <th>
                EXPERIENCIA
              </th>
            </tr>
          </thead>
          <tbody>
            {top10.map((user, index) => (
              <tr key={user.name}>
                <td className={styles.position}>
                  {index + 1}
                </td>
                <td className={styles.user}>
                  <Image className={styles.image} src={user.image} width={64} height={64} />

                  <div className={styles.info}>
                    <strong>{user.name}</strong>
                    <div className={styles.level}>
                      <Image src="/icons/Up.svg" width={14} height={16} />
                      <p>Level {user.level}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <div className={styles.challenges}>
                    <span>{user.CompletedChallenges}</span>
                    <p>Completados</p>
                  </div>
                </td>
                <td>
                  <div className={styles.experience}>
                    <span>{user.experience}</span>
                    <p>xp</p>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
       )}
      </div>
    </>
  )
}