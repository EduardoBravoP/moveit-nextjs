import { GetServerSideProps } from "next";
import { useSession } from "next-auth/client";
import Dashboard from "./Dashboard";
import Login from "./Login";

interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function Home(props: HomeProps) {
  const [session] = useSession()

  return (
    <>
      {!session ? <Login /> : <Dashboard {...props} />}
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const { level, currentExperience, challengesCompleted } = ctx.req.cookies
  
  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted)
    }
  }
}