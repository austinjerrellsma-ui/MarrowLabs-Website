import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";

const nasalization = localFont({
  src: "../fonts/Nasalization-Rg.woff2",
  variable: "--font-nasalization",
  display: "swap",
  weight: "400",
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
    <html lang="en" className={`${nasalization.variable} dark scroll-smooth`}>
      <body className={`${nasalization.className} relative min-h-screen flex flex-col`}>
        <Nav />
        <main className="flex-1 relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
