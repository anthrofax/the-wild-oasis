import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext();

function DarkModeContextProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(window.matchMedia('(prefers-color-scheme: dark)').matches, "isDarkMode");

  useEffect(function() {
    if (isDarkMode) {
        document.documentElement.classList.replace('light-mode', 'dark-mode')
        // document.documentElement.classList.add('dark-mode')
        // document.documentElement.classList.remove('light-mode')
    } else {
        document.documentElement.classList.replace('dark-mode', 'light-mode')
        // document.documentElement.classList.add('light-mode')
        // document.documentElement.classList.remove('dark-mode')
    }
  }, [isDarkMode])

  function handleToggleDarkMode() {
    setIsDarkMode((isDarkMode) => !isDarkMode);
  }

  return (
    <DarkModeContext.Provider value={{ isDarkMode, handleToggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkModeContext);

  if (!context) throw new Error("Anda mengakses context di luar provider");

  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { DarkModeContextProvider, useDarkMode };
