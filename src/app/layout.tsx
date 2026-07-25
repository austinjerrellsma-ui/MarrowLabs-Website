import type { Metadata } from "next";
import { Geist, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://marrowlabs.dev"),
  title: {
    default: "MarrowLabs — BONELAB Modding Studio",
    template: "%s | MarrowLabs",
  },
  description:
    "MarrowLabs builds MarrowLink, the definitive BONELAB power mod, the Hub desktop manager, and Marrow Studio — a node-graph editor for creating your own powers.",
  openGraph: {
    title: "MarrowLabs",
    description:
      "The team behind MarrowLink, Hub, and Marrow Studio for BONELAB.",
    url: "https://marrowlabs.dev",
    siteName: "MarrowLabs",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MarrowLabs",
    description:
      "The team behind MarrowLink, Hub, and Marrow Studio for BONELAB.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${spaceGrotesk.variable} dark scroll-smooth`}
    >
      <body className="relative min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1 relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
