import axios from "axios";
import Head from "next/head";
import { useContext } from "react";
import { ChallengeBox } from "../components/ChallengeBox";
import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import Sidebar from "../components/Sidebar";
import { ChallengesProvider } from "../contexts/ChallengesContext";
import { CountdownProvider } from "../contexts/CountdownContext";
import { ThemeContext } from "../contexts/ThemeContext";
import styles from '../styles/pages/Home.module.css'
import Switch from "react-switch";

interface HomeProps {
  level: number;
  experience: number;
  CompletedChallenges: number;
}

export default function Dashboard (props: HomeProps) {
  const { isDark, toggleTheme } = useContext(ThemeContext)
  
  return (
    <ChallengesProvider level={props.level} currentExperience={props.experience} challengesCompleted={props.CompletedChallenges}>
      <div className={`${styles.container} ${isDark ? styles.dark : ''}`}> 
        <Head>
          <title>Inicio | move.it</title>
        </Head>
        
        <Sidebar homeActive />

        <ExperienceBar />

        <Switch 
          onChange={() => toggleTheme()} 
          checked={isDark}
          onColor="#464646"
          onHandleColor="#d5d5d5"
          offColor="#5965E0"
          checkedIcon={false}
          uncheckedIcon={false}
          className={styles.switch}
        />

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