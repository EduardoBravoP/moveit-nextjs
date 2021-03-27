import Cookies from "js-cookie";
import { useEffect, useState } from "react";

function usePersistedState(key: string, initialState: any) {
  const [state, setState] = useState(() => {
    const cookieValue = Cookies.get('isDark')

    if (cookieValue) {
      if (cookieValue === "false") {
        return false
      }

      if(cookieValue === "true") {
        return true
      }
    } else {
      return initialState
    }
  });
  

  useEffect(() => {
    Cookies.set(key, state.toString())
  }, [key, state])

  return [state, setState]
}

export default usePersistedState