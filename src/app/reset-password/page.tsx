"use client";

import React, { useState } from "react";
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

    if (!password) {
      setError("Password is required");
      return;
    }
    if (password !== Reenter) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("/api/auth/reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, userId, newPassword: password }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(data.message);
        setTimeout(() => router.push("/login"), 2000);
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-start min-h-screen bg-[url('/bg-dark.png')] bg-cover bg-center bg-gray-100 dark:bg-gray-900 transition-colors duration-500">
      {/* Table lamp horizontal strip */}
      {/* <div className="absolute top-0 w-full h-16 bg-yellow-100 dark:bg-yellow-700 opacity-20 dark:opacity-50 shadow-md"></div> */}

      <div className="relative z-10 w-full max-w-md p-8 mt-16 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
          Reset Password
        </h1>

        {error && <p className="text-red-500 mb-2">{error}</p>}
        {success && <p className="text-green-400 mb-2">{success}</p>}

        <input
          type="password"
          placeholder="Enter new password"
          className="p-3 border border-gray-300 dark:border-gray-700 rounded mb-4 w-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Re-enter new password"
          className="p-3 border border-gray-300 dark:border-gray-700 rounded mb-6 w-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          value={Reenter}
          onChange={(e) => setReenter(e.target.value)}
        />

        <button
          onClick={handleResetPassword}
          className="w-full bg-yellow-400 hover:bg-yellow-500 dark:bg-yellow-500 dark:hover:bg-yellow-600 text-gray-900 font-bold py-3 rounded transition-colors duration-300"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
}
