"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type Item = {
  href: string;
  label: string;
  sub: string;
  icon: ReactNode;
};

const items: Item[] = [
  {
    href: "/",
    label: "Home",
    sub: "ハブ",
    icon: (
      <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round">
        <path d="M2 7.5L8 2L14 7.5V14H10.5V10H5.5V14H2V7.5Z" />
      </svg>
    ),
  },
  {
    href: "/predict",
    label: "Predict",
    sub: "現在地",
    icon: (
      <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3">
        <circle cx="8" cy="8" r="5.5" />
        <circle cx="8" cy="8" r="2" />
        <line x1="8" y1="2.5" x2="8" y2="6" />
        <line x1="8" y1="10" x2="8" y2="13.5" />
        <line x1="2.5" y1="8" x2="6" y2="8" />
        <line x1="10" y1="8" x2="13.5" y2="8" />
      </svg>
    ),
  },
  {
    href: "/result",
    label: "Result",
    sub: "未来",
    icon: (
      <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3">
        <circle cx="8" cy="8" r="5.8" />
        <path d="M8 4.5 V8 L10.5 9.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: "/timeline",
    label: "Timeline",
    sub: "履歴",
    icon: (
      <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
        <line x1="3" y1="3.5" x2="13" y2="3.5" />
        <line x1="3" y1="8" x2="13" y2="8" />
        <line x1="3" y1="12.5" x2="13" y2="12.5" />
        <circle cx="5" cy="3.5" r="1.4" fill="currentColor" stroke="none" />
        <circle cx="10" cy="8" r="1.4" fill="currentColor" stroke="none" />
        <circle cx="7" cy="12.5" r="1.4" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    href: "/theory",
    label: "Theory",
    sub: "理論",
    icon: (
      <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3">
        <circle cx="8" cy="8" r="5.8" />
        <circle cx="8" cy="8" r="3" />
        <circle cx="8" cy="8" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

export default function Sidebar() {
  const path = usePathname();
  return (
    <aside
      className="sidebar fsi"
      style={{
        width: 200,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "rgba(255,255,255,0.02)",
        borderRight: "1px solid rgba(255,255,255,0.07)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        position: "relative",
        zIndex: 20,
      }}
    >
      <div style={{ padding: "26px 16px 20px", overflow: "hidden" }}>
        <div
          className="sidebar-label"
          style={{
            fontSize: 9,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.2)",
            marginBottom: 8,
            whiteSpace: "nowrap",
          }}
        >
          Solnova Lab
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: 6,
              border: "1px solid rgba(255,255,255,0.22)",
              boxShadow: "0 0 12px rgba(255,255,255,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <circle cx="5" cy="5" r="3.2" stroke="rgba(255,255,255,0.55)" strokeWidth="1" fill="none" />
              <circle cx="5" cy="5" r="1" fill="rgba(255,255,255,0.7)" />
            </svg>
          </div>
          <span
            className="sidebar-label"
            style={{
              fontSize: 15,
              fontWeight: 300,
              color: "rgba(255,255,255,0.7)",
              letterSpacing: "0.06em",
              whiteSpace: "nowrap",
            }}
          >
            Future
          </span>
        </div>
      </div>

      <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "0 12px 10px" }} />

      <nav style={{ flex: 1, padding: "4px 0", overflowY: "auto" }}>
        {items.map((it, i) => {
          const active = path === it.href;
          return (
            <Link
              key={it.href}
              href={it.href}
              className="snav"
              style={{
                color: active ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.32)",
                background: active ? "rgba(255,255,255,0.06)" : "transparent",
                boxShadow: active ? "inset 0 0 0 1px rgba(255,255,255,0.1), 0 0 20px rgba(255,255,255,0.04)" : "none",
                animationDelay: `${0.08 + i * 0.06}s`,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: -8,
                  top: "20%",
                  height: "60%",
                  width: 2.5,
                  borderRadius: 2,
                  background: active ? "#fff" : "transparent",
                  boxShadow: active ? "0 0 8px rgba(255,255,255,0.9), 0 0 18px rgba(255,255,255,0.5)" : "none",
                  transition: "all 0.25s ease",
                }}
              />
              <span
                style={{
                  color: active ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.22)",
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 18,
                }}
              >
                {it.icon}
              </span>
              <div className="sidebar-label" style={{ overflow: "hidden", whiteSpace: "nowrap" }}>
                <div style={{ fontSize: 13, fontWeight: active ? 500 : 400, letterSpacing: "0.02em", lineHeight: 1.2 }}>
                  {it.label}
                </div>
                <div style={{ fontSize: 9, color: "rgba(255,255,255,0.45)", letterSpacing: "0.08em", marginTop: 2 }}>
                  {it.sub}
                </div>
              </div>
            </Link>
          );
        })}
      </nav>

      <div
        className="sidebar-label"
        style={{
          padding: "14px 18px 22px",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div style={{ fontSize: 9, color: "rgba(255,255,255,0.14)", letterSpacing: "0.2em", textTransform: "uppercase" }}>
          FUTURE v0.1
        </div>
        <div style={{ fontSize: 9, color: "rgba(255,255,255,0.08)", marginTop: 3 }}>
          Predictor · 13軸
        </div>
      </div>
    </aside>
  );
}
