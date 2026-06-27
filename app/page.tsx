import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-gray-900">
      {/* Navbar */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <h1 className="text-lg font-semibold">Room Reservation</h1>

          <Link
            href="/signin"
            className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium transition hover:bg-gray-50"
          >
            Sign In
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto flex max-w-7xl flex-col items-center px-6 py-28 text-center">
        <span className="mb-4 rounded-full bg-blue-50 px-4 py-1 text-sm font-medium text-blue-600">
          Room Reservation System
        </span>

        <h2 className="max-w-3xl text-5xl font-bold tracking-tight">
          Reserve Rooms <br />
          Without the Hassle.
        </h2>

        <p className="mt-6 max-w-2xl text-lg text-gray-500">
          Book available rooms in seconds, manage reservations, and stay
          organized with a modern reservation experience.
        </p>

        <div className="mt-10 flex gap-4">
          <Link
            href="/signup"
            className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-500"
          >
            Get Started
          </Link>

          <Link
            href="/signin"
            className="rounded-xl border border-gray-200 bg-white px-6 py-3 font-medium transition hover:bg-gray-50"
          >
            Sign In
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto grid max-w-7xl gap-6 px-6 pb-28 md:grid-cols-3">
        {[
          {
            title: "Fast Booking",
            desc: "Reserve any available room in seconds.",
            icon: "⚡",
          },
          {
            title: "Live Availability",
            desc: "Instantly see available and occupied rooms.",
            icon: "🏢",
          },
          {
            title: "Reservation History",
            desc: "View and manage all your bookings.",
            icon: "📅",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="mb-5 text-4xl">{item.icon}</div>

            <h3 className="text-xl font-semibold">{item.title}</h3>

            <p className="mt-3 text-sm leading-6 text-gray-500">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="border-t border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center px-6 py-24 text-center">
          <h2 className="text-4xl font-bold">
            Ready to reserve your next room?
          </h2>

          <p className="mt-4 max-w-xl text-gray-500">
            Create an account and start booking rooms in just a few clicks.
          </p>

          <Link
            href="/signup"
            className="mt-8 rounded-xl bg-blue-600 px-8 py-3 font-medium text-white transition hover:bg-blue-500"
          >
            Create Account
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-[#F8FAFC] py-8 text-center text-sm text-gray-500">
        Built with ❤️ by{" "}
        <a
          href="https://instagram.com/raufsemi"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-gray-900 hover:text-blue-600 transition-colors"
        >
          @raufsemi
        </a>{" "}
        &{" "}
        <a
          href="https://instagram.com/faiz"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-gray-900 hover:text-blue-600 transition-colors"
        >
          @faiz
        </a>
      </footer>
    </main>
  );
}
