"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewNotePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const handleAddNote = async () => {
    setError("");
    // const token = localStorage.getItem("token");
    // if(!token){
    //     router.push("/login");
    //     return;
    // }

    try {
      const res = await fetch("/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      if (res.ok) {
        router.push("/notes");
      } else {
        const data = await res.json();
        setError(data.error || "Failed to add note");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-start min-h-screen bg-[url('/bg-dark.png')] bg-cover bg-center bg-gray-100 dark:bg-gray-900 transition-colors duration-500">
      {/* Table lamp horizontal strip */}
      {/* <div className="absolute top-0 w-full h-16 bg-yellow-100 dark:bg-yellow-700 opacity-20 dark:opacity-50 shadow-md"></div> */}

      <div className="relative z-10 w-full max-w-md p-8 mt-16 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
          Add Note
        </h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <input
          type="text"
          placeholder="Title"
          className="p-3 border border-gray-300 dark:border-gray-700 rounded mb-4 w-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Content"
          rows={4}
          className="p-3 border border-gray-300 dark:border-gray-700 rounded mb-6 w-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button
          onClick={handleAddNote}
          className="w-full bg-yellow-400 hover:bg-yellow-500 dark:bg-yellow-500 dark:hover:bg-yellow-600 text-gray-900 font-bold py-3 rounded transition-colors duration-300"
        >
          Save Note
        </button>
      </div>
    </div>
  );
}
