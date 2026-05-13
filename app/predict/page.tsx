"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { AXES, HORIZONS, MODES, type AxisKey, type Horizon, type Mode } from "@/lib/types";
import { predict } from "@/lib/predict";
import { saveReading } from "@/lib/storage";

function initialAxes(): Record<AxisKey, number> {
  return Object.fromEntries(AXES.map((a) => [a.key, 50])) as Record<AxisKey, number>;
}

const stepLabels = [
  { jp: "13軸", en: "AXIS" },
  { jp: "時間軸", en: "HORIZON" },
  { jp: "流れ", en: "MODE" },
  { jp: "言葉", en: "INTENT" },
];

export default function PredictPage() {
  const router = useRouter();
  const [axes, setAxes] = useState<Record<AxisKey, number>>(initialAxes());
  const [horizon, setHorizon] = useState<Horizon>("6m");
  const [mode, setMode] = useState<Mode>("balance");
  const [intent, setIntent] = useState("");
  const [step, setStep] = useState(0);

  const next = () => setStep((s) => Math.min(s + 1, 3));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const submit = () => {
    const result = predict(axes, horizon, mode, intent);
    const reading = {
      id: `r-${Date.now().toString(36)}`,
      createdAt: Date.now(),
      axes,
      horizon,
      mode,
      intent: intent.trim(),
      result,
    };
    saveReading(reading);
    router.push(`/result?id=${reading.id}`);
  };

  return (
    <div>
      <section
        style={{
          padding: "clamp(50px, 7vw, 90px) clamp(20px, 5vw, 64px) clamp(28px, 4vw, 50px)",
          borderBottom: "1px solid var(--line)",
        }}
      >
        <div className="mono rise" style={{ fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--fg-mid)", marginBottom: 22 }}>
          ▸ STAGE 01 · INPUT — 現在地を置く
        </div>
        <h1
          className="display rise"
          style={{ fontSize: "clamp(44px, 10vw, 120px)", margin: 0, animationDelay: "0.08s" }}
        >
          PREDICT
        </h1>
        <p
          className="serif rise"
          style={{
            marginTop: 24,
            fontSize: "clamp(15px, 1.4vw, 19px)",
            fontWeight: 300,
            color: "var(--fg-mid)",
            lineHeight: 1.8,
            maxWidth: 540,
            animationDelay: "0.18s",
          }}
        >
          正確である必要はない。直感の手応えで、ゆっくり置いていく。
        </p>
      </section>

      <section style={{ padding: "clamp(36px, 5vw, 70px) clamp(20px, 5vw, 64px)" }}>
        <div
          className="rise"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 0,
            marginBottom: 40,
            borderTop: "1px solid var(--line)",
            borderBottom: "1px solid var(--line)",
            animationDelay: "0.06s",
          }}
        >
          {stepLabels.map((s, i) => {
            const active = step === i;
            return (
              <button
                key={s.en}
                onClick={() => setStep(i)}
                style={{
                  padding: "18px 16px",
                  textAlign: "left",
                  borderLeft: i === 0 ? "none" : "1px solid var(--line-ghost)",
                  background: active ? "rgba(255,255,255,0.04)" : "transparent",
                  position: "relative",
                  cursor: "pointer",
                  transition: "background 0.2s ease",
                }}
              >
                <div className="mono" style={{ fontSize: 10, letterSpacing: "0.24em", color: active ? "var(--accent)" : "var(--fg-mid)" }}>
                  0{i + 1} — {s.en}
                </div>
                <div className="serif" style={{ fontSize: 16, fontWeight: 500, marginTop: 6, color: active ? "var(--fg)" : "var(--fg-low)" }}>
                  {s.jp}
                </div>
                {active && (
                  <span
                    style={{
                      position: "absolute",
                      left: 0,
                      bottom: -1,
                      height: 2,
                      width: "100%",
                      background: "var(--accent)",
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <div
          className="rise"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 200px) 1fr",
            gap: "clamp(24px, 4vw, 72px)",
            alignItems: "start",
            animationDelay: "0.16s",
          }}
        >
          <div style={{ position: "sticky", top: 96 }}>
            <div className="mono" style={{ fontSize: 10, letterSpacing: "0.28em", color: "var(--fg-mid)", textTransform: "uppercase", marginBottom: 8 }}>
              SECTION — {String(step + 1).padStart(2, "0")}/04
            </div>
            <div className="serif" style={{ fontSize: 28, fontWeight: 300, lineHeight: 1.4, marginBottom: 18 }}>
              {step === 0 && "13軸の\n現在地"}
              {step === 1 && "どこまでの\n未来か"}
              {step === 2 && "どの方向の\n流れか"}
              {step === 3 && "そっと\n一言"}
            </div>
            <div style={{ fontSize: 11.5, color: "var(--fg-low)", lineHeight: 1.85 }}>
              {step === 0 && "全部に答えなくていい。 50のままでもいい。直感で。"}
              {step === 1 && "時間が長いほど、ツインの輪郭は揺らぐ。"}
              {step === 2 && "拡張・均衡・深化。三つのうち、いまの感じはどれか。"}
              {step === 3 && "書かなくていい。書くなら短く。"}
            </div>
          </div>

          <div>
            {step === 0 && (
              <div style={{ display: "grid", gap: 0, borderTop: "1px solid var(--line)" }}>
                {AXES.map((a, i) => (
                  <div
                    key={a.key}
                    style={{
                      padding: "20px 0",
                      borderBottom: "1px solid var(--line-ghost)",
                      display: "grid",
                      gridTemplateColumns: "minmax(0, 1fr) 60px",
                      gap: 24,
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 12 }}>
                        <span className="mono" style={{ fontSize: 10, color: "var(--fg-ghost)", letterSpacing: "0.2em" }}>
                          AX/{String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="serif" style={{ fontSize: 22, fontWeight: 500 }}>
                          {a.jp}
                        </span>
                        <span className="mono" style={{ fontSize: 10, color: "var(--fg-ghost)", letterSpacing: "0.18em", textTransform: "uppercase" }}>
                          {a.label}
                        </span>
                        <span style={{ fontSize: 11, color: "var(--fg-low)", marginLeft: "auto" }}>{a.hint}</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={axes[a.key]}
                        onChange={(e) =>
                          setAxes((prev) => ({ ...prev, [a.key]: Number(e.target.value) }))
                        }
                        className="range"
                      />
                    </div>
                    <div
                      className="display"
                      style={{
                        fontSize: 36,
                        color: "var(--fg)",
                        textAlign: "right",
                        lineHeight: 1,
                      }}
                    >
                      {String(axes[a.key]).padStart(2, "0")}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {step === 1 && (
              <div style={{ display: "grid", gap: 0, borderTop: "1px solid var(--line)" }}>
                {HORIZONS.map((h, i) => {
                  const active = horizon === h.key;
                  return (
                    <button
                      key={h.key}
                      onClick={() => setHorizon(h.key)}
                      style={{
                        padding: "26px 0",
                        borderBottom: "1px solid var(--line-ghost)",
                        display: "grid",
                        gridTemplateColumns: "80px 1fr auto",
                        alignItems: "center",
                        gap: 24,
                        textAlign: "left",
                        background: active ? "rgba(255,255,255,0.03)" : "transparent",
                        transition: "background 0.2s ease",
                        cursor: "pointer",
                      }}
                    >
                      <span className="mono" style={{ fontSize: 11, color: active ? "var(--accent)" : "var(--fg-mid)", letterSpacing: "0.22em" }}>
                        HZ/{String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="serif" style={{ fontSize: 28, fontWeight: active ? 500 : 300, color: active ? "var(--fg)" : "var(--fg-mid)" }}>
                        {h.jp}
                      </span>
                      <span
                        className="mono"
                        style={{
                          fontSize: 11,
                          letterSpacing: "0.28em",
                          textTransform: "uppercase",
                          color: active ? "var(--fg)" : "var(--fg-ghost)",
                        }}
                      >
                        {active ? "▸ " : ""}{h.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {step === 2 && (
              <div style={{ display: "grid", gap: 0, borderTop: "1px solid var(--line)" }}>
                {MODES.map((m, i) => {
                  const active = mode === m.key;
                  return (
                    <button
                      key={m.key}
                      onClick={() => setMode(m.key)}
                      style={{
                        padding: "26px 0",
                        borderBottom: "1px solid var(--line-ghost)",
                        display: "grid",
                        gridTemplateColumns: "80px 200px 1fr auto",
                        alignItems: "center",
                        gap: 24,
                        textAlign: "left",
                        background: active ? "rgba(255,255,255,0.03)" : "transparent",
                        transition: "background 0.2s ease",
                        cursor: "pointer",
                      }}
                    >
                      <span className="mono" style={{ fontSize: 11, color: active ? "var(--accent)" : "var(--fg-mid)", letterSpacing: "0.22em" }}>
                        MD/{String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="serif" style={{ fontSize: 26, fontWeight: active ? 500 : 300, color: active ? "var(--fg)" : "var(--fg-mid)" }}>
                        {m.jp}
                      </span>
                      <span style={{ fontSize: 12, color: active ? "var(--fg-mid)" : "var(--fg-low)", lineHeight: 1.7 }}>
                        {m.desc}
                      </span>
                      <span
                        className="mono"
                        style={{
                          fontSize: 11,
                          letterSpacing: "0.28em",
                          textTransform: "uppercase",
                          color: active ? "var(--fg)" : "var(--fg-ghost)",
                        }}
                      >
                        {m.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {step === 3 && (
              <div>
                <div className="mono" style={{ fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--fg-mid)", marginBottom: 14 }}>
                  Intent — 任意
                </div>
                <textarea
                  value={intent}
                  onChange={(e) => setIntent(e.target.value)}
                  placeholder="例: もう少し静かに動いていたい / 関係をひとつ手放したい / 続けるかやめるか迷う"
                  rows={5}
                  className="input-text serif"
                  style={{
                    fontSize: 20,
                    fontWeight: 300,
                    lineHeight: 1.7,
                    resize: "vertical",
                  }}
                />
                <div style={{ marginTop: 16, fontSize: 11, color: "var(--fg-ghost)", lineHeight: 1.85 }}>
                  この一言は、未来の言葉の選び方に少しだけ反映される。
                </div>
              </div>
            )}
          </div>
        </div>

        <div
          style={{
            marginTop: 56,
            paddingTop: 28,
            borderTop: "1px solid var(--line)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={back}
            disabled={step === 0}
            className="btn-line"
          >
            ◂ Back
          </button>
          <div className="mono" style={{ fontSize: 10, color: "var(--fg-mid)", letterSpacing: "0.28em", textTransform: "uppercase" }}>
            {step + 1} / 04
          </div>
          {step < 3 ? (
            <button onClick={next} className="btn-fill">
              Next ▸
            </button>
          ) : (
            <button onClick={submit} className="btn-fill" style={{ background: "var(--accent)" }}>
              ▸ 未来を視る
            </button>
          )}
        </div>
      </section>
    </div>
  );
}
