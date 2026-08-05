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
    redirectTo: "https://ipgktb-library.vercel.app/reset-password",
  });

  if (error) {
    return {
      success: false,
      message: "Tidak dapat menghantar pautan reset password.",
    };
  }

  return {
    success: true,
    message: "Pautan reset password telah dihantar.",
  };
}
