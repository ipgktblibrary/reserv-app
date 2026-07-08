"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
export default function SignInPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const [showPassword, setShowPassword] = useState(false);
  const [checking, setChecking] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const check = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        router.replace("/booking");
        return;
      }
      setChecking(false);
    };

    check();
  }, [router]);

  async function handleSignin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);

      return;
    }
    router.replace("/booking");
    router.refresh();
    return data;
  }

  if (checking) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-current border-t-transparent opacity-70" />
          <div className="text-sm text-muted-foreground">Loading</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F8FAFC] text-gray-900 min-h-screen flex items-center justify-center p-6 relative overflow-hidden font-sans">
      <div className="absolute -top-20 -right-20 w-100 h-100 bg-purple-600/3 blur-[120px] pointer-events-none select-none" />
      <div className="absolute -bottom-20 -left-20 w-100 h-100 bg-purple-500/3 blur-[120px] pointer-events-none select-none" />

      {/* Main Container Grid */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10">
        {/* Left Side: Interactive Login Form Card */}
        <div className="md:col-span-5 bg-white p-8 md:p-10 flex flex-col justify-between rounded-2xl border border-gray-200/80 shadow-xl shadow-gray-100">
          <div>
            {/* Header */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold tracking-tight text-gray-900 mb-2">
                Selamat Kembali
              </h2>
              <p className="text-sm text-gray-500">
                Masukkan maklumat akaun anda untuk log masuk ke sistem.
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
                  Alamat E-mel
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="rauf@gmail.com"
                  className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition duration-200"
                  required
                />
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-3 pr-10 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition duration-200"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    /* eye-off */
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M3 3l18 18M10.58 10.58A3 3 0 0013.41 13.41M9.88 4.13A10.94 10.94 0 0112 4c7 0 10 8 10 8a18.45 18.45 0 01-3.23 4.5M6.52 6.52A18.45 18.45 0 002 12s3 8 10 8a10.94 10.94 0 005.87-1.69"
                      />
                    </svg>
                  ) : (
                    /* eye */
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M2 12s3.5-8 10-8 10 8 10 8-3.5 8-10 8-10-8-10-8z"
                      />
                      <circle cx="12" cy="12" r="3" strokeWidth={1.5} />
                    </svg>
                  )}
                </button>
              </div>
              <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-500 text-white font-medium text-sm py-3 px-4 rounded-xl shadow-lg shadow-purple-600/10 transition duration-200 mt-2"
              >
                Log Masuk
              </button>
            </form>
          </div>

          {/* Footer Integration */}
          <div className="mt-10 pt-6 border-t border-gray-100 text-center md:text-left">
            <p className="text-sm text-gray-500">
              Belum mempunyai akaun?
              <a
                href="/signup"
                className="font-medium text-purple-600 hover:text-purple-500 transition-colors"
              >
                {""} Daftar sekarang
              </a>
            </p>
          </div>
        </div>

        {/* Right Side: Structural Branding Block */}
        <div className="relative overflow-hidden rounded-2xl border border-gray-200/80 shadow-xl md:col-span-7 min-h-[450px]">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/images/library-hero.png')",
            }}
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/60" />

          {/* Purple Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#6844C7]/55 via-[#6844C7]/20 to-black/60" />

          {/* Decorative Blur */}
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-purple-400/20 blur-3xl" />

          {/* Content */}
          <div className="relative z-10 flex h-full flex-col justify-end p-8 md:p-12">
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="h-7 w-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z"
                />
              </svg>
            </div>

            <div className="max-w-md">
              <h3 className="text-3xl font-semibold tracking-tight text-white">
                Tempah Bilik Perpustakaan
              </h3>

              <p className="mt-4 text-sm leading-7 text-white/80">
                Semak kekosongan bilik, buat tempahan dengan mudah, dan urus
                tempahan anda dalam satu sistem.
              </p>

              <div className="mt-8 space-y-3 text-sm text-white/90">
                <div className="flex items-center gap-3">
                  <span className="text-green-400">✓</span>
                  Semak bilik yang tersedia
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-green-400">✓</span>
                  Tempahan yang cepat dan mudah
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-green-400">✓</span>
                  Lihat sejarah tempahan anda
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
