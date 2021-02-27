import { useState, useEffect, useContext } from 'react'
import styles from '../styles/components/Countdown.module.css'
import { CountdownContext } from '../contexts/CountdownContext'

export default function Countdown() {
    
    const { 
        isActive,
        handleStartCountdown,
        handleResetCountdown,
        hasFinished,
        minutes,
        seconds
    } = useContext(CountdownContext)

    const [minutesLeft, minutesRight] = String(minutes).padStart(2, '0').split('');
    const [secondsLeft, secondsRight] = String(seconds).padStart(2, '0').split('');

    return(
        <>
          <div className={styles.countdownContainer}>
              <div>
                  <span>{minutesLeft}</span>
                  <span>{minutesRight}</span>
              </div>
              <span>:</span>
              <div>
                  <span>{secondsLeft}</span>
                  <span>{secondsRight}</span>
              </div>
          </div>

          {hasFinished ? (
            <button 
                disabled
                type="button" 
                className={styles.countdownButton}
                >
                 Ciclo encerrado
            </button>
        ) : isActive ? (
            <button 
              type="button" 
              className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
              onClick={handleResetCountdown}
              >
                  Abandonar ciclo
            </button>
            ) : (
            <button 
                type="button" 
                className={`${styles.countdownButton}`}
                onClick={handleStartCountdown}
                >
                Iniciar um ciclo
            </button>
            )}
        </>
    )
}