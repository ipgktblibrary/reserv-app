import type { Metadata } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/themes/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
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
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
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
