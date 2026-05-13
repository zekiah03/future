import type { Metadata, Viewport } from "next";
import { Archivo_Black, Inter, JetBrains_Mono, Noto_Serif_JP } from "next/font/google";
import "./globals.css";
import TopNav from "@/components/TopNav";
import StageBackground from "@/components/StageBackground";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const display = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const serif = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["300", "500", "700"],
  variable: "--font-serif",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FUTURE — Predictor Lineup",
  description: "Future / 未来予測アプリ — 13の現在地から、ありうる輪郭をラインナップする。",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`${inter.variable} ${display.variable} ${serif.variable} ${mono.variable}`}>
      <body>
        <StageBackground />
        <div style={{ position: "relative", zIndex: 1, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
          <TopNav />
          <main style={{ flex: 1, width: "100%" }}>{children}</main>
          <footer
            style={{
              borderTop: "1px solid var(--line)",
              padding: "28px clamp(20px, 5vw, 64px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <div className="mono" style={{ fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--fg-mid)" }}>
              FUTURE · 2026 — SOLNOVA LAB
            </div>
            <div className="mono" style={{ fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--fg-ghost)" }}>
              13 AXIS / 4 HORIZONS / 3 BRANCHES
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
