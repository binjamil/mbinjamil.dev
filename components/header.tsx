import { useEffect, useState } from "react";
import { Theme } from "../types/theme";

export default function Header() {
  const [theme, setTheme] = useState<Theme>("");

  useEffect(() => {
    const theme = window.localStorage.theme;
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
    <header className="m-4 sm:m-8">
      <div className="flex flex-row justify-between">
        <h1 className="text-xl sm:text-3xl font-medium">Muhammad Bin Jamil</h1>
        <button
          className="text-sm sm:text-base font-semibold self-end text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          onClick={toggleTheme}
        >
          {theme !== "" ? (theme === "light" ? "Dark" : "Light") : ""}
        </button>
      </div>
      {/* <nav className="flex flex-row justify-between">
        <ul className="flex gap-4">
          <li>Blog</li>
          <li>About</li>
        </ul>
        <ul className="flex gap-4">
          <li>GitHub</li>
          <li>Twitter</li>
        </ul>
      </nav> */}
    </header>
  );
}
