import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { ChallengesContext } from './ChallengerContext'

interface CountdownContextData {
    hasFinished: Boolean;
    minutes: Number;
    seconds: Number;
    isActive: Boolean;
    handleStartCountdown: () => void;
    handleResetCountdown: () => void;
}

interface CountdownProviderProps {
    children: ReactNode
}

export const CountdownContext = createContext({} as CountdownContextData)
export default function CountdownContextProvider({ children }: CountdownProviderProps) {

    const { startNewChallenger } = useContext(ChallengesContext)

    const timeInitial = 5 * 1
    const [time, setTime] = useState(timeInitial)
    const [isActive, setIsActive] = useState(false)
    const [hasFinished, setHasFinished] = useState(false)
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    let countDownTimeout: NodeJS.Timeout;

    useEffect(() => {
        if (isActive && time > 0) {
            countDownTimeout = setTimeout(() => {
                setTime(time - 1)
            }, 1000)
        } else if (isActive && time <= 0) {
            setHasFinished(true)
            setIsActive(false)
            startNewChallenger()
        }
    }, [isActive, time])

    const handleStartCountdown = () => {
        setIsActive(true)
    }

    const handleResetCountdown = () => {
        setHasFinished(false)
        setIsActive(false)
        setTime(timeInitial)
        clearTimeout(countDownTimeout)
    }

    return (
        <CountdownContext.Provider 
          value={{
            hasFinished,
            minutes,
            seconds,
            isActive,
            handleStartCountdown,
            handleResetCountdown
          }}>
            { children }
        </CountdownContext.Provider>
    )
}