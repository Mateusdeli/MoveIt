import CompletedChallenges from '../components/CompletedChallenges'
import Countdown from '../components/Countdown'
import ExperienceBar from '../components/ExpirienceBar'
import ChallengerBox from '../components/ChallengerBox'
import Perfil from '../components/Perfil'
import styles from '../styles/pages/Home.module.css'
import Head from 'next/head'
import CountdownContextProvider from '../contexts/CountdownContext'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Início | move.it</title>
      </Head>
      <ExperienceBar />
      <CountdownContextProvider>
        <section>
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
    </div>
  )
}
