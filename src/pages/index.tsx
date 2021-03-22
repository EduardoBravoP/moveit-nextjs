import { useSession } from "next-auth/client";
import Login from "./Login";

import Home from "./home";

export default function Index() {
  const [session] = useSession()

  return (
    <>
      {!session ? <Login /> : <Home />}
    </>
  )
}