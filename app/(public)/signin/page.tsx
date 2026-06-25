"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
export default function SignInPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  async function handleSignin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    console.log("AUTH DATA:", data);
    console.log("AUTH ERROR:", authError);
    if (authError) {
      setError(authError.message);

      return;
    }
    router.replace("/booking");
    router.refresh();
    return data;
  }

  return (
    <div className="bg-[#F8FAFC] text-gray-900 min-h-screen flex items-center justify-center p-6 relative overflow-hidden font-sans">
      <div className="absolute -top-20 -right-20 w-100 h-100 bg-blue-600/3 blur-[120px] pointer-events-none select-none" />
      <div className="absolute -bottom-20 -left-20 w-100 h-100 bg-blue-500/3 blur-[120px] pointer-events-none select-none" />

      {/* Main Container Grid */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10">
        {/* Left Side: Interactive Login Form Card */}
        <div className="md:col-span-5 bg-white p-8 md:p-10 flex flex-col justify-between rounded-2xl border border-gray-200/80 shadow-xl shadow-gray-100">
          <div>
            {/* Header */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold tracking-tight text-gray-900 mb-2">
                Welcome back
              </h2>
              <p className="text-sm text-gray-500">
                Enter your credentials to access your portal.
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2 animate-in fade-in duration-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 shrink-0 mt-0.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                  />
                </svg>
                <span>{error}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSignin} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-semibold tracking-widest text-gray-400 uppercase mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200"
                  required
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label
                    htmlFor="password"
                    className="block text-xs font-semibold tracking-widest text-gray-400 uppercase"
                  >
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-xs font-medium text-blue-600 hover:text-blue-500 transition-colors"
                  >
                    Forgot?
                  </a>
                </div>
                <input
                  type="current-password"
                  id="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm py-3 px-4 rounded-xl shadow-lg shadow-blue-600/10 transition duration-200 mt-2"
              >
                Sign In
              </button>
            </form>
          </div>

          {/* Footer Integration */}
          <div className="mt-10 pt-6 border-t border-gray-100 text-center md:text-left">
            <p className="text-sm text-gray-500">
              Dont have an account?{" "}
              <a
                href="#"
                className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>

        {/* Right Side: Structural Branding Block */}
        <div className="md:col-span-7 bg-white p-8 md:p-12 flex flex-col justify-end min-h-112.5 relative overflow-hidden group rounded-2xl border border-gray-200/80 shadow-xl shadow-gray-100">
          {/* Subtle Graphic Number Overlay */}
          <div className="absolute top-0 right-0 p-6 opacity-[0.03] font-bold text-[220px] pointer-events-none select-none text-gray-900 leading-none">
            01
          </div>

          {/* Accent Flow Blend */}
          <div className="absolute inset-0 bg-linear-to-br from-blue-500/3 via-transparent to-transparent opacity-60 pointer-events-none" />

          {/* Content Grouping */}
          <div className="relative z-10 max-w-md">
            <div className="text-blue-600 mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 9V4.5M9 9H4.5M9 9L3 3m12 6V4.5M15 9h4.5M15 9l6-6M9 15V19.5M9 15H4.5M9 15l-6 6m12-6V19.5M15 15h4.5M15 15l6 6"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-3 tracking-tight text-gray-900">
              Intentional Curation
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Experience an ecosystem focused entirely on execution. We reject
              the noise, maximizing deep engagement and reducing unnecessary
              cognitive clutter.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
