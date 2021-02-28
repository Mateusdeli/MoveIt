import CompletedChallenges from '../components/CompletedChallenges'
import Countdown from '../components/Countdown'
import ExperienceBar from '../components/ExpirienceBar'
import ChallengerBox from '../components/ChallengerBox'
import Perfil from '../components/Perfil'
import styles from '../styles/pages/Home.module.css'
import Head from 'next/head'
import CountdownContextProvider from '../contexts/CountdownContext'
import { GetServerSideProps } from 'next'
import ChallengesProvider from '../contexts/ChallengerContext'

interface HomeProps {
  level: number,
  currentExperience: number,
  challengesCompleted: number
}

export default function Home({level, currentExperience, challengesCompleted}: HomeProps) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Início | move.it</title>
      </Head>
      <ChallengesProvider 
        level={level} 
        currentExperience={currentExperience}
        challengesCompleted={challengesCompleted}
      >
        <ExperienceBar />
        <CountdownContextProvider>
          <section className={styles.box__container}>
            <div>
              <Perfil />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengerBox />
            </div>
          </section>
        </CountdownContextProvider>
      </ChallengesProvider>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (cxt) => {
  const { level, currentExperience, challengesCompleted } = cxt.req.cookies
  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted)
    }
  }
}
