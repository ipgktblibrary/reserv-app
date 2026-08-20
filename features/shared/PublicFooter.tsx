"use client";

import { FaInstagram } from "react-icons/fa";

export function PublicFooter() {
  return (
    <footer className="mt-12 border-t border-purple-100 pt-6 text-center text-xs text-gray-500">
      <p className="text-gray-400">Built with ❤️</p>

      <div className="mt-2 flex items-center justify-center">
        <a
          href="https://instagram.com/raufsemi"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-bold tracking-wide text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:text-accent/80 hover:decoration-accent"
        >
          <FaInstagram className="size-4" />
          @raufsemi
        </a>

        <span className="mx-3 text-gray-300">|</span>

        <a
          href="https://instagram.com/faizlatiff__"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-bold tracking-wide text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:text-accent/80 hover:decoration-accent"
        >
          <FaInstagram className="size-4" />
          @faizlatiff__
        </a>
      </div>
    </footer>
  );
}
