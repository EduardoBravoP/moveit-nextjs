import { useCallback, useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/LevelUpModal.module.css'
import { FiTwitter } from 'react-icons/fi'
import { useSession } from 'next-auth/client';

export function LevelUpModal() {
  const { level, closeLevelUpModal } = useContext(ChallengesContext);
  const [session] = useSession()
  
  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <header>{level}</header>

        <strong>Parabéns</strong>
        <p>Voce alcançou um novo level.</p>
        <button type="button" onClick={closeLevelUpModal}>
          <img src="/icons/close.svg" alt="Fechar modal"/>
        </button>
      </div>

      <a className={styles.share} href={`https://twitter.com/share?url=http://${process.env.NEXTAUTH_URL}/share/${session.user.name}&text=Avancei para o próximo level.`} target="_blank" rel="noreferrer noopener">
          <p>Compartilhar no Twitter</p>
          <FiTwitter size={22} color="#2AA9E0" fill="#2AA9E0" />
      </a>
    </div>
  )
}