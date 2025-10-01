"use client";

import React, {useState} from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ResetPasswordPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const userId = searchParams.get("id");

    const [password, setPassword] = useState("");
    const [Reenter, setReenter] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleResetPassword = async () => {
        setError("");
        setSuccess("");

        if(!password){
            setError("Password is required");
            return;
        }
        if(password!==Reenter){
            setError("Passwords do not match");
            return;
        }

        try {
            const res = await fetch("/api/auth/reset", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({token, userId, newPassword: password}),
            });

            const data = await res.json();

            if(res.ok){
                setSuccess(data.message);
                setTimeout(()=> router.push("/login"), 2000);
            } else {
                setError(data.error || "Something went wrong");
            }
        } catch (err) {
            console.error(err);
            setError("Something went wrong");
        }
    }

    return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Reset Password</h1>

      {error && <p className="text-red-500 mb-2">{error}</p>}
      {success && <p className="text-green-500 mb-2">{success}</p>}

      <input
        type="password"
        placeholder="Enter new password"
        className="p-2 border border-gray-300 rounded mb-4 w-full max-w-sm"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <input
        type="password"
        placeholder="Re-enter new password"
        className="p-2 border border-gray-300 rounded mb-4 w-full max-w-sm"
        value={Reenter}
        onChange={(e) => setReenter(e.target.value)}
      />

      <button
        onClick={handleResetPassword}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Reset Password
      </button>
    </div>
  );
}