import { useContext } from 'react';
import Image from 'next/image';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css';
import { FaPlay } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'

let countdownTimeout: NodeJS.Timeout;

export function Countdown() {
  const { minutes, seconds, hasFinished, isActive, startCountdown, resetCountdown } = useContext(CountdownContext)
  
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      { hasFinished ? (
        <button 
          disabled
          className={styles.countdownButton} 
        >
          <p>Ciclo encerrado</p>
          <Image width={22} height={22} src="/icons/Correct.svg" />
        </button>
      ) : (
        <>
          { isActive ? (
            <button type="button" className={`${styles.countdownButton} ${styles.countdownButtonActive}`} onClick={resetCountdown}>
              <p>Abandonar ciclo</p>
              <FiX size={24} color="#000" />
            </button>
          ) : (
            <button type="button" className={styles.countdownButton} onClick={startCountdown}>
              <p>Iniciar um ciclo</p>
              <FaPlay size={17} color="#fff" />
            </button>
          )}
        </>
      ) }
    </div>
  )
}