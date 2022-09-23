import { useEffect, useState } from "react";
import { Theme } from "../types/theme";

export default function ThemeToggler() {
  const [theme, setTheme] = useState<Theme>("");

  useEffect(() => {
    const theme = window.localStorage.theme ?? "light";
    setTheme(theme);
  }, []);

  function toggleTheme() {
    if (window) {
      const theme = window.localStorage.theme;
      const newTheme = theme === "dark" ? "light" : "dark";
      window.localStorage.theme = newTheme;
      if (localStorage.theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      setTheme(newTheme);
    }
  }

  return (
    <div className="text-sm sm:text-base font-semibold self-end text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
      <button onClick={toggleTheme}>
        {theme !== "" ? (theme === "light" ? "Dark" : "Light") : ""}
      </button>
    </div>
  );
}
