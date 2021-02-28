import React, { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengerContext'
import styles from '../styles/components/LevelUpModal.module.css'


export default function LevelUpModal() {

    const { level, closeModal } = useContext(ChallengesContext)

    return (
        <div className={styles.overlay}>
          <div className={styles.container}>
            <header>{level}</header>
            <strong>Parabéns</strong>
            <p>Você alcançou um novo level.</p>
            <button type="button" onClick={closeModal}>
                <img src="/icons/close.svg" alt="level up icon" />
            </button>
          </div>
        </div>
    )
}