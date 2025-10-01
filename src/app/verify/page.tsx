"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");
    const userId = searchParams.get("id");
    if (!token) {
      setStatus("error");
      setMessage("Verification token missing.");
      return;
    }

    const verifyEmail = async () => {
      try {
        const res = await fetch(`/api/auth/verify?token=${token}&id=${userId}`);
        const data = await res.json();

        if (res.ok) {
          setStatus("success");
          setMessage(data.message);
          setTimeout(() => router.push("/login"), 3000); // redirect after 3s
        } else {
          setStatus("error");
          setMessage(data.error || "Verification failed.");
        }
      } catch (err) {
        console.error(err);
        setStatus("error");
        setMessage("Something went wrong.");
      }
    };

    verifyEmail();
  }, [searchParams, router]);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-500">
      {/* Table lamp horizontal strip */}
      {/* <div className="absolute top-0 w-full h-16 bg-yellow-100 dark:bg-yellow-700 opacity-20 dark:opacity-50 shadow-md"></div> */}

      <div className="relative z-10 w-full max-w-md p-8 mt-16 bg-white dark:bg-gray-800 rounded-xl shadow-lg text-center">
        {status === "loading" && (
          <p className="text-gray-800 dark:text-gray-100 font-medium">
            Verifying your email...
          </p>
        )}
        {status === "success" && (
          <p className="text-green-400 font-medium">{message}</p>
        )}
        {status === "error" && (
          <p className="text-red-500 font-medium">{message}</p>
        )}
      </div>
    </div>
  );
}
