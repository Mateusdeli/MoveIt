import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengerContext'
import styles from '../styles/components/CompletedChallenges.module.css'

export default function CompletedChallenges() {
    const { challengesCompleted } = useContext(ChallengesContext)
    return(
        <div className={styles.completedChallengerContainer}>
            <span>Desafios completos</span>
            <span>{challengesCompleted}</span>
        </div>
    )
}