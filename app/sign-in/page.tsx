"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import InputField from "@/components/InputField";
import { useRouter } from "next/navigation";
  import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    LogIn,
    ShieldCheck,
    Sparkles,
  } from "lucide-react";

export default function SignInPage() {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

    useEffect(() => {
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth < 400);
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
      router.push("/profile");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "An unexpected error occurred!"
      );
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-50 via-white to-slate-100 flex items-center justify-center p-4">

      <main className="w-full max-w-md">
        {/* Developer */}
        {!isMobile && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-sm text-slate-500">
            <Sparkles className="h-4 w-4 text-indigo-400" />
            <span>
              Create{" "}
              by Chanuka Nadun
            </span>
          </div>
        )}

        {/* Card */}
        <div className={`${!isMobile ? "rounded-2xl border border-slate-200 bg-white/80 shadow-xl backdrop-blur supports-[backdrop-filter]:bg-white/60 p-6 " : ""}`}>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight text-center">
            Welcome
          </h1>
          <p className="mt-1 text-sm text-slate-500 text-center">
            Please sign in to continue
          </p>

          <form
            onSubmit={handleSubmit}
            noValidate
            aria-busy={loading}
            className="mt-6 space-y-4"
          >
            <InputField
              label="Email address"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              autoComplete="email"
              required
              error={errors.email}
              leftIcon={<Mail className="h-4 w-4 text-slate-400" />}
            />

            <InputField
              label="Password"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
              error={errors.password}
              leftIcon={<Lock className="h-4 w-4 text-slate-400" />}
              isSecret
              revealIcons={{ show: <Eye className="h-4 w-4" />, hide: <EyeOff className="h-4 w-4" /> }}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-medium py-2.5 shadow-sm hover:from-indigo-700 hover:to-violet-700 active:from-indigo-800 active:to-violet-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <LogIn className="h-4 w-4" />
              {loading ? "Signing in…" : "Sign in"}
            </button>

            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white/80 px-3 text-xs text-slate-400 backdrop-blur">
                  or
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => toast("GitHub sign-in coming soon")}
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 text-slate-700 font-medium py-2.5 hover:bg-slate-50 active:bg-slate-100 transition-colors"
            >
              {/* <GoogleIcon className="h-4 w-4" /> */}
              Continue with Google
            </button>
          </form>

          
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="h-4 w-4" />
            <span>We never store your password.</span>
          </div>

          {/* Signup Navigation */}
          <p className="mt-6 text-center text-sm text-slate-600">
            Don’t have an account?{" "}
            <Link href="/sign-up" className="text-indigo-600 font-medium hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
