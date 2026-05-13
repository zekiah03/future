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
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "52px 28px" }}>
        <div className="label-eyebrow">Loading…</div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "52px 28px 80px" }}>
      <div className="fsi" style={{ animationDelay: "0.04s", marginBottom: 40 }}>
        <div className="label-eyebrow" style={{ marginBottom: 14 }}>
          Timeline · これまでの未来
        </div>
        <h1 className="h-title" style={{ margin: "0 0 14px 0" }}>
          記録された分岐の系譜
        </h1>
        <p className="body-soft" style={{ maxWidth: 440 }}>
          ここに残された予測は、いつかの自分が選んだ未来の輪郭。<br />
          時間が経つと、外れた距離が自分の動いた距離になる。
        </p>
      </div>

      {readings.length === 0 ? (
        <div
          className="glass-card fsi"
          style={{ padding: "40px 28px", textAlign: "center", animationDelay: "0.16s" }}
        >
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 18 }}>
            まだ、視た未来がない
          </div>
          <Link href="/predict" className="btn-primary">
            最初の現在地を置く →
          </Link>
        </div>
      ) : (
        <div style={{ display: "grid", gap: 10 }}>
          {readings.map((r, i) => {
            const date = new Date(r.createdAt);
            const horizonLabel = HORIZONS.find((h) => h.key === r.horizon)?.jp || r.horizon;
            const modeLabel = MODES.find((m) => m.key === r.mode)?.jp || r.mode;
            const top = [...r.result.scenarios].sort((a, b) => b.probability - a.probability)[0];
            return (
              <div
                key={r.id}
                className="glass-card fsi"
                style={{
                  padding: 22,
                  animationDelay: `${0.16 + i * 0.05}s`,
                  display: "flex",
                  gap: 18,
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    minWidth: 56,
                    paddingTop: 2,
                    borderRight: "1px solid rgba(255,255,255,0.06)",
                    paddingRight: 16,
                  }}
                >
                  <div
                    className="mono"
                    style={{
                      fontSize: 22,
                      fontWeight: 200,
                      color: "rgba(255,255,255,0.85)",
                      lineHeight: 1,
                    }}
                  >
                    {String(date.getDate()).padStart(2, "0")}
                  </div>
                  <div
                    className="mono"
                    style={{
                      fontSize: 9,
                      color: "rgba(255,255,255,0.35)",
                      letterSpacing: "0.18em",
                      marginTop: 4,
                    }}
                  >
                    {date.toLocaleString("ja-JP", { year: "2-digit", month: "2-digit" }).replace(/\//g, ".")}
                  </div>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      display: "flex",
                      gap: 8,
                      marginBottom: 8,
                      flexWrap: "wrap",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 10,
                        padding: "3px 9px",
                        borderRadius: 999,
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "rgba(255,255,255,0.6)",
                      }}
                    >
                      {horizonLabel}
                    </span>
                    <span
                      style={{
                        fontSize: 10,
                        padding: "3px 9px",
                        borderRadius: 999,
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "rgba(255,255,255,0.6)",
                      }}
                    >
                      {modeLabel}
                    </span>
                    <span
                      className="mono"
                      style={{
                        fontSize: 10,
                        color: "rgba(255,255,255,0.32)",
                        letterSpacing: "0.14em",
                        padding: "3px 0",
                      }}
                    >
                      {top.branch} · {top.probability}%
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: "rgba(255,255,255,0.78)",
                      marginBottom: 8,
                      lineHeight: 1.65,
                      fontWeight: 300,
                    }}
                  >
                    {r.result.oneSentence}
                  </div>
                  {r.intent && (
                    <div
                      style={{
                        fontSize: 11,
                        color: "rgba(255,255,255,0.35)",
                        lineHeight: 1.7,
                        marginBottom: 10,
                        borderLeft: "2px solid rgba(255,255,255,0.08)",
                        paddingLeft: 10,
                      }}
                    >
                      {r.intent}
                    </div>
                  )}
                  <div style={{ display: "flex", gap: 14, marginTop: 6 }}>
                    <Link
                      href={`/result?id=${r.id}`}
                      style={{
                        fontSize: 11,
                        color: "rgba(255,255,255,0.55)",
                        letterSpacing: "0.1em",
                      }}
                    >
                      開く →
                    </Link>
                    <button
                      onClick={() => {
                        if (confirm("この予測を削除しますか?")) {
                          deleteReading(r.id);
                          refresh();
                        }
                      }}
                      style={{
                        fontSize: 11,
                        color: "rgba(255,255,255,0.22)",
                        letterSpacing: "0.1em",
                        cursor: "pointer",
                      }}
                    >
                      消す
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
