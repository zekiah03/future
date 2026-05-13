"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { HORIZONS, MODES, type Reading } from "@/lib/types";
import { deleteReading, loadReadings } from "@/lib/storage";

export default function TimelinePage() {
  const [readings, setReadings] = useState<Reading[] | "loading">("loading");

  useEffect(() => {
    setReadings(loadReadings());
  }, []);

  const refresh = () => setReadings(loadReadings());

  if (readings === "loading") {
    return (
      <div style={{ padding: "clamp(60px, 8vw, 120px) clamp(20px, 5vw, 64px)" }}>
        <div className="mono" style={{ fontSize: 11, letterSpacing: "0.28em", color: "var(--fg-mid)" }}>
          LOADING…
        </div>
      </div>
    );
  }

  return (
    <div>
      <section
        style={{
          padding: "clamp(50px, 7vw, 100px) clamp(20px, 5vw, 64px)",
          borderBottom: "1px solid var(--line)",
        }}
      >
        <div className="mono rise" style={{ fontSize: 10, letterSpacing: "0.28em", color: "var(--fg-mid)", marginBottom: 22 }}>
          ▸ STAGE 03 · ARCHIVE
        </div>
        <h1 className="display rise" style={{ fontSize: "clamp(44px, 11vw, 140px)", animationDelay: "0.08s" }}>
          TIMELINE
        </h1>
        <p
          className="serif rise"
          style={{
            marginTop: 26,
            fontSize: "clamp(15px, 1.5vw, 20px)",
            color: "var(--fg-mid)",
            lineHeight: 1.85,
            maxWidth: 580,
            fontWeight: 300,
            animationDelay: "0.18s",
          }}
        >
          記録された分岐の系譜。
          時間が経つと、外れた距離が自分の動いた距離になる。
        </p>
      </section>

      <section style={{ padding: "clamp(40px, 5vw, 70px) clamp(20px, 5vw, 64px)" }}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            paddingBottom: 18,
            borderBottom: "1px solid var(--line)",
            marginBottom: 0,
          }}
        >
          <div className="mono" style={{ fontSize: 11, letterSpacing: "0.28em", color: "var(--fg-mid)", textTransform: "uppercase" }}>
            Entries — {readings.length}
          </div>
          <Link href="/predict" className="mono" style={{ fontSize: 11, letterSpacing: "0.28em", color: "var(--fg)" }}>
            + NEW READING ▸
          </Link>
        </div>

        {readings.length === 0 ? (
          <div
            style={{
              padding: "80px 0",
              textAlign: "center",
              borderBottom: "1px solid var(--line-ghost)",
            }}
          >
            <div className="serif" style={{ fontSize: 28, fontWeight: 300, color: "var(--fg-mid)", marginBottom: 24 }}>
              まだ、視た未来がない
            </div>
            <Link href="/predict" className="btn-fill">
              ▸ Place your first reading
            </Link>
          </div>
        ) : (
          <div>
            {readings.map((r, i) => {
              const date = new Date(r.createdAt);
              const horizonLabel = HORIZONS.find((h) => h.key === r.horizon)?.jp || r.horizon;
              const horizonEn = HORIZONS.find((h) => h.key === r.horizon)?.label || r.horizon;
              const modeLabel = MODES.find((m) => m.key === r.mode)?.jp || r.mode;
              const top = [...r.result.scenarios].sort((a, b) => b.probability - a.probability)[0];
              const topAccent =
                top.branch === "bright"
                  ? "var(--accent-2)"
                  : top.branch === "shadow"
                    ? "var(--accent)"
                    : "var(--fg)";
              return (
                <div
                  key={r.id}
                  className="rise"
                  style={{
                    padding: "32px 0",
                    borderBottom: "1px solid var(--line-ghost)",
                    display: "grid",
                    gridTemplateColumns: "minmax(0, 120px) 1fr minmax(0, 220px)",
                    gap: "clamp(20px, 3vw, 56px)",
                    alignItems: "start",
                    animationDelay: `${0.06 + i * 0.05}s`,
                  }}
                >
                  <div>
                    <div className="display" style={{ fontSize: 56, lineHeight: 1 }}>
                      {String(date.getDate()).padStart(2, "0")}
                    </div>
                    <div
                      className="mono"
                      style={{
                        fontSize: 10,
                        letterSpacing: "0.24em",
                        textTransform: "uppercase",
                        color: "var(--fg-ghost)",
                        marginTop: 10,
                      }}
                    >
                      {date
                        .toLocaleString("ja-JP", { year: "2-digit", month: "2-digit" })
                        .replace(/\//g, ".")}
                    </div>
                  </div>

                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: "flex", gap: 14, marginBottom: 14, flexWrap: "wrap" }}>
                      <span
                        className="mono"
                        style={{
                          fontSize: 10,
                          letterSpacing: "0.24em",
                          textTransform: "uppercase",
                          color: "var(--fg-mid)",
                          padding: "4px 10px",
                          border: "1px solid var(--line-ghost)",
                        }}
                      >
                        {horizonEn} · {horizonLabel}
                      </span>
                      <span
                        className="mono"
                        style={{
                          fontSize: 10,
                          letterSpacing: "0.24em",
                          textTransform: "uppercase",
                          color: "var(--fg-mid)",
                          padding: "4px 10px",
                          border: "1px solid var(--line-ghost)",
                        }}
                      >
                        {modeLabel}
                      </span>
                      <span
                        className="mono"
                        style={{
                          fontSize: 10,
                          letterSpacing: "0.24em",
                          textTransform: "uppercase",
                          color: topAccent,
                          padding: "4px 10px",
                          border: `1px solid ${topAccent}`,
                        }}
                      >
                        {top.branch} · {top.probability}%
                      </span>
                    </div>
                    <div
                      className="serif"
                      style={{
                        fontSize: "clamp(18px, 2vw, 26px)",
                        fontWeight: 500,
                        lineHeight: 1.5,
                        color: "var(--fg)",
                        marginBottom: 12,
                      }}
                    >
                      {r.result.oneSentence}
                    </div>
                    {r.intent && (
                      <div
                        style={{
                          borderLeft: "2px solid var(--line-ghost)",
                          paddingLeft: 14,
                          fontSize: 12,
                          color: "var(--fg-low)",
                          lineHeight: 1.7,
                        }}
                      >
                        {r.intent}
                      </div>
                    )}
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "flex-end" }}>
                    <Link
                      href={`/result?id=${r.id}`}
                      className="mono"
                      style={{
                        fontSize: 11,
                        letterSpacing: "0.24em",
                        color: "var(--fg)",
                        borderBottom: "1px solid var(--fg)",
                        paddingBottom: 4,
                      }}
                    >
                      OPEN ▸
                    </Link>
                    <button
                      onClick={() => {
                        if (confirm("この予測を削除しますか?")) {
                          deleteReading(r.id);
                          refresh();
                        }
                      }}
                      className="mono"
                      style={{
                        fontSize: 10,
                        letterSpacing: "0.24em",
                        color: "var(--fg-ghost)",
                        cursor: "pointer",
                      }}
                    >
                      DELETE
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
