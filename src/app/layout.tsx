import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "NORTHSTAR — Build Your Own Legend",
    template: "%s | NORTHSTAR",
  },
  description:
    "Life isn't meant to be watched. It's meant to be played. Turn your daily habits, goals, and disciplines into an epic RPG — and become the main character of your own story.",
  keywords: ["self improvement", "gamification", "habits", "goals", "XP", "productivity", "discipline"],
  openGraph: {
    title: "NORTHSTAR — Build Your Own Legend",
    description: "Stop watching others win. Start building yourself.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "NORTHSTAR — Build Your Own Legend",
    description: "Stop watching others win. Start building yourself.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@100;200;300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
