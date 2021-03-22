import axios from "axios"
import { useSession } from "next-auth/client"
import { useEffect, useState } from "react"
import Dashboard from "./Dashboard"
import SyncLoader from 'react-spinners/SyncLoader'

import {css} from '@emotion/core'

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
  const [props, setProps] = useState<HomeProps>(null)

  useEffect(() => {
    if (session) {
      axios.get('/api/findOne', {params: {name: session.user.name}}).then(response => {
        setProps(response.data)
      })
    }
  }, [])
  
  return (
    props ? <Dashboard {...props} /> : <SyncLoader color="#5965E0" loading={true} size={15} css={styles} />
  )
}