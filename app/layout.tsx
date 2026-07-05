import type { Metadata } from "next";
import { Poppins, Archivo } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

// Secondary brand typeface — body copy and subheadings (Brand Guidelines 2026).
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
});

// Stand-in for Halyard Display (primary brand typeface, Adobe Fonts licence).
// Swap for the licensed Halyard webfont when available; usage is already
// restricted to large headings and number accents per the guide.
const display = Archivo({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: {
    default: "FIT College | Fitness Courses Australia (RTO 31903)",
    template: "%s | FIT College",
  },
  description:
    "Become a qualified Gym Instructor or Personal Trainer with FIT College — real campuses across Australia, three intakes a year, assessments marked in five business days. RTO 31903.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${poppins.variable} ${display.variable}`}>
      <body className="flex min-h-screen flex-col bg-white font-sans text-brand antialiased">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
