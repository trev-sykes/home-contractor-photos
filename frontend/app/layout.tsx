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
  title: "Home Contractor Photos",
  description:
    "Easily manage and share before/after project photos for home contractors in Orange County. Auto-organized, watermarked, and ready to impress customers.",
  keywords: [
    "home contractor photos",
    "before after photos",
    "project management",
    "photo organizer",
    "contractor portfolio",
    "HVAC",
    "plumbers",
    "painters",
    "electricians",
  ],
  authors: [{ name: "Home Contractor Photos", url: "https://home-contractor-photos.com" }],
  creator: "Home Contractor Photos Team",
  themeColor: "#000000",
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Home Contractor Photos",
    description:
      "Auto-organize, watermark, and share project photos with customers. Before/after comparisons made simple for small contractors.",
    url: "https://home-contractor-photos.com",
    siteName: "Home Contractor Photos",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Home Contractor Photos Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Home Contractor Photos",
    description:
      "Auto-organize, watermark, and share project photos with customers. Before/after comparisons made simple for small contractors.",
    images: ["/og-image.png"],
    creator: "@YourTwitterHandle",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}