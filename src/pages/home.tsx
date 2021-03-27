import axios from "axios"
import { useSession } from "next-auth/client"
import { useContext, useEffect, useState } from "react"
import Dashboard from "./Dashboard"
import SyncLoader from 'react-spinners/SyncLoader'
import style from '../styles/pages/Dashboard.module.css'

import {css} from '@emotion/core'
import { ThemeContext } from "../contexts/ThemeContext"

interface HomeProps {
  level: number;
  experience: number;
  CompletedChallenges: number;
}

const styles = css`
  position: absolute;
  top: 50%;
  left: 50%;
`

export default function Home() {
  const [session] = useSession()
  const {isDark} = useContext(ThemeContext)
  const [props, setProps] = useState<HomeProps>(null)

  useEffect(() => {
    if (session) {
      axios.get('/api/findOne', {params: {name: session.user.name}}).then(response => {
        setProps(response.data)
      })
    }
  }, [])
  
  return (
    props ? <Dashboard {...props} /> : (
      <div className={isDark ? style.loadingContainer : ''}>
        <SyncLoader color="#5965E0" loading={true} size={15} css={styles} />
      </div>
    )
  )
}

