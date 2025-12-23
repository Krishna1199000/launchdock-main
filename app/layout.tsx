import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://launchdock.me"),
  title: {
    default: "LaunchDock – SaaS & Product Engineering Studio",
    template: "%s | LaunchDock",
  },
  description:
    "LaunchDock is an end-to-end product engineering studio helping SaaS founders and businesses design, build, and launch high-converting web & app experiences.",
  keywords: [
    "LaunchDock",
    "SaaS development agency",
    "product studio",
    "web app development",
    "Next.js agency",
    "startup product team",
  ],
  openGraph: {
    title: "LaunchDock – Build and Launch Exceptional SaaS Products",
    description:
      "Strategy, design, and development for SaaS and product teams. From idea to launch and beyond.",
    url: "https://launchdock.me",
    siteName: "LaunchDock",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LaunchDock – SaaS & Product Engineering Studio",
    description:
      "Modern, conversion-focused product development for SaaS startups and businesses.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${spaceGrotesk.variable} antialiased`}
      >
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
