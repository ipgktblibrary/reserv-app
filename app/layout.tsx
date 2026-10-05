import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/themes/ThemeProvider";

import {
  Bricolage_Grotesque,
  DM_Sans,
  Figtree,
  Fraunces,
  Fredoka,
  Geist,
  Geist_Mono,
  Google_Sans,
  Hanken_Grotesk,
  IBM_Plex_Mono,
  Instrument_Sans,
  Inter,
  JetBrains_Mono,
  Manrope,
  Poppins,
  Public_Sans,
  Varela_Round,
} from "next/font/google";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
});

const googleSans = Google_Sans({
  variable: "--font-google-sans",
  subsets: ["latin"],
});

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage-grotesque",
  subsets: ["latin"],
});

const varelaRound = Varela_Round({
  variable: "--font-varela-round",
  subsets: ["latin"],
  weight: "400",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: "400",
});

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: "400",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
  title: "Tempahan Bilik | IPGKTB",
  description:
    "Tempah bilik pembelajaran, makmal dan kemudahan di IPGKTB dengan mudah. Pilih bilik, tarikh dan slot masa yang tersedia secara dalam talian.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`
  ${inter.variable}
  ${figtree.variable}
  ${hankenGrotesk.variable}
  ${geistSans.variable}
  ${geistMono.variable}
  ${dmSans.variable}
  ${publicSans.variable}
  ${googleSans.variable}
  ${bricolageGrotesque.variable}
  ${varelaRound.variable}
  ${fraunces.variable}
  ${ibmPlexMono.variable}
  ${fredoka.variable}
  ${jetbrainsMono.variable}
  ${instrumentSans.variable}
  ${poppins.variable}
  ${manrope.variable}
  h-full
  antialiased
`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem("app-theme");
                if (theme === "orange") {
                  document.documentElement.dataset.theme = "orange";
                }
              } catch {}
            `,
          }}
        />
      </head>

      <body className="min-h-full flex flex-col">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
