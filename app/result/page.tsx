"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { AXES, HORIZONS, MODES, type Reading } from "@/lib/types";
import { getLatestId, getReading } from "@/lib/storage";

function ResultInner() {
  const params = useSearchParams();
  const id = params.get("id");
  const [reading, setReading] = useState<Reading | null | "loading">("loading");

  useEffect(() => {
    const target = id || getLatestId();
    if (!target) {
      setReading(null);
      return;
    }
    setReading(getReading(target));
  }, [id]);

  if (reading === "loading") {
    return (
      <div style={{ padding: "clamp(60px, 8vw, 120px) clamp(20px, 5vw, 64px)" }}>
        <div className="mono" style={{ fontSize: 11, letterSpacing: "0.28em", color: "var(--fg-mid)" }}>
          LOADING…
        </div>
      </div>
    );
  }

  if (!reading) {
    return (
      <div style={{ padding: "clamp(60px, 8vw, 120px) clamp(20px, 5vw, 64px)" }}>
        <div className="mono rise" style={{ fontSize: 10, letterSpacing: "0.28em", color: "var(--fg-mid)", marginBottom: 22 }}>
          ▸ STAGE 02 · RESULT
        </div>
        <h1 className="display rise" style={{ fontSize: "clamp(44px, 10vw, 120px)", animationDelay: "0.08s" }}>
          NO FUTURE
          <br />
          YET
        </h1>
        <p className="serif rise" style={{ marginTop: 24, fontSize: 18, color: "var(--fg-mid)", lineHeight: 1.8, animationDelay: "0.18s" }}>
          最初の現在地を、まだ置いていない。
          <br />
          ツインは、いまの輪郭が無いと現れない。
        </p>
        <div style={{ marginTop: 40 }}>
          <Link href="/predict" className="btn-fill">
            ▸ Predict the Future
          </Link>
        </div>
      </div>
    );
  }

  const { result, axes, horizon, mode, intent, createdAt } = reading;
  const horizonLabel = HORIZONS.find((h) => h.key === horizon)?.jp || horizon;
  const horizonEn = HORIZONS.find((h) => h.key === horizon)?.label || horizon;
  const modeLabel = MODES.find((m) => m.key === mode)?.jp || mode;
  const modeEn = MODES.find((m) => m.key === mode)?.label || mode;
  const date = new Date(createdAt);
  const dateStr = date
    .toLocaleString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
    .replace(/\//g, ".");

  return (
    <div>
      <section
        style={{
          padding: "clamp(50px, 7vw, 100px) clamp(20px, 5vw, 64px) clamp(36px, 5vw, 70px)",
          borderBottom: "1px solid var(--line)",
        }}
      >
        <div
          className="mono rise"
          style={{
            display: "flex",
            gap: 18,
            alignItems: "baseline",
            flexWrap: "wrap",
            fontSize: 10,
            letterSpacing: "0.26em",
            textTransform: "uppercase",
            color: "var(--fg-mid)",
            marginBottom: 22,
          }}
        >
          <span style={{ color: "var(--accent)" }}>▸ STAGE 02 · RESULT</span>
          <span>{dateStr}</span>
          <span>HORIZON / {horizonEn}</span>
          <span>MODE / {modeEn}</span>
          <span style={{ color: "var(--fg-ghost)" }}>{result.signal}</span>
        </div>

        <div
          className="display rise"
          style={{
            fontSize: "clamp(52px, 14vw, 200px)",
            color: "var(--fg)",
            margin: 0,
            animationDelay: "0.1s",
          }}
        >
          {horizonLabel.toUpperCase()}
        </div>

        <p
          className="serif rise"
          style={{
            marginTop: 36,
            fontSize: "clamp(20px, 2.4vw, 36px)",
            fontWeight: 300,
            lineHeight: 1.55,
            maxWidth: 880,
            color: "var(--fg)",
            letterSpacing: "0.01em",
            animationDelay: "0.2s",
          }}
        >
          {result.oneSentence}
        </p>

        {intent && (
          <div
            className="rise"
            style={{
              marginTop: 36,
              padding: "20px 24px",
              borderLeft: "2px solid var(--accent)",
              maxWidth: 760,
              animationDelay: "0.28s",
            }}
          >
            <div className="mono" style={{ fontSize: 10, letterSpacing: "0.28em", color: "var(--fg-mid)", textTransform: "uppercase", marginBottom: 8 }}>
              Placed Intent
            </div>
            <div className="serif" style={{ fontSize: 16, color: "var(--fg)", lineHeight: 1.85, fontWeight: 300 }}>
              {intent}
            </div>
          </div>
        )}
      </section>

      <section style={{ padding: "clamp(50px, 7vw, 100px) clamp(20px, 5vw, 64px)", borderBottom: "1px solid var(--line)" }}>
        <div className="section-title">
          <span className="no">N° 02–A</span>
          <span className="name">3つの分岐</span>
          <span className="name-en">— BRANCH LINEUP</span>
        </div>

        <div style={{ borderTop: "1px solid var(--line)" }}>
          {result.scenarios.map((s, i) => {
            const tone =
              s.branch === "bright"
                ? { jp: "光の分岐", marker: "#FFFFFF", accent: "var(--accent-2)" }
                : s.branch === "median"
                  ? { jp: "中庸の分岐", marker: "rgba(255,255,255,0.6)", accent: "rgba(255,255,255,0.7)" }
                  : { jp: "影の分岐", marker: "rgba(255,255,255,0.3)", accent: "var(--accent)" };
            return (
              <div
                key={s.branch}
                className="rise"
                style={{
                  padding: "44px 0",
                  borderBottom: "1px solid var(--line-ghost)",
                  display: "grid",
                  gridTemplateColumns: "minmax(0, 120px) 1fr minmax(0, 320px)",
                  gap: "clamp(20px, 3vw, 56px)",
                  alignItems: "start",
                  animationDelay: `${0.14 + i * 0.1}s`,
                }}
              >
                <div>
                  <div
                    className="display"
                    style={{
                      fontSize: 64,
                      lineHeight: 1,
                      color: "var(--fg)",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div
                    style={{
                      marginTop: 14,
                      display: "inline-block",
                      width: 28,
                      height: 8,
                      background: tone.marker,
                    }}
                  />
                </div>

                <div style={{ minWidth: 0 }}>
                  <div
                    className="mono"
                    style={{
                      fontSize: 11,
                      letterSpacing: "0.28em",
                      textTransform: "uppercase",
                      color: tone.accent,
                      marginBottom: 8,
                    }}
                  >
                    {s.title}
                  </div>
                  <div
                    className="serif"
                    style={{
                      fontSize: "clamp(28px, 4.5vw, 56px)",
                      fontWeight: 500,
                      lineHeight: 1.2,
                      color: "var(--fg)",
                      marginBottom: 18,
                      letterSpacing: "0.01em",
                    }}
                  >
                    {tone.jp}
                  </div>
                  <p style={{ fontSize: 14, lineHeight: 1.95, color: "var(--fg-mid)", maxWidth: 640, marginBottom: 24 }}>
                    {s.narrative}
                  </p>
                  <div style={{ display: "grid", gap: 14, maxWidth: 640 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "100px 1fr", gap: 16, alignItems: "baseline" }}>
                      <div className="mono" style={{ fontSize: 10, letterSpacing: "0.28em", color: "var(--fg-mid)" }}>
                        TURN
                      </div>
                      <div style={{ fontSize: 13, color: "var(--fg)", lineHeight: 1.85 }}>{s.turningPoint}</div>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "100px 1fr", gap: 16, alignItems: "baseline" }}>
                      <div className="mono" style={{ fontSize: 10, letterSpacing: "0.28em", color: "var(--fg-mid)" }}>
                        KEY
                      </div>
                      <div
                        className="serif"
                        style={{
                          fontSize: 14,
                          color: "var(--fg-mid)",
                          lineHeight: 1.85,
                          fontStyle: "italic",
                          fontWeight: 300,
                        }}
                      >
                        {s.oneLine}
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: "right" }}>
                  <div className="mono" style={{ fontSize: 10, letterSpacing: "0.28em", color: "var(--fg-mid)", textTransform: "uppercase" }}>
                    PROBABILITY
                  </div>
                  <div
                    className="display"
                    style={{
                      fontSize: "clamp(64px, 9vw, 130px)",
                      color: tone.accent,
                      lineHeight: 0.9,
                      marginTop: 8,
                    }}
                  >
                    {s.probability}
                    <span style={{ fontSize: "0.4em", marginLeft: 6, color: "var(--fg-mid)" }}>%</span>
                  </div>
                  <div
                    style={{
                      marginTop: 14,
                      height: 4,
                      background: "var(--line-ghost)",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: `${s.probability}%`,
                        background: tone.accent,
                        marginLeft: `${100 - s.probability}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section style={{ padding: "clamp(50px, 7vw, 100px) clamp(20px, 5vw, 64px)", borderBottom: "1px solid var(--line)" }}>
        <div className="section-title">
          <span className="no">N° 02–B</span>
          <span className="name">13軸の推移</span>
          <span className="name-en">— AXIS DRIFT</span>
        </div>

        <div style={{ display: "grid", gap: 0, borderTop: "1px solid var(--line)" }}>
          {result.axisOutlooks.map((o, i) => {
            const ax = AXES.find((a) => a.key === o.key);
            const now = axes[o.key];
            const delta = o.trend - now;
            const dir = delta > 3 ? "↑" : delta < -3 ? "↓" : "→";
            const dirColor = delta > 3 ? "var(--fg)" : delta < -3 ? "var(--accent)" : "var(--fg-mid)";
            return (
              <div
                key={o.key}
                className="rise"
                style={{
                  display: "grid",
                  gridTemplateColumns: "60px 110px 1fr 80px",
                  alignItems: "center",
                  gap: 20,
                  padding: "22px 0",
                  borderBottom: "1px solid var(--line-ghost)",
                  animationDelay: `${0.08 + i * 0.04}s`,
                }}
              >
                <div className="mono" style={{ fontSize: 10, color: "var(--fg-ghost)", letterSpacing: "0.22em" }}>
                  AX/{String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <div className="serif" style={{ fontSize: 22, fontWeight: 500, lineHeight: 1 }}>{ax?.jp}</div>
                  <div className="mono" style={{ fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--fg-ghost)", marginTop: 4 }}>
                    {ax?.label}
                  </div>
                </div>
                <div>
                  <div style={{ position: "relative", height: 2, background: "var(--line-ghost)" }}>
                    <div
                      style={{
                        position: "absolute",
                        height: 2,
                        left: `${Math.min(now, o.trend)}%`,
                        width: `${Math.abs(o.trend - now)}%`,
                        background: delta >= 0 ? "var(--fg)" : "var(--accent)",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        left: `calc(${now}% - 2px)`,
                        top: -4,
                        width: 4,
                        height: 10,
                        background: "var(--fg-mid)",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        left: `calc(${o.trend}% - 3px)`,
                        top: -5,
                        width: 6,
                        height: 12,
                        background: delta >= 0 ? "var(--fg)" : "var(--accent)",
                      }}
                    />
                  </div>
                  <div style={{ fontSize: 11, color: "var(--fg-low)", marginTop: 10, lineHeight: 1.7 }}>{o.note}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div className="mono" style={{ fontSize: 10, color: "var(--fg-mid)" }}>
                    {String(now).padStart(2, "0")}
                    <span style={{ color: dirColor, margin: "0 6px" }}>{dir}</span>
                  </div>
                  <div className="display" style={{ fontSize: 28, color: dirColor, lineHeight: 1, marginTop: 4 }}>
                    {String(o.trend).padStart(2, "0")}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section
        style={{
          padding: "clamp(60px, 8vw, 120px) clamp(20px, 5vw, 64px)",
          borderBottom: "1px solid var(--line)",
          textAlign: "center",
        }}
      >
        <div className="eyebrow rise" style={{ marginBottom: 26 }}>
          Twin Whisper · 終幕の一行
        </div>
        <p
          className="serif rise"
          style={{
            fontSize: "clamp(22px, 3vw, 38px)",
            fontWeight: 300,
            lineHeight: 1.6,
            maxWidth: 920,
            margin: "0 auto",
            color: "var(--fg)",
            letterSpacing: "0.02em",
            animationDelay: "0.12s",
          }}
        >
          {result.whisper}
        </p>
      </section>

      <section
        style={{
          padding: "clamp(36px, 5vw, 60px) clamp(20px, 5vw, 64px)",
          display: "flex",
          gap: 14,
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <Link href="/predict" className="btn-line">
          ↻ Predict again
        </Link>
        <Link href="/timeline" className="btn-fill">
          ▸ Timeline
        </Link>
      </section>
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={null}>
      <ResultInner />
    </Suspense>
  );
}
