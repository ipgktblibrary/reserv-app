"use client";

import { useState } from "react";
import { supabaseClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { SelectBlock } from "@/features/misc/selectBloc";
import { Chevron } from "@/features/misc/chevron";
import { Eye, EyeOff } from "lucide-react";

export default function SignUpPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [role, setRole] = useState<"teacher" | "student">("student");
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  async function handleSignup(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const cleanName = name.toLowerCase().replace(/[^a-z]/g, "");

    if (!cleanName) {
      setError("Nama tidak boleh kosong.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Kata laluan tidak sepadan.");
      return;
    }

    // 1. Check duplicate first
    const { data: validation, error: validationError } =
      await supabaseClient.rpc("check_signup_available", {
        p_email: email,
        p_phone_number: phone,
      });

    if (validationError) {
      setError(validationError.message);
      return;
    }

    if (!validation.available) {
      setError(validation.message);
      return;
    }

    // 2. Create auth only after validation passes
    const { data, error: authError } = await supabaseClient.auth.signUp({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      return;
    }

    const user = data.user;

    if (!user) {
      setError("Account creation failed.");
      return;
    }

    // 3. Create profile
    const { error: profileError } = await supabaseClient.rpc("profile_create", {
      user_email: email,
      user_role: role,
      user_name: cleanName,
      user_phone_number: phone,
    });

    if (profileError) {
      setError(profileError.message);
      return;
    }
    router.replace("/booking");
  }

  const malaysiaPhoneRegex = /^01\d{8,9}$/;
  return (
    <div className="bg-[#F8FAFC] text-gray-900 min-h-screen flex items-center justify-center p-6 relative overflow-hidden font-sans">
      <div className="absolute -top-20 -right-20 w-100 h-100 bg-purple-600/3 blur-[120px] pointer-events-none select-none" />
      <div className="absolute -bottom-20 -left-20 w-100 h-100 bg-purple-500/3 blur-[120px] pointer-events-none select-none" />

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10">
        {/* LEFT */}
        <div className="md:col-span-5 bg-white p-8 md:p-10 flex flex-col justify-between rounded-2xl border border-gray-200/80 shadow-xl shadow-gray-100">
          <div>
            {/* Header */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold tracking-tight text-gray-900 mb-2">
                Daftar Akaun
              </h2>
              <p className="text-sm text-gray-500">
                Masukkan maklumat pendaftaran dengan tepat
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
            <form onSubmit={handleSignup} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold tracking-widest text-gray-400 uppercase mb-2">
                  Alamat E-mel
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="johndoe@gmail.com"
                  className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition duration-200"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold tracking-widest text-gray-400 uppercase mb-2">
                  Nama
                </label>
                <input
                  type="text"
                  value={name}
                  maxLength={20}
                  onChange={(e) => {
                    const value = e.target.value
                      .toLowerCase()
                      .replace(/[^a-z]/g, "");
                    setName(value);
                  }}
                  placeholder="Nama pendek (contoh: ahmad)"
                  className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition duration-200"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold tracking-widest text-gray-400 uppercase mb-2">
                  Nombor Telefon
                </label>
                <input
                  type="tel"
                  inputMode="numeric"
                  value={phone}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    setPhone(value);
                  }}
                  placeholder="0123456789"
                  className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition duration-200"
                  required
                />
                {phone && !malaysiaPhoneRegex.test(phone) && (
                  <p className="mt-1 text-xs text-red-500">
                    Please enter a valid Malaysian mobile number.
                  </p>
                )}
              </div>

              <SelectBlock label="Pilih Jenis Akaun">
                <select
                  value={role}
                  onChange={(e) =>
                    setRole(e.target.value as "teacher" | "student")
                  }
                  className="w-full appearance-none rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 pr-10 text-sm focus:border-black focus:ring-2 focus:ring-black/10"
                  required
                >
                  <option value="" disabled hidden>
                    Pilih Jenis Akaun
                  </option>
                  <option value="student">Pelajar</option>
                  <option value="teacher">Pensyarah/Staff</option>
                </select>
                <Chevron />
              </SelectBlock>

              <label className="block text-xs font-semibold tracking-widest text-gray-400 uppercase mb-2">
                Kata laluan
              </label>

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
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              <label className="block text-xs font-semibold tracking-widest text-gray-400 uppercase mb-2 mt-5">
                Sahkan kata laluan
              </label>

              <div className="relative">
                <input
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition duration-200"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-500 text-white font-medium text-sm py-3 px-4 rounded-xl shadow-lg shadow-purple-600/10 transition duration-200 mt-2"
              >
                Daftar
              </button>
            </form>
          </div>

          {/* Footer */}
          <div className="mt-10 pt-6 border-t border-gray-100 text-center md:text-left">
            <p className="text-sm text-gray-500">
              Sudah mempunyai akaun?
              <a
                href="/signin"
                className="font-medium text-purple-600 hover:text-purple-500 transition-colors"
              >
                Log Masuk
              </a>
            </p>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-gray-200/80 shadow-xl md:col-span-7 min-h-112.5">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{
              backgroundImage: "url('/images/library-hero.png')",
            }}
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-linear-to-br from-[#6844C7]/50 via-[#6844C7]/20 to-black/50" />
          <div className="relative z-10 flex h-full flex-col justify-end p-8 md:p-12">
            <div className="mb-6 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-8 w-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 9V4.5M9 9H4.5M9 9L3 3m12 6V4.5M15 9h4.5M15 9l6-6M9 15V19.5M9 15H4.5M9 15l-6 6m12-6V19.5M15 15h4.5M15 15l6 6"
                />
              </svg>
            </div>

            <div className="max-w-md">
              <h3 className="mb-3 text-3xl font-semibold tracking-tight text-white">
                Urus Tempahan Dengan Mudah
              </h3>

              <p className="text-sm leading-relaxed text-white/80">
                Satu akaun untuk tempah bilik, semak status, dan lihat rekod
                tempahan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
