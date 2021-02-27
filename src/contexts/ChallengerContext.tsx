import { createContext, ReactNode, useEffect, useState } from 'react'
import challenges from '../../challenges.json'

interface ChallengesProviderProps {
    children: ReactNode
}

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number
}

interface ChallengesContextData {
    level: number;
    levelUp: () => void;
    currentExperience: number; 
    challengesCompleted: number;
    startNewChallenger: () => void;
    activeChallenge: Challenge;
    resetChallenger: () => void;
    experienceToNextLevel: number;
    completedChallenge: () => void;
}

export const ChallengesContext = createContext({} as ChallengesContextData)
export default function ChallengesProvider({ children }: ChallengesProviderProps) {
    const [level, setLevel] = useState(1)
    const [currentExperience, setCurrentExperience] = useState(0)
    const [challengesCompleted, setChallengesCompleted] = useState(0)
    const [activeChallenge, setActiveChallenge] = useState(null)
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    useEffect(() => {
        Notification.requestPermission()
    }, [])

    function levelUp() {
        setLevel(level + 1)
    }

    function startNewChallenger() {
        const randomChallengeIndex = Math.floor(Math.random()) * challenges.length
        const challenge = challenges[randomChallengeIndex]

        setActiveChallenge(challenge)

        new Audio('/notification.mp3').play()

        if(Notification.permission === 'granted') {
            new Notification('Novo Desafio', {
                body: `Valendo ${challenge.amount} xp`,
            })
        }
    }

    function resetChallenger() {
        setActiveChallenge(null)
    }

    function completedChallenge() {

        if (!activeChallenge) {
            return
        }

        const { amount } = activeChallenge 
        let experience = currentExperience + amount;
        if (experience >= experienceToNextLevel) {
            levelUp()
            experience = experience - experienceToNextLevel
        }
        setCurrentExperience(experience);
        resetChallenger()
        setChallengesCompleted(challengesCompleted + 1)
    }

    return (
        <ChallengesContext.Provider 
          value={{
            level,
            levelUp,
            currentExperience,
            challengesCompleted,
            startNewChallenger,
            activeChallenge,
            resetChallenger,
            experienceToNextLevel,
            completedChallenge
          }}>
            {children}
        </ChallengesContext.Provider>
    )
}

