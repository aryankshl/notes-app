"use client";

import React, {useState, useEffect} from "react";
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

    useEffect(()=>{
        const fetchNote = async()=>{
            try {
                const res = await axios.get(`/api/notes/${noteId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    },
                });

                setNote(res.data);
            } catch(err) {
                console.error("Error fetching note:", err);
            }
        };
        fetchNote();
    }, [noteId]);

    const handleUpdate = async ()=> {
        try {
            await axios.put(`/api/notes/${noteId}`, {
                title: note.title,
                content: note.content,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
            }
           );
           router.push("/notes");
        } catch(error) {
            confirm(`Error updating note: ${error}`);
        }
    }

    return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-xl font-bold mb-4">Edit Note</h1>

      <input
        className="p-2 border border-gray-300 mb-4 w-full"
        type="text"
        placeholder="Title"
        value={note.title}
        onChange={(e) => setNote({ ...note, title: e.target.value })}
      />

      <textarea
        className="p-2 border border-gray-300 mb-4 w-full"
        placeholder="Content"
        value={note.content}
        onChange={(e) => setNote({ ...note, content: e.target.value })}
      />

      <button
        onClick={handleUpdate}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Update Note
      </button>
    </div>
  );
}