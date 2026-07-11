import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Providers from "@/components/providers";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DevOS - The Operating System for Developers",
  description:
    "An all-in-one developer workspace dashboard combining GitHub Analytics, LeetCode Trackers, Projects Kanban, AI Mentoring, Tasks, Notes, and Jobs Trackers.",
  keywords: [
    "developer dashboard",
    "developer workspace",
    "github analytics",
    "leetcode tracker",
    "resume ats analyzer",
    "tasks kanban",
    "developer journal",
    "coding calendar"
  ],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://devos-amber.vercel.app",
  },
  openGraph: {
    title: "DevOS - The Operating System for Developers",
    description:
      "All-in-one dashboard for GitHub stats, LeetCode tracker, Kanban boards, Resume ATS analyzer, and job pipelines.",
    type: "website",
    url: "https://devos-amber.vercel.app",
    siteName: "DevOS",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevOS - The Operating System for Developers",
    description: "An all-in-one developer workspace dashboard.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${robotoMono.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-background text-foreground font-sans antialiased flex flex-col">
        <Providers>{children}</Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
