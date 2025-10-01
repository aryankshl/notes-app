"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
// import DarkModeToggle from "../components/DarkModeToggle";

export default function SignupPage() {
  const router = useRouter();

  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignup = async () => {
    setError("");
    setSuccess("");

    if (!user.username || !user.email || !user.password) {
      setError("All fields are required");
      return;
    }

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      // const text = res.text();
      // console.log(text);

      const data = await res.json();
      if (res.ok) {
        setSuccess(data.message);
        //Redirect to login page after 2 seconds
        // setTimeout(()=> router.push("/verify"), 2000);
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    }
  };

  return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-[url('/bg-dark.png')] bg-cover bg-center bg-gray-100 dark:bg-gray-900 transition-colors duration-500">
        {/* <DarkModeToggle /> */}
        {/* {Table lamp horizontal strip} */}
        {/* <div className="absolute top-0 w-full h-16 bg-yellow-100 dark:bg-yellow-700 opacity-20 dark:opacity-50 shadow-md"></div> */}
        <div className="relative z-10 w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">Sign Up</h1>
            
            {error && <p className="text-red-500 mb-2">{error}</p>}
            {success && <p className="text-green-400 mb-2">{success}</p>}

            <input
            type="text"
            placeholder="Username"
          className="p-3 border border-gray-300 dark:border-gray-700 rounded mb-4 w-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />

        <input
          type="text"
          placeholder="Email"
          className="p-3 border border-gray-300 dark:border-gray-700 rounded mb-4 w-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="p-3 border border-gray-300 dark:border-gray-700 rounded mb-6 w-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />

        <button
          onClick={handleSignup}
          className="w-full bg-yellow-400 hover:bg-yellow-500 dark:bg-yellow-500 dark:hover:bg-yellow-600 text-gray-900 font-bold py-3 rounded transition-colors duration-300"
        >
          Sign Up
        </button>

        <p className="mt-6 text-center text-gray-600 dark:text-gray-300 text-sm">
          Already have an account?{" "}
          <span
            className="text-yellow-400 dark:text-yellow-300 cursor-pointer font-medium hover:underline"
            onClick={() => router.push("/login")}
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
}
