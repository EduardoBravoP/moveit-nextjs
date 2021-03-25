import axios from "axios";
import Head from "next/head";
import { ChallengeBox } from "../components/ChallengeBox";
import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import Sidebar from "../components/Sidebar";
import { ChallengesProvider } from "../contexts/ChallengesContext";
import { CountdownProvider } from "../contexts/CountdownContext";
import styles from '../styles/pages/Home.module.css'

interface HomeProps {
  level: number;
  experience: number;
  CompletedChallenges: number;
}

export default function Dashboard (props: HomeProps) {
  return (
    <ChallengesProvider level={props.level} currentExperience={props.experience} challengesCompleted={props.CompletedChallenges}>
      <div className={`${styles.container} ${styles.dark}`}>
        <Head>
          <title>Inicio | move.it</title>
        </Head>
        
        <Sidebar homeActive />

        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  )
}