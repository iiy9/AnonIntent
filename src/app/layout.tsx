import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AnonIntent — Privacy-first, intent-centric demo on Anoma",
  description: "Demo of anonymous intent submission, privacy-preserving aggregation, and coordination on Anoma.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="w-full border-b border-black/10 dark:border-white/10 bg-gradient-to-b from-black/[0.03] to-transparent dark:from-white/[0.05]">
          <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
            <div className="text-xl font-semibold tracking-tight">AnonIntent</div>
            <nav className="flex items-center gap-6 text-sm opacity-90">
              <a href="#app" className="hover:underline">App</a>
              <a href="#features" className="hover:underline">Features</a>
              <a href="#goals" className="hover:underline">Demo Goals</a>
            </nav>
          </div>
        </header>
        {children}
        <footer className="w-full border-t border-black/10 dark:border-white/10 mt-16">
          <div className="mx-auto max-w-6xl px-6 py-6 text-sm flex items-center justify-between">
            <span>© {new Date().getFullYear()} AnonIntent</span>
            <a
              href="https://discord.com/users/.iiy"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#5865F2] text-white shadow hover:opacity-90"
            >
              <span>Discord</span>
              <span className="opacity-90">@.iiy</span>
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
