// "use client";

// import { useState, useEffect } from "react";

// export default function DarkModeToggle() {
//     const [dark, setDark] = useState(false);

//     useEffect(() => {
//         if(localStorage.getItem("theme") === "dark") {
//             setDark(true);
//             document.documentElement.classList.add("dark");
//         }
//     }, []);

//     const toggleDarkMode = () => {
//         console.log("Dark mode toggled");
//         setDark(!dark);
//         if(!dark) {
//             document.documentElement.classList.add("dark");
//             localStorage.setItem("theme", "dark");
//         }
//         else {
//             document.documentElement.classList.remove("dark");
//             localStorage.removeItem("theme");
//         }
//     };

//     return (
//         <button
//             onClick={toggleDarkMode}
//             className="absolute top-4 right-4 p-2 bg-yellow-300 dark:bg-black rounded-full shadow-lg"
//         >
//             {dark ? "🌙" : "💡"}
//         </button>
//     )
// }

'use client';

interface Props {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export default function DarkModeToggle({ darkMode, toggleDarkMode }: Props) {
  return (
    <button
      onClick={toggleDarkMode}
      className="px-4 py-2 rounded bg-yellow-400 dark:bg-yellow-500 text-gray-900 dark:text-gray-100"
    >
      {darkMode ? 'Light Mode 💡' : 'Dark Mode 🌙'}
    </button>
  );
}
