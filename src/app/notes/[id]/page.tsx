/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

export default function EditNotePage() {
  const router = useRouter();
  const params = useParams();
  const noteId = params.id as string;

  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    // const fetchNote = async()=>{
    //     try {
    //         const res = await axios.get(`/api/notes/${noteId}`, {
    //             headers: {
    //                 Authorization: `Bearer ${localStorage.getItem("token")}`
    //             },
    //         });

    //         setNote(res.data);
    //     } catch(err) {
    //         console.error("Error fetching note:", err);
    //     }
    // };
    const fetchNote = async () => {
      try {
        const res = await axios.get(`/api/notes/${noteId}`); // cookies sent automatically
        setNote(res.data);
      } catch (err: any) {
        console.error("Error fetching note:", err.response?.data || err);
      }
    };
    fetchNote();
  }, [noteId]);

  const handleUpdate = async () => {
    // try {
    //   await axios.put(
    //     `/api/notes/${noteId}`,
    //     {
    //       title: note.title,
    //       content: note.content,
    //     },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${localStorage.getItem("token")}`,
    //       },
    //     }
    //   );
    //   router.push("/notes");
    // } catch (error) {
    //   confirm(`Error updating note: ${error}`);
    // }
    try {
      await axios.put(`/api/notes/${noteId}`, {
        title: note.title,
        content: note.content,
      }); // cookies sent automatically
      router.push("/notes");
    } catch (err: any) {
      console.error("Error updating note:", err.response?.data || err);
      alert(`Error updating note: ${err.response?.data?.error || err.message}`);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-start min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-500">
      {/* Table lamp horizontal strip */}
      {/* <div className="absolute top-0 w-full h-16 bg-yellow-100 dark:bg-yellow-700 opacity-20 dark:opacity-50 shadow-md"></div> */}

      <div className="relative z-10 w-full max-w-md p-8 mt-16 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
          Edit Note
        </h1>

        <input
          type="text"
          placeholder="Title"
          className="p-3 border border-gray-300 dark:border-gray-700 rounded mb-4 w-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          value={note.title}
          onChange={(e) => setNote({ ...note, title: e.target.value })}
        />

        <textarea
          placeholder="Content"
          rows={4}
          className="p-3 border border-gray-300 dark:border-gray-700 rounded mb-6 w-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          value={note.content}
          onChange={(e) => setNote({ ...note, content: e.target.value })}
        />

        <button
          onClick={handleUpdate}
          className="w-full bg-yellow-400 hover:bg-yellow-500 dark:bg-yellow-500 dark:hover:bg-yellow-600 text-gray-900 font-bold py-3 rounded transition-colors duration-300"
        >
          Update Note
        </button>
      </div>
    </div>
  );
}
