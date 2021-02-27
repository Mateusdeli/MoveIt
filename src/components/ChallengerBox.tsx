import styles from '../styles/components/ChallengerBox.module.css'
import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengerContext'
import { CountdownContext } from '../contexts/CountdownContext'

export default function ChallengerBox() {
    const { activeChallenge, resetChallenger, completedChallenge } = useContext(ChallengesContext)
    const { handleResetCountdown } = useContext(CountdownContext)

    function handleChallengerSucceeded() {
      completedChallenge()
      handleResetCountdown()
    }

    function handleChallengerFailed() {
      resetChallenger()
      handleResetCountdown()
    }

    return (
        <div className={styles.challengerBoxContainer}>
            {!activeChallenge ? (<div className={styles.challengerNotActive}>
                <strong>Finalize um ciclo para receber o desafio</strong>
                <p>
                    <img src="icons/level-up.svg" alt="Level Up" />
                    Avance de level completando os desafios.
                </p>
            </div>) : (
              <div className={styles.challengerActive}>
                  <header>Ganhe {activeChallenge.amount} xp</header>
                  <main>
                      {activeChallenge.type === 'body' ? <img src="icons/body.svg" alt="body" /> : <img src="icons/eye.svg" alt="eye" />}
                      <strong>Novo desafio</strong>
                      <p>{activeChallenge.description}</p>
                  </main>
                  <footer>
                      <button 
                        type="button"
                        onClick={handleChallengerFailed}
                        className={styles.challengerFailedButton}
                      >
                    Falhei
                    </button>
                      <button 
                        type="button"
                        onClick={handleChallengerSucceeded}
                        className={styles.challengerSucceededButton}
                      >
                    Completei
                    </button>
                  </footer>
              </div>
            )}
        </div>
    )
}