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

  const { data, error } = await supabase.auth.resetPasswordForEmail(
    normalizedEmail,
    {
      redirectTo: "https://ipgktb-library.vercel.app/reset-password",
    },
  );

  console.log("data:", data);

  console.log("error:", error);

  console.log("name:", error?.name);

  console.log("status:", error?.status);

  console.log("code:", error?.code);

  console.log("message:", error?.message);

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
