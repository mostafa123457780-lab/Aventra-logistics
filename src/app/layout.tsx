import type { Metadata } from "next";
import { Tajawal, Big_Shoulders_Display, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { createClient } from "@/lib/supabase/server";

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700", "800", "900"],
  variable: "--font-tajawal",
  display: "swap",
});

const bigShoulders = Big_Shoulders_Display({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-bigshoulders",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plexmono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AVENTRA Logistics — شريكك في الشحن واللوجستيات",
  description:
    "شحن بحري وجوي وبري مع تتبع لحظي وتخزين مرتبط بنظام واحد. اطلب عرض سعر أو تابع شحنتك الآن.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  return (
    <html lang="ar" dir="rtl" className={`${tajawal.variable} ${bigShoulders.variable} ${plexMono.variable}`}>
      <body className="antialiased font-sans">
        <Header isLoggedIn={!!data.user} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
