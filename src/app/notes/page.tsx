"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Note{
    _id: string;
    title: string;
    content: string;
}

export default function NotesPage(){
    const router = useRouter();
    const [notes, setNotes] = useState<Note[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    // Fetch notes from the API
    const fetchNotes = async () => {
        setIsLoading(true);
        setError("");

        const token = localStorage.getItem("token");
        if(!token){
            router.push("/login");
            return;
        }

        try {
            const res = await fetch("/api/notes", {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            const data = await res.json();

            if(res.ok){
                setNotes(data.notes);
            }
            else{
                setError(data.error || "Failed to fetch notes");
            }
        } catch(err) {
            console.error(err);
            setError("Something went wrong");
        }
        finally{
            setIsLoading(false);
        }
    }

    useEffect(()=> {
        fetchNotes();
    },[]);

    // Delete a note
    const handleDelete = async (id: string) => {
        const token = localStorage.getItem("token");

        if(!token) return;

        try {
            const res = await fetch(`/api/notes/${id}`,{
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            if(res.ok){
                setNotes(notes.filter((note) => note._id != id));
            }
            else{
                const data = await res.json();
                alert(data.error || "Failed to delete note");
            }
        } catch(err) {
            console.error(err);
        }
    }

    return (
        <div>
            <h1>My Notes</h1>
            {isLoading && <p>Loading...</p>}
            {error && <p className="text-red-500 mb-2">{error}</p>}

            <button
                onClick={()=> router.push("/notes/new")}
                className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >+ Add Note</button>

            <div className="w-full max-w-md space-y-4">
                {notes.map((note) => (
                    <div
                        key={note._id}
                        className="p-4 border border-gray-300 rounded shadow flex justify-between items-start"
                    >
                        <div>
                            <h2 className="font-bold">{note.title}</h2>
                            <p>{note.content}</p>
                        </div>
                        <div className="flex gap-2">
                            <button 
                                className="text-blue-500"
                                onClick={() => router.push(`/notes/${note._id}`)}
                            >
                                Edit
                            </button>
                            <button 
                                className="text-red-500"
                                onClick={() => handleDelete(note._id)}
                            >Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}