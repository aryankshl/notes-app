"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Note {
  _id: string;
  title: string;
  content: string;
}

export default function NotesPage() {
  const router = useRouter();
  const [notes, setNotes] = useState<Note[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);

  // Fetch notes from the API
  // const fetchNotes = async () => {
  //     setIsLoading(true);
  //     setError("");

  //     const token = localStorage.getItem("token");
  //     if(!token){
  //         router.push("/login");
  //         return;
  //     }

  //     try {
  //         const res = await fetch("/api/notes", {
  //             headers: {
  //                 Authorization: `Bearer ${token}`
  //             },
  //         });

  //         const data = await res.json();

  //         if(res.ok){
  //             setNotes(data.notes);
  //         }
  //         else{
  //             setError(data.error || "Failed to fetch notes");
  //         }
  //     } catch(err) {
  //         console.error(err);
  //         setError("Something went wrong");
  //     }
  //     finally{
  //         setIsLoading(false);
  //     }
  // }
  const fetchNotes = async () => {
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/notes"); // cookie automatically sent
      const data = await res.json();

      if (res.ok) {
        setNotes(data.notes);
      } else {
        setError(data.error || "Failed to fetch notes");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Delete a note
  const handleDelete = async (id: string) => {
    // const token = localStorage.getItem("token");

    // if (!token) return;

    try {
      const res = await fetch(`/api/notes/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setNotes(notes.filter((note) => note._id != id));
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete note");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include", // this ensures cookies are sent with the request
    });

    window.location.href = "/login";
  };

  return (
    <div className="relative flex flex-col items-center justify-start bg-[url('/bg-dark.png')] min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-500 py-8 px-4">
      {/* Lamp strip */}
      {/* <div className="absolute top-0 w-full h-16 bg-yellow-100 dark:bg-yellow-700 opacity-20 dark:opacity-50 shadow-md z-0"></div> */}

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-3xl p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            My Notes
          </h1>
          <div className="flex gap-4">
            <button
              onClick={() => router.push("/notes/new")}
              className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded transition-colors duration-300"
            >
              + Add Note
            </button>
            <button
              onClick={handleLogout}
              className="bg-orange-500 cursor-pointer hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded transition-colors duration-300"
            >
              Logout
            </button>
          </div>
        </div>

        {isLoading && (
          <p className="text-gray-700 dark:text-gray-200">Loading...</p>
        )}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {notes.map((note) => (
            <div
              key={note._id}
              className="p-6 bg-gray-50 dark:bg-gray-700 rounded-xl shadow flex flex-col justify-between transition-transform transform hover:scale-105"
            >
              <div>
                <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-100">
                  {note.title}
                </h2>
                {/* Content with clamp */}
                <p
                  className={`text-gray-700 dark:text-gray-300 transition-all duration-300 ${
                    expanded ? "" : "line-clamp-2"
                  }`}
                >
                  {note.content}
                </p>

                {/* Toggle button */}
                {note.content.length > 80 && (
                  <button
                    onClick={() => setExpanded(!expanded)}
                    className="mt-2 cursor-pointer text-sm text-blue-500 hover:underline"
                  >
                    {expanded ? "Read less" : "Read more"}
                  </button>
                )}
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => router.push(`/notes/${note._id}`)}
                  className="text-blue-500 hover:underline font-medium cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(note._id)}
                  className="text-red-500 hover:underline font-medium cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
