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
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({title, content}),
            });

            if(res.ok) {
                router.push("/notes");
            }
            else {
                const data = await res.json();
                setError(data.error || "Failed to add note");
            }
        } catch(err) {
            console.error(err);
            setError("Something went wrong");
        }
    }

    return (
    <div className="flex flex-col items-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Add Note</h1>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <input
        type="text"
        placeholder="Title"
        className="p-2 border border-gray-300 rounded mb-2 w-full max-w-sm"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Content"
        className="p-2 border border-gray-300 rounded mb-4 w-full max-w-sm"
        rows={4}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button
        onClick={handleAddNote}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Save
      </button>
    </div>
  );
}