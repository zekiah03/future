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
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "52px 28px" }}>
        <div className="label-eyebrow">Loading…</div>
      </div>
    );
  }

  if (!reading) {
    return (
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "52px 28px" }}>
        <div className="fsi" style={{ animationDelay: "0.04s", marginBottom: 36 }}>
          <div className="label-eyebrow" style={{ marginBottom: 14 }}>
            Result
          </div>
          <h1 className="h-title" style={{ margin: "0 0 14px 0" }}>
            まだ、見るべき未来がない
          </h1>
          <p className="body-soft" style={{ maxWidth: 460 }}>
            最初の現在地を置いてみる。<br />
            未来は、いまの輪郭が無いと現れない。
          </p>
        </div>
        <Link href="/predict" className="btn-primary">
          現在地を置く →
        </Link>
      </div>
    );
  }

  const { result, axes, horizon, mode, intent, createdAt } = reading;
  const horizonLabel = HORIZONS.find((h) => h.key === horizon)?.jp || horizon;
  const modeLabel = MODES.find((m) => m.key === mode)?.jp || mode;
  const date = new Date(createdAt);

  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "52px 28px 80px" }}>
      <div className="fsi" style={{ animationDelay: "0.04s", marginBottom: 28 }}>
        <div className="label-eyebrow" style={{ marginBottom: 14 }}>
          Result · {horizonLabel} · {modeLabel}
        </div>
        <h1 className="h-title" style={{ margin: "0 0 14px 0" }}>
          {result.oneSentence}
        </h1>
        <div
          className="mono"
          style={{ fontSize: 10, color: "rgba(255,255,255,0.32)", letterSpacing: "0.16em" }}
        >
          {result.signal} ·{" "}
          {date.toLocaleString("ja-JP", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>

      {intent && (
        <div
          className="glass-card fsi"
          style={{
            padding: "20px 24px",
            marginBottom: 32,
            animationDelay: "0.12s",
            borderLeft: "2px solid rgba(255,255,255,0.32)",
          }}
        >
          <div className="label-eyebrow" style={{ marginBottom: 8 }}>
            置いた言葉
          </div>
          <div
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.78)",
              lineHeight: 1.75,
              fontWeight: 300,
              letterSpacing: "0.01em",
            }}
          >
            {intent}
          </div>
        </div>
      )}

      <section style={{ marginBottom: 40 }}>
        <div className="label-eyebrow fsi" style={{ marginBottom: 18, animationDelay: "0.2s" }}>
          3つの分岐 · Light · Median · Shadow
        </div>
        <div style={{ display: "grid", gap: 12 }}>
          {result.scenarios.map((s, i) => {
            const tone =
              s.branch === "bright"
                ? { glow: "rgba(255,255,255,0.18)", dot: "rgba(255,255,255,0.92)" }
                : s.branch === "median"
                  ? { glow: "rgba(255,255,255,0.08)", dot: "rgba(255,255,255,0.55)" }
                  : { glow: "rgba(255,255,255,0.04)", dot: "rgba(255,255,255,0.28)" };
            const jpTitle =
              s.branch === "bright" ? "光の分岐" : s.branch === "median" ? "中庸の分岐" : "影の分岐";
            return (
              <div
                key={s.branch}
                className="glass-card fsi"
                style={{
                  padding: 26,
                  animationDelay: `${0.26 + i * 0.08}s`,
                  boxShadow: `inset 0 1px 0 rgba(255,255,255,0.04), 0 8px 32px rgba(0,0,0,0.35), 0 0 32px ${tone.glow}`,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: 14,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: 999,
                        background: tone.dot,
                        boxShadow: `0 0 12px ${tone.dot}`,
                      }}
                    />
                    <div
                      style={{
                        fontSize: 14,
                        color: "rgba(255,255,255,0.88)",
                        letterSpacing: "0.02em",
                      }}
                    >
                      {jpTitle}
                    </div>
                    <div
                      className="mono"
                      style={{
                        fontSize: 10,
                        color: "rgba(255,255,255,0.35)",
                        letterSpacing: "0.18em",
                      }}
                    >
                      {s.title}
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: 4,
                    }}
                  >
                    <span
                      className="mono"
                      style={{
                        fontSize: 22,
                        fontWeight: 300,
                        color: "rgba(255,255,255,0.88)",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {s.probability}
                    </span>
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>%</span>
                  </div>
                </div>

                <div
                  style={{
                    fontSize: 13,
                    color: "rgba(255,255,255,0.62)",
                    lineHeight: 1.85,
                    marginBottom: 14,
                    fontWeight: 300,
                  }}
                >
                  {s.narrative}
                </div>

                <div
                  style={{
                    height: 1,
                    background: "rgba(255,255,255,0.06)",
                    margin: "14px 0",
                  }}
                />

                <div style={{ display: "grid", gap: 10 }}>
                  <div>
                    <div className="label-eyebrow" style={{ marginBottom: 5 }}>
                      転機
                    </div>
                    <div
                      style={{
                        fontSize: 12.5,
                        color: "rgba(255,255,255,0.72)",
                        lineHeight: 1.7,
                      }}
                    >
                      {s.turningPoint}
                    </div>
                  </div>
                  <div>
                    <div className="label-eyebrow" style={{ marginBottom: 5 }}>
                      鍵
                    </div>
                    <div
                      style={{
                        fontSize: 12.5,
                        color: "rgba(255,255,255,0.6)",
                        lineHeight: 1.7,
                        fontStyle: "italic",
                      }}
                    >
                      {s.oneLine}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section style={{ marginBottom: 40 }}>
        <div className="label-eyebrow fsi" style={{ marginBottom: 18, animationDelay: "0.5s" }}>
          13軸の推移 · 現在 → {horizonLabel}
        </div>
        <div
          className="glass-card fsi"
          style={{ padding: 22, animationDelay: "0.54s" }}
        >
          <div style={{ display: "grid", gap: 14 }}>
            {result.axisOutlooks.map((o) => {
              const ax = AXES.find((a) => a.key === o.key);
              const now = axes[o.key];
              const delta = o.trend - now;
              const dir = delta > 3 ? "↗" : delta < -3 ? "↘" : "→";
              const dirColor =
                delta > 3 ? "rgba(255,255,255,0.85)" : delta < -3 ? "rgba(255,255,255,0.38)" : "rgba(255,255,255,0.5)";
              return (
                <div key={o.key}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      justifyContent: "space-between",
                      marginBottom: 6,
                    }}
                  >
                    <div style={{ display: "flex", gap: 10, alignItems: "baseline" }}>
                      <span
                        className="mono"
                        style={{
                          fontSize: 10,
                          color: "rgba(255,255,255,0.42)",
                          letterSpacing: "0.18em",
                          minWidth: 70,
                        }}
                      >
                        {ax?.label}
                      </span>
                      <span style={{ fontSize: 12, color: "rgba(255,255,255,0.72)" }}>{ax?.jp}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                      <span
                        className="mono"
                        style={{ fontSize: 10, color: "rgba(255,255,255,0.32)" }}
                      >
                        {now}
                      </span>
                      <span style={{ color: dirColor, fontSize: 11 }}>{dir}</span>
                      <span
                        className="mono"
                        style={{
                          fontSize: 12,
                          color: "rgba(255,255,255,0.78)",
                          minWidth: 24,
                          textAlign: "right",
                        }}
                      >
                        {o.trend}
                      </span>
                    </div>
                  </div>
                  <div
                    style={{
                      position: "relative",
                      height: 2,
                      background: "rgba(255,255,255,0.05)",
                      borderRadius: 999,
                      marginBottom: 6,
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        left: `${Math.min(now, o.trend)}%`,
                        width: `${Math.abs(o.trend - now)}%`,
                        height: 2,
                        background:
                          delta >= 0
                            ? "linear-gradient(90deg, rgba(255,255,255,0.18), rgba(255,255,255,0.7))"
                            : "linear-gradient(90deg, rgba(255,255,255,0.5), rgba(255,255,255,0.12))",
                        borderRadius: 999,
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        left: `calc(${now}% - 2px)`,
                        top: -2,
                        width: 4,
                        height: 6,
                        background: "rgba(255,255,255,0.32)",
                        borderRadius: 1,
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        left: `calc(${o.trend}% - 3px)`,
                        top: -3,
                        width: 6,
                        height: 8,
                        background: "rgba(255,255,255,0.85)",
                        borderRadius: 2,
                        boxShadow: "0 0 8px rgba(255,255,255,0.4)",
                      }}
                    />
                  </div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.36)", lineHeight: 1.6 }}>
                    {o.note}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div
        className="glass-card fsi"
        style={{
          padding: "24px 28px",
          marginBottom: 28,
          animationDelay: "0.7s",
          textAlign: "center",
        }}
      >
        <div className="label-eyebrow" style={{ marginBottom: 10 }}>
          ツインのささやき
        </div>
        <div
          style={{
            fontSize: 14,
            color: "rgba(255,255,255,0.78)",
            lineHeight: 1.85,
            fontWeight: 300,
            letterSpacing: "0.02em",
          }}
        >
          {result.whisper}
        </div>
      </div>

      <div
        className="fsi"
        style={{
          display: "flex",
          gap: 12,
          justifyContent: "center",
          animationDelay: "0.78s",
        }}
      >
        <Link href="/predict" className="btn-ghost">
          もう一度視る
        </Link>
        <Link href="/timeline" className="btn-ghost">
          Timelineへ →
        </Link>
      </div>
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
