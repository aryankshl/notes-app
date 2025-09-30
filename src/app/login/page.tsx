"use client";

import React, {useState} from "react";
import { useRouter } from "next/router";

export default function LoginPage(){
    const router = useRouter();

    const [user, setUser] = useState({email: "", password: ""});
    const [error, setError] = useState("");

    const handleLogin = async () => {
        setError("");

        if(!user.email || !user.password) {
            setError("All fields are required");
            return;
        }

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user),
            });

            const data = await res.json();

            if(res.ok){
                // Save token to local storage
                localStorage.setItem("token", data.token);

                // Redirect to notes page
                router.push("/notes");

            }
            else{
                setError(data.error || "Invalid credentials");
            }
        } catch (err) {
            console.error(err);
            setError("Something went wrong");
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-2xl font-bold mb-4">Login</h1>
            {error && <p className="text-red-500 mb-2">{error}</p>}

            <input
                type="text"
                placeholder="Email"
                className="p-2 border border-gray-300 rounded mb-2 w-full max-w-sm"
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
                />

                <input
                type="password"
                placeholder="Password"
                className="p-2 border border-gray-300 rounded mb-2 w-full max-w-sm"
                value={user.password}
                onChange={(e) => setUser({...user, password: e.target.value})}
                />

            <button
                onClick={handleLogin}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >Login</button>

            <p className="mt-4 text-sm">
                Don&apos;t have an accout?{" "}
                <span
                    onClick={()=>router.push("/signup")}
                    className="text-blue-500 cursor-pointer"
                >Signup here</span>
            </p>

            <p>
                Forgot password?{" "}
                <span
                    className="text-blue-500 cursor-pointer"
                    onClick={()=>router.push("/forgot-password")}
                >
                    Reset here
                </span>
            </p>
        </div>
    )
}