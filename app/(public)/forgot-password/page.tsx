"use client";

import { useState } from "react";
import { forgotPassword } from "@/features/auth/actions/forgotPassword";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const result = await forgotPassword(email);
      setMessage(result.message);
    } catch {
      setMessage("Ralat tidak dijangka. Sila cuba lagi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md rounded-2xl border p-5 ">
        <h1 className="text-2xl font-semibold">Lupa Password?</h1>

        <p className="mt-2 text-sm text-gray-500">
          Masukkan email untuk menerima pautan reset password.
        </p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-2xl border px-4 py-3"
            required
          />

          <button
            disabled={loading}
            className="w-full rounded-2xl bg-accent py-3 text-white"
          >
            {loading ? "Menghantar..." : "Hantar Pautan Ke Email"}
          </button>

          <Link
            href="/signin"
            className="block w-full rounded-2xl bg-accent py-3 text-center text-white mt-2"
          >
            Kembali
          </Link>
        </form>

        {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}
      </div>
    </div>
  );
}
