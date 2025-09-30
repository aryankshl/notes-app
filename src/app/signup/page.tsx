"use client";

import React, { useState } from "react";
import { useRouter } from "next/router";


export default function SignupPage() {
    const router = useRouter();

    const [user, setUser] = useState({username: "", email: "", password: ""});
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSignup = async () => {
        setError("");
        setSuccess("");

        if(!user.username || !user.email || !user.password) {
            setError("All fields are required");
            return;
        }

        try{
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user),
            });

            const data = await res.json();
            if(res.ok){
                setSuccess(data.message);
                //Redirect to login page after 2 seconds
                setTimeout(()=> router.push("/login"), 2000);
            }
            else{
                setError(data.error || "Something went wrong");
            }
        } catch (err){
            console.error(err);
            setError("Something went wrong");
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-2xl font-bold mb-4">Signup</h1>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            {success && <p className="text-green-500 mb-2">{success}</p>}

            <input
                type="text"
                placeholder="Username"
                className="p-2 border border-gray-300 rounded mb-2 w-full max-w-sm"
                value={user.username}
                onChange={(e) => setUser({...user, username: e.target.value})}
            />

            <input
                type="text"
                placeholder="Email"
                className="p-2 border border-gray-300 rounded mb-2 w-full max-w-sm"
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
            />

            <input
                type="text"
                placeholder="Password"
                className="p-2 border border-gray-300 rounded mb-2 w-full max-w-sm"
                value={user.password}
                onChange={(e) => setUser({...user, password: e.target.value})}
            />

            <button
                onClick={handleSignup}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Signup
                </button>
            
            <p
            className="mt-4 text-sm"
            >Already have an account?{" "} 
                <span
                className="text-blue-500 cursor-pointer"
                onClick={()=> router.push("/login")}
                >Login here</span>
            </p>
        </div>
    )
}