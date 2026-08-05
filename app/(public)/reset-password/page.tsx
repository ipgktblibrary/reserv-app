"use client";
import { useEffect, useState } from "react";
import { supabaseClient } from "@/lib/supabase/client";
import { resetPassword } from "@/features/auth/actions/resetPassword";

export default function ResetPasswordPage() {
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function verifyRecovery() {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");

      if (code) {
        const { error } =
          await supabaseClient.auth.exchangeCodeForSession(code);

        if (error) {
          setMessage(
            "Pautan reset password tidak sah atau telah tamat tempoh.",
          );
          return;
        }

        setReady(true);
        return;
      }

      const {
        data: { session },
      } = await supabaseClient.auth.getSession();

      if (session) {
        setReady(true);
      } else {
        setMessage("Pautan reset password tidak sah atau telah tamat tempoh.");
      }
    }

    verifyRecovery();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      await resetPassword(password);

      setMessage("Password berjaya ditukar.");

      setPassword("");
      setTimeout(() => {
        window.location.href = "/signin";
      }, 1500);
    } catch (error) {
      setMessage((error as Error).message);
    } finally {
      setLoading(false);
    }
  }

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        {message || "Loading..."}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md rounded-2xl bg-white border p-6">
        <h1 className="text-xl font-semibold">Reset Password</h1>

        <p className="mt-2 text-sm text-gray-500">Masukkan password baru</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="password"
            placeholder="******************"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border px-4 py-3"
            required
            minLength={6}
          />

          <button
            disabled={loading}
            className="w-full rounded-xl bg-[#6844C7] py-3 text-white mt-3"
          >
            {loading ? "Menyimpan..." : "Tukar Password"}
          </button>
        </form>

        {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}
      </div>
    </div>
  );
}
