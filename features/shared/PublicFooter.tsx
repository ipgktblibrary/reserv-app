"use client";

export function PublicFooter() {
  return (
    <div className="mt-12 pt-6 border-t border-purple-100 text-xs text-gray-500 text-center space-y-2">
      <div className="text-gray-400">Built with ❤️</div>

      <a
        href="https://instagram.com/raufsemi"
        target="_blank"
        className="text-[#6844C7] hover:underline font-medium"
      >
        @raufsemi
      </a>

      <a> | </a>

      <a
        href="https://instagram.com/faizlatiff__"
        target="_blank"
        className="text-[#6844C7] hover:underline font-medium"
      >
        @faizlatiff__
      </a>
    </div>
  );
}
