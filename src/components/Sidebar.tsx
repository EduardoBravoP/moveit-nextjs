import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/components/Sidebar.module.css';
import { FiHome, FiAward, FiPower } from 'react-icons/fi';
import { signOut } from 'next-auth/client';

interface Props {
  homeActive?: boolean
}

export default function Sidebar({homeActive = false}: Props) {
  return (
    <div className={styles.container}>
      <Image src="/icons/small-logo.svg" width={45} height={45} />

      <div className={styles.sidebarCenter}>
        <button>
          <Link href="/">
            <FiHome color={homeActive ? '#5965E0' : '#8f8f8f'} size={32} />
          </Link>
        </button>
        <button>
          <Link href="/leaderboard">
            <FiAward color={homeActive ? '#8f8f8f' : '#5965E0'} size={32} />
          </Link>
        </button>
      </div>

      <button type="button" onClick={() => signOut({redirect: true, callbackUrl: '/'})}>
        <FiPower color="#8f8f8f" size={32} />
      </button>
    </div>
  )
}