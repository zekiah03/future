"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "Home", no: "00" },
  { href: "/predict", label: "Predict", no: "01" },
  { href: "/result", label: "Result", no: "02" },
  { href: "/timeline", label: "Timeline", no: "03" },
  { href: "/theory", label: "Theory", no: "04" },
];

export default function TopNav() {
  const path = usePathname();
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 30,
        background: "rgba(0,0,0,0.78)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "18px clamp(20px, 5vw, 64px)",
          gap: 28,
        }}
      >
        <Link
          href="/"
          style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}
        >
          <span
            style={{
              display: "inline-block",
              width: 8,
              height: 8,
              background: "var(--accent)",
            }}
          />
          <span
            className="display"
            style={{
              fontSize: 18,
              letterSpacing: "-0.01em",
              lineHeight: 1,
              whiteSpace: "nowrap",
            }}
          >
            FUTURE
          </span>
          <span
            className="mono"
            style={{
              fontSize: 9,
              color: "var(--fg-mid)",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              borderLeft: "1px solid var(--line-ghost)",
              paddingLeft: 10,
              marginLeft: 4,
              whiteSpace: "nowrap",
            }}
          >
            Predictor Lineup
          </span>
        </Link>

        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            marginLeft: "auto",
            flexWrap: "wrap",
          }}
        >
          {items.map((it) => {
            const active = path === it.href;
            return (
              <Link
                key={it.href}
                href={it.href}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 7,
                  padding: "10px 14px",
                  borderLeft: "1px solid var(--line-ghost)",
                  color: active ? "var(--fg)" : "var(--fg-mid)",
                  background: active ? "rgba(255,255,255,0.03)" : "transparent",
                  transition: "color 0.2s ease, background 0.2s ease",
                  position: "relative",
                }}
              >
                <span
                  className="mono"
                  style={{ fontSize: 10, color: "var(--fg-ghost)", letterSpacing: "0.18em" }}
                >
                  {it.no}
                </span>
                <span
                  className="mono"
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.24em",
                    textTransform: "uppercase",
                  }}
                >
                  {it.label}
                </span>
                {active && (
                  <span
                    style={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      bottom: -1,
                      height: 2,
                      background: "var(--accent)",
                    }}
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
