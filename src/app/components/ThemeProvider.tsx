"use client";

import { useEffect, useState } from "react";
import DarkModeToggle from "./DarkModeToggle";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      if (newMode) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return newMode;
    });
  };

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-500">
      <header className="p-4 flex justify-end">
        <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </header>
      <main>{children}</main>
    </div>
  );
}
