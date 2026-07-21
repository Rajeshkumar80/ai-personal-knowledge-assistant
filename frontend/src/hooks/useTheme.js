import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return { 
    ...ctx, 
    setTheme: (theme) => {
      const root = document.documentElement;
      localStorage.setItem("theme", theme);
      if (theme === "light") {
        root.classList.add("light");
        root.classList.remove("dark");
      } else {
        root.classList.add("dark");
        root.classList.remove("light");
      }
    }
  };
}

export default useTheme;
