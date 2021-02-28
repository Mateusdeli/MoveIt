import { createContext, ReactNode, useEffect, useState } from 'react'
import Cookie from 'js-cookie'
import challenges from '../../challenges.json'
import LevelUpModal from '../components/LevelUpModal'

interface ChallengesProviderProps {
    children: ReactNode,
    level: number,
    challengesCompleted: number,
    currentExperience: number
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
    closeModal: () => void;
}


export const ChallengesContext = createContext({} as ChallengesContextData)
export default function ChallengesProvider({ children, ...rest }: ChallengesProviderProps) {
    const [level, setLevel] = useState(rest.level ?? 0)
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0)
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0)
    const [activeChallenge, setActiveChallenge] = useState(null)
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)
    const [upLevel, setUpLevel] = useState(false)

    useEffect(() => {
        Notification.requestPermission()
    }, [])

    useEffect(() => {
        Cookie.set('level', String(level))
        Cookie.set('currentExperience', String(currentExperience))
        Cookie.set('challengesCompleted', String(challengesCompleted))
    }, [level, currentExperience, challengesCompleted])

    function levelUp() {
        setLevel(level + 1)
        setUpLevel(true)
    }

    function closeModal() {
        setUpLevel(false)
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
            completedChallenge,
            closeModal
          }}>
            {children}
          {upLevel && <LevelUpModal />}
        </ChallengesContext.Provider>
    )
}

