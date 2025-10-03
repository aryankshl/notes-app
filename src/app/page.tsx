// src/app/page.tsx
export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 bg-[url('/bg-dark.png')] bg-center bg-cover">
      <h1 className="text-4xl font-bold mb-4">Welcome to My Notes App</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300">
        Organize your notes securely and access them anytime.
      </p>

      <div className="mt-6 flex gap-4">
        <a
          href="/login"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Login
        </a>
        <a
          href="/signup"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Sign Up
        </a>

        <a
          href="/login" // can use same login page, just differentiate by admin field
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Admin Login
        </a>
      </div>
    </div>
  );
}
