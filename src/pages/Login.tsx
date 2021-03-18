import Image from 'next/image'
import { signIn } from 'next-auth/client'

import styles from '../styles/pages/Login.module.css';


export default function Login() {
  
  const handleSignIn = async () => {
    await signIn('github')
  }

  return <>
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <Image src="/icons/favicon.svg" width={770} height={660} />
      </div>

      <div className={styles.rightSide}>
        <div>
          <Image src="/icons/Logo.png" width={360} height={75} />
        </div>

        <div className={styles.loginContainer}>
          <h3>Bem-vindo</h3>
          
          <div className={styles.githubLogin}>
            <Image src="/icons/github.svg" width={40} height={40} />
            <p>Faça login com seu Github para começar</p>
          </div>

          <button type="button" onClick={handleSignIn}>
            <div className={styles.fade}>
              <p>Fazer login</p>
            </div>

            <div className={styles.solid}>
              <Image src="/icons/arrow-right.svg" width={24} height={24} />
            </div>
          </button>
        </div>
      </div>
    </div>
  </>
}