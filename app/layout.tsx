import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import FogBackground from "@/components/FogBackground";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Future · Solnova Lab",
  description: "未来の自分を、いま視にいく。デジタルツインで未来を読み解く実験。",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={inter.variable}>
      <body>
        <FogBackground />
        <div style={{ display: "flex", height: "100vh", position: "relative", zIndex: 1 }}>
          <Sidebar />
          <main
            style={{
              flex: 1,
              overflowY: "auto",
              overflowX: "hidden",
              height: "100%",
            }}
          >
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
