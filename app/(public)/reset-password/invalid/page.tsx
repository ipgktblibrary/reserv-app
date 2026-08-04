import Link from "next/link";

export default function InvalidResetPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md rounded-2xl bg-white border p-6 text-center">
        <h1 className="text-2xl font-semibold">Link Tidak Sah</h1>

        <p className="mt-2 text-sm text-gray-500">
          Pautan reset password ini tidak sah atau telah tamat tempoh. Sila
          minta pautan baru.
        </p>

        <Link
          href="/forgot-password"
          className="block w-full rounded-2xl bg-[#6844C7] py-3 text-center text-white mt-5"
        >
          Klik
        </Link>
      </div>
    </div>
  );
}
