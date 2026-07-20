import type { Metadata } from "next";
import { Tajawal, Big_Shoulders, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-tajawal",
});
const bigShoulders = Big_Shoulders_Display({ subsets: ["latin"], variable: "--Big_Shoulders" });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-plex-mono" });

export const metadata: Metadata = {
  title: "AVENTRA Logistics",
  description: "تابع شحناتك وفواتيرك مع نظام واحد متكامل لإدارة الشحن واللوجستيات.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`${tajawal.variable} ${bigShoulders.variable} ${plexMono.variable}`}>
      <body className="antialiased font-sans bg-paper text-ink">{children}</body>
    </html>
  );
}
