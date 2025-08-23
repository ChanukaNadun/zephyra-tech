"use client";
import toast from "react-hot-toast";

export default function Home() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Welcome to My Next.js App</h2>
      <button
        onClick={() => toast.success("Hello! Toast works 🎉")}
        className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
      >
        Show Toast
      </button>
    </div>
  );
}
