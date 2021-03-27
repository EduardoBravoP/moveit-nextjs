import { useSession } from 'next-auth/client';
import { useContext, useEffect } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css';

export function Profile() {
  const { level } = useContext(ChallengesContext);
  const [session] = useSession()

  return (
    <div className={styles.profileContainer}>
      <img src={session ? session.user.image : ''} alt={session ? session.user.name : ''} />
      <div>
        <strong>{session ? session.user.name : ''}</strong>
        <p>
          <img src="icons/level.svg" alt="Level"/>
          Level {level}
        </p>
      </div>
    </div>
  )
}