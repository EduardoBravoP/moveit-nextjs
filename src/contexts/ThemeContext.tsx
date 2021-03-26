import { createContext, useState } from "react";

interface ThemeContextData {
  isDark: boolean;
  toggleTheme: () => void;
}

export const ThemeContext = createContext({} as ThemeContextData)

export function ThemeProvider({ children }) {

  const [isDark, setIsDark] = useState(false);

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