// "use client";

// import { useUserProfile } from "@/features/profile/useProfile";

// export default function BookingHeader() {
//   const { name } = useUserProfile();

//   return (
//     <div className="relative mb-8 overflow-hidden rounded-2xl shadow-lg">
//       <div
//         className="absolute inset-0 bg-cover bg-center"
//         style={{
//           backgroundImage: "url('/images/library-hero.png')",
//         }}
//       />

//       <div className="absolute inset-0 bg-black/55" />
//       <div className="absolute inset-0 bg-linear-to-r from-accent/60 via-[#6844C7]/20 to-transparent" />
//       <div className="relative flex items-start justify-between gap-4 p-6">
//         <div>
//           <h1 className="text-2xl font-bold tracking-tight text-white">
//             Perpustakaan Zaaba
//           </h1>

//           <p className="mt-2 text-sm text-white/80">
//             Selamat datang,{" "}
//             <span className="font-semibold text-white">
//               {name?.toUpperCase()}
//             </span>
//           </p>
//         </div>

//         <div className="hidden sm:flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white backdrop-blur-md">
//           <span className="h-2 w-2 rounded-full bg-green-400" />
//           Aktif
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useMemo } from "react";

import { useUserProfile } from "@/features/profile/useProfile";

const profileEmojis = [
  "😀",
  "😎",
  "🤓",
  "🥳",
  "🤠",
  "😺",
  "🐸",
  "🐼",
  "🦊",
  "🐨",
  "🐙",
  "🦄",
  "🌈",
  "⭐",
  "🌙",
  "☀️",
  "🌻",
  "🍀",
  "🍕",
  "🍩",
  "🍪",
  "🚀",
  "🎨",
  "🎧",
  "🎮",
  "⚡",
];

export default function BookingHeader() {
  const { name } = useUserProfile();

  const emoji = useMemo(() => {
    // eslint-disable-next-line react-hooks/purity
    return profileEmojis[Math.floor(Math.random() * profileEmojis.length)];
  }, []);

  return (
    <div className="relative mb-8 overflow-hidden rounded-2xl shadow-lg">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/library-hero.png')",
        }}
      />

      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-linear-to-r from-accent/60 via-[#6844C7]/20 to-transparent" />

      <div className="relative flex items-start justify-between gap-4 p-6">
        <div className="flex items-start gap-4">
          {/* Random profile icon */}
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-3xl shadow-lg backdrop-blur-md">
            {emoji}
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Perpustakaan Zaaba
            </h1>

            <p className="mt-2 text-sm text-white/80">
              Selamat datang,{"  "}
              <span className="font-semibold text-white">
                {name?.toUpperCase()}
              </span>
            </p>
          </div>
        </div>

        <div className="hidden items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white backdrop-blur-md sm:flex">
          <span className="h-2 w-2 rounded-full bg-green-400" />
          Aktif
        </div>
      </div>
    </div>
  );
}
