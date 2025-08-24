"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import InputField from "@/components/InputField";

export default function SignInPage() {
  const [isMobile, setIsMobile] = useState(false); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

    useEffect(() => {
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth < 576);
      }
    }, []);

      const validateForm = () => {
        const next: { email?: string; password?: string } = {};
        if (!email.trim()) next.email = "Email is required.";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
          next.email = "Please enter a valid email address.";

        if (!password.trim()) next.password = "Password is required.";
        else if (password.length < 6)
          next.password = "Password must be at least 6 characters.";

        setErrors(next);
        return Object.keys(next).length === 0;
      };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "john@mail.com",
          password: "changeme",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      setResponse(data.token);
      toast.success("Signed in successfully !");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "An unexpected error occurred!"
      );
    } finally {
      setLoading(false);
    }
  };


  return (
    <div
      className={`flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4`}
    >
      <div
        className={`${
          isMobile ? "" : "w-full max-w-sm rounded-2xl bg-white shadow-lg p-6"
        }`}
      >
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
          Welcome
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Please sign in to continue
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <InputField
            label="Email Address"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your Email"
            required
            error={errors.email ?? null}
          />

          {/* Password */}
          <InputField
            label="Password"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            error={errors.password ?? null}
          />

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-medium py-2 rounded-lg hover:bg-indigo-700 active:bg-indigo-800 transition-colors shadow-sm"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Sign up */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            href="/sign-up"
            className="text-indigo-600 font-medium hover:underline"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
