"use client";

import React, { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleForgotPassword = async () => {
    setError("");
    setSuccess("");
    if (!email) {
      setError("Email is required");
      return;
    }

    try {
      const res = await fetch("/api/auth/forgot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess(data.message);
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
          Forgot Password?
        </h1>

        {error && <p className="text-red-500 mb-2">{error}</p>}
        {success && <p className="text-green-400 mb-2">{success}</p>}

        <input
          type="text"
          placeholder="Enter your email"
          className="p-3 border border-gray-300 dark:border-gray-700 rounded mb-6 w-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleForgotPassword}
          className="w-full cursor-pointer bg-yellow-400 hover:bg-yellow-500 dark:bg-yellow-500 dark:hover:bg-yellow-600 text-gray-900 font-bold py-3 rounded transition-colors duration-300"
        >
          Send Reset Link
        </button>
      </div>
    </div>
  );
}
