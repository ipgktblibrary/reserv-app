"use server";

import { createClient } from "@/lib/supabase/server";

type ForgotPasswordResult = {
  success: boolean;
  message: string;
};

export async function forgotPassword(
  email: string,
): Promise<ForgotPasswordResult> {
  const supabase = await createClient();

  const normalizedEmail = email.trim().toLowerCase();

  const { error } = await supabase.auth.resetPasswordForEmail(normalizedEmail, {
    redirectTo: "https://ipgktblib.vercel.app/auth/callback",
  });

  if (error) {
    return {
      success: false,
      // message: "Tidak dapat menghantar pautan reset password.",
      message: error.message,
    };
  }

  return {
    success: true,
    message: "Pautan reset password telah dihantar.",
  };
}
