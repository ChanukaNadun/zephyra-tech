"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Link
        href="/sign-in"
        className="px-6 py-2 bg-indigo-600 text-white rounded-lg"
      >
        Go to Sign In
      </Link>
    </div>
  );
}
