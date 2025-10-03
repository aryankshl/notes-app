/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminNotesPage() {
    const [notes, setNotes] = useState<any>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotes = async() => {
            try{
                const res = await axios.get("/api/admin/notes", {
                    withCredentials: true,
                });
                setNotes(res.data.notes);
            } catch(err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchNotes();
    }, []);

    if(loading) return <p>Loading...</p>;

    return (
    <div className="p-4 flex flex-col items-start gap-6">
      <h1 className="text-3xl font-bold mb-4">All Users Notes</h1>
      {Object.keys(notes).map(userId => (
        <div key={userId} className="w-full max-w-3xl">
          <h2 className="text-xl font-semibold mb-2">User: {userId}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {notes[userId].map((note: any) => (
              <div key={note._id} className="p-4 bg-white dark:bg-gray-800 rounded shadow">
                <h3 className="font-bold">{note.title}</h3>
                <p>{note.content}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ); 
}