"use client";

import React, { useState } from "react";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleForgotPassword = async () => {
        setError("");
        setSuccess("");
        if(!email) {
            setError("Email is required");
            return;
        }

        try{
            const res = await fetch("/api/auth/forgot",{
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({email}),
            });

            const data = await res.json();
            if(res.ok){
                setSuccess(data.message);
            }else{
                setError(data.error || "Something went wrong");
            }
        
        } catch(err) {
            console.error(err);
            setError("Something went wrong");
        }
    }

    return (
        <div>
            <h1>Forgot Password</h1>

            {error && <p className="text-red-500 mb-2">{error}</p>}
            {success && <p className="text-green-500 mb-2">{success}</p>}

            <input
                type="text"
                placeholder="Enter your email"
                className="p-2 border border-gray-300 mb-4 w-full max-w-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
            />

            <button
                onClick={handleForgotPassword}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >Send Reset Link</button>
        </div>
    )
}