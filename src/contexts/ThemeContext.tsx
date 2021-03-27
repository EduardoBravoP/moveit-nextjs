import { createContext, useState } from "react";
import usePersistedState from "./usePersistedState";

interface ThemeContextData {
  isDark: boolean;
  toggleTheme: () => void;
}

export const ThemeContext = createContext({} as ThemeContextData)

export function ThemeProvider({ children }) {

  const [isDark, setIsDark] = usePersistedState('isDark', true);

  function toggleTheme() {
    setIsDark(!isDark);
  }
  
  return (
    <ThemeContext.Provider value={{
      isDark,
      toggleTheme
    }}>
      {children}
    </ThemeContext.Provider>
  )
}