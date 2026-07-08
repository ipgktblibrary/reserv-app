"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { SelectBlock } from "@/features/misc/selectBloc";
import { Chevron } from "@/features/misc/chevron";

export default function SignUpPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");

  const [phone, setPhone] = useState<string>("");

  const [role, setRole] = useState<"teacher" | "student">("student");

  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  async function handleSignup(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    // 1. Check duplicate first
    const { data: validation, error: validationError } = await supabase.rpc(
      "check_signup_available",
      {
        p_email: email,
        p_phone_number: phone,
      },
    );

    if (validationError) {
      setError(validationError.message);
      return;
    }

    if (!validation.available) {
      setError(validation.message);
      return;
    }

    // 2. Create auth only after validation passes
    const { data, error: authError } = await supabase.auth.signUp({
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
    const { error: profileError } = await supabase.rpc("create_profile", {
      user_id: user.id,
      user_email: email,
      user_role: role,
      user_name: name,
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
                Create account
              </h2>
              <p className="text-sm text-gray-500">
                Start your journey in seconds.
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
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition duration-200"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold tracking-widest text-gray-400 uppercase mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Raufsemi"
                  className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition duration-200"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold tracking-widest text-gray-400 uppercase mb-2">
                  Phone Number
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

              <SelectBlock label="Select Account Type">
                <select
                  value={role}
                  onChange={(e) =>
                    setRole(e.target.value as "teacher" | "student")
                  }
                  className="w-full appearance-none rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 pr-10 text-sm focus:border-black focus:ring-2 focus:ring-black/10"
                  required
                >
                  <option value="" disabled hidden>
                    Select your role
                  </option>
                  <option value="student">Pelajar</option>
                  <option value="teacher">Pensyarah</option>
                </select>
                <Chevron />
              </SelectBlock>

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
                Sign Up
              </button>
            </form>
          </div>

          {/* Footer */}
          <div className="mt-10 pt-6 border-t border-gray-100 text-center md:text-left">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <a
                href="/signin"
                className="font-medium text-purple-600 hover:text-purple-500 transition-colors"
              >
                Sign in
              </a>
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="md:col-span-7 bg-white p-8 md:p-12 flex flex-col justify-end min-h-112.5 relative overflow-hidden group rounded-2xl border border-gray-200/80 shadow-xl shadow-gray-100">
          <div className="absolute top-0 right-0 p-6 opacity-[0.03] font-bold text-[220px] pointer-events-none select-none text-gray-900 leading-none">
            01
          </div>

          <div className="absolute inset-0 bg-linear-to-br from-purple-500/3 via-transparent to-transparent opacity-60 pointer-events-none" />

          <div className="relative z-10 max-w-md">
            <div className="text-purple-600 mb-6">
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
              One account for all bookings
            </h3>

            <p className="text-sm text-gray-500 leading-relaxed">
              Sign up to book rooms, manage reservations, and view your schedule
              in one place.{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
