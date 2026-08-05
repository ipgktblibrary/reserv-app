import { PublicFooter } from "@/features/shared/PublicFooter";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Navbar */}
      <header className="border-b border-gray-100 bg-white/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <h1 className="text-lg font-semibold tracking-tight text-purple-700">
            PERPUSTAKAAN ZA&#39;BA
          </h1>

          <Link
            href="/signin"
            className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium transition hover:border-purple-300 hover:bg-purple-50 hover:text-purple-700"
          >
            Log Masuk
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=2000&q=80')",
          }}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/55" />
        {/* Optional Purple Gradient */}
        <div className="absolute inset-0 bg-linear-to-br from-purple-900/40 via-transparent to-black/40" />
        <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 py-28 text-center">
          <span className="mb-5 rounded-full bg-white/10 backdrop-blur px-4 py-1 text-sm font-medium text-white">
            Sistem Tempahan Perpustakaan Za&#39;ba IPGKTB
          </span>

          <h2 className="max-w-3xl text-5xl font-bold tracking-tight text-white">
            Tempah bilik <br />
            dengan lebih mudah
          </h2>

          <p className="mt-6 max-w-2xl text-lg text-gray-200">
            Gunakan sistem Perpustakaan Za’ba untuk semak bilik kosong, buat
            tempahan, dan elakkan tempahan bertindih — semuanya dalam satu
            tempat.
          </p>

          <div className="mt-10 flex gap-4">
            <Link
              href="/signup"
              className="rounded-xl bg-purple-600 px-6 py-3 font-medium text-white shadow-sm transition hover:bg-purple-500"
            >
              Daftar Sekarang
            </Link>

            <Link
              href="/signin"
              className="rounded-xl border border-white/30 bg-white/10 backdrop-blur px-6 py-3 font-medium text-white transition hover:bg-white/20"
            >
              Log Masuk
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto mt-6 grid max-w-7xl gap-4 px-6 pb-28 md:grid-cols-3">
        {[
          {
            title: "Tempahan mudah",
            desc: "Tempah bilik kajian dengan cepat tanpa langkah yang menyusahkan.",
            icon: "⚡",
          },
          {
            title: "Status bilik",
            desc: "Semak bilik yang kosong atau sedang digunakan.",
            icon: "📡",
          },
          {
            title: "Rekod tempahan",
            desc: "Lihat semula semua tempahan yang pernah dibuat.",
            icon: "📚",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-xl border border-gray-200 bg-white p-6 transition-colors hover:border-purple-200"
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 text-xl">
              {item.icon}
            </div>

            <h3 className="text-base font-medium text-gray-900">
              {item.title}
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-600">{item.desc}</p>
          </div>
        ))}
      </section>
      {/* CTA */}
      <section className="border-t border-gray-100 bg-linear-to-b from-white to-purple-50">
        <div className="mx-auto flex max-w-7xl flex-col items-center px-6 py-24 text-center">
          <h2 className="text-4xl font-bold tracking-tight">Tempah sekarang</h2>

          <p className="mt-4 max-w-xl text-gray-600">
            Akses sistem Perpustakaan Za’ba dan urus tempahan bilik dengan lebih
            efisien.
          </p>

          <Link
            href="/signup"
            className="mt-8 rounded-xl bg-purple-600 px-8 py-3 font-medium text-white shadow-sm transition hover:bg-purple-500 hover:shadow-md"
          >
            Cipta Akaun
          </Link>
        </div>
      </section>

      <PublicFooter />
    </main>
  );
}
