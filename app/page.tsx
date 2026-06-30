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
        {/* background glow */}
        <div className="absolute inset-0 bg-linear-to-br from-purple-50 via-white to-white" />
        <div className="absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-purple-200 blur-3xl opacity-40" />

        <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 py-28 text-center">
          <span className="mb-5 rounded-full bg-purple-100 px-4 py-1 text-sm font-medium text-purple-700">
            Sistem Tempahan Bilik Perpustakaan
          </span>

          <h2 className="max-w-3xl text-5xl font-bold tracking-tight">
            Tempah bilik <br />
            dengan lebih mudah
          </h2>

          <p className="mt-6 max-w-2xl text-lg text-gray-600">
            Gunakan sistem Pustakaan Za’ba untuk semak bilik kosong, buat
            tempahan, dan elakkan tempahan bertindih — semuanya dalam satu
            tempat.
          </p>
          <div className="mt-10 flex gap-4">
            <Link
              href="/signup"
              className="rounded-xl bg-purple-600 px-6 py-3 font-medium text-white shadow-sm transition hover:bg-purple-500 hover:shadow-md"
            >
              Daftar Sekarang
            </Link>

            <Link
              href="/signin"
              className="rounded-xl border border-gray-200 bg-white px-6 py-3 font-medium transition hover:border-purple-300 hover:bg-purple-50 hover:text-purple-700"
            >
              Log Masuk
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto grid max-w-7xl gap-6 px-6 pb-28 md:grid-cols-3">
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
            className="group rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:border-purple-200 hover:shadow-lg"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-2xl">
              {item.icon}
            </div>

            <h3 className="text-xl font-semibold group-hover:text-purple-700">
              {item.title}
            </h3>

            <p className="mt-3 text-sm leading-6 text-gray-500">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="border-t border-gray-100 bg-linear-to-b from-white to-purple-50">
        <div className="mx-auto flex max-w-7xl flex-col items-center px-6 py-24 text-center">
          <h2 className="text-4xl font-bold tracking-tight">Tempah sekarang</h2>

          <p className="mt-4 max-w-xl text-gray-600">
            Akses sistem Pustakaan Za’ba dan urus tempahan bilik dengan lebih
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

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white py-8 text-center text-sm text-gray-500">
        Built with ❤️ by{"  "}
        <a
          href="https://instagram.com/raufsemi"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-gray-700 hover:text-purple-700"
        >
          @raufsemi{"  "}
        </a>
        <a
          href="https://instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-gray-700 hover:text-purple-700"
        >
          and @faiz
        </a>
      </footer>
    </main>
  );
}
