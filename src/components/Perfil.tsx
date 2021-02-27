import { useContext } from 'react'
import styles from '../styles/components/Perfil.module.css'
import { ChallengesContext } from '../contexts/ChallengerContext'

export default function Perfil() {
    const { level } = useContext(ChallengesContext)
    return (
        <div className={styles.perfilContainer}>
            <img src="https://github.com/Mateusdeli.png" alt="mateus git hub" />
            <div>
                <strong>Mateus Deliberali</strong>
                <p>
                    <img src="icons/level.svg" alt="" />
                    Level {level}
                </p>
            </div>
        </div>
    )
}