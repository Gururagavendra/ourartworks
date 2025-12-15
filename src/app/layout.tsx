import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Our Art Works - Custom Frames, Crafted for Your Moments",
  description: "Premium handcrafted photo frames, customized to perfection. Made in India with love.",
  keywords: ["photo frames", "custom frames", "handcrafted frames", "India", "Our Art Works"],
  authors: [{ name: "Our Art Works" }],
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Our Art Works - Custom Frames, Crafted for Your Moments",
    description: "Premium handcrafted photo frames, customized to perfection. Made in India with love.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
