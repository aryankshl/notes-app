"use client";

import { useState, useEffect } from "react";

export default function DarkModeToggle() {
    const [dark, setDark] = useState(false);

    useEffect(() => {
        if(localStorage.getItem("theme") === "dark") {
            setDark(true);
            document.documentElement.classList.add("dark");
        }
    }, []);

    const toggleDarkMode = () => {
        setDark(!dark);
        if(!dark) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        }
        else {
            document.documentElement.classList.remove("dark");
            localStorage.removeItem("theme");
        }
    };

    return (
        <button
            onClick={toggleDarkMode}
            className="absolute top-4 right-4 p-2 bg-yellow-300 dark:bg-yellow-500 rounded-full shadow-lg"
        >
            {dark ? "🌙" : "💡"}
        </button>
    )
}