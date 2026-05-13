"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { AXES, HORIZONS, MODES, type AxisKey, type Horizon, type Mode } from "@/lib/types";
import { predict } from "@/lib/predict";
import { saveReading } from "@/lib/storage";

function initialAxes(): Record<AxisKey, number> {
  return Object.fromEntries(AXES.map((a) => [a.key, 50])) as Record<AxisKey, number>;
}

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
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "52px 28px 70px" }}>
      <div className="fsi" style={{ animationDelay: "0.04s", marginBottom: 36 }}>
        <div className="label-eyebrow" style={{ marginBottom: 14 }}>
          Predict · 現在地を入れる
        </div>
        <h1 className="h-title" style={{ margin: "0 0 14px 0" }}>
          いまの自分を、置いていく
        </h1>
        <p className="body-soft" style={{ maxWidth: 460 }}>
          正確である必要はない。直感の手応えで、ゆっくり選んでいい。
        </p>
      </div>

      <div
        className="fsi"
        style={{
          display: "flex",
          gap: 8,
          marginBottom: 32,
          animationDelay: "0.14s",
        }}
      >
        {["13軸", "時間軸", "流れ", "言葉"].map((label, i) => (
          <div
            key={label}
            style={{
              flex: 1,
              padding: "10px 0",
              textAlign: "center",
              border: `1px solid ${step === i ? "rgba(255,255,255,0.32)" : "rgba(255,255,255,0.07)"}`,
              borderRadius: 10,
              background: step === i ? "rgba(255,255,255,0.05)" : "transparent",
              transition: "all 0.3s ease",
              cursor: "pointer",
            }}
            onClick={() => setStep(i)}
          >
            <div
              className="mono"
              style={{
                fontSize: 9,
                color: "rgba(255,255,255,0.4)",
                letterSpacing: "0.2em",
                marginBottom: 3,
              }}
            >
              0{i + 1}
            </div>
            <div
              style={{
                fontSize: 11,
                color: step === i ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0.4)",
              }}
            >
              {label}
            </div>
          </div>
        ))}
      </div>

      <div className="glass-card fsi" style={{ padding: 28, animationDelay: "0.22s" }}>
        {step === 0 && (
          <div>
            <div className="label-eyebrow" style={{ marginBottom: 16 }}>
              13軸の現在地 · 0〜100
            </div>
            <div style={{ display: "grid", gap: 18 }}>
              {AXES.map((a) => (
                <div key={a.key}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      justifyContent: "space-between",
                      marginBottom: 7,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                      <span
                        className="mono"
                        style={{
                          fontSize: 10,
                          color: "rgba(255,255,255,0.4)",
                          letterSpacing: "0.18em",
                        }}
                      >
                        {a.label}
                      </span>
                      <span style={{ fontSize: 12, color: "rgba(255,255,255,0.78)" }}>{a.jp}</span>
                      <span style={{ fontSize: 10, color: "rgba(255,255,255,0.28)" }}>{a.hint}</span>
                    </div>
                    <span
                      className="mono"
                      style={{
                        fontSize: 11,
                        color: "rgba(255,255,255,0.6)",
                        minWidth: 28,
                        textAlign: "right",
                      }}
                    >
                      {axes[a.key]}
                    </span>
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
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div>
            <div className="label-eyebrow" style={{ marginBottom: 16 }}>
              時間軸を選ぶ
            </div>
            <div style={{ display: "grid", gap: 8 }}>
              {HORIZONS.map((h) => (
                <button
                  key={h.key}
                  onClick={() => setHorizon(h.key)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "16px 20px",
                    borderRadius: 12,
                    border: `1px solid ${horizon === h.key ? "rgba(255,255,255,0.32)" : "rgba(255,255,255,0.07)"}`,
                    background:
                      horizon === h.key ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.018)",
                    transition: "all 0.25s ease",
                    textAlign: "left",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: 14,
                        color: horizon === h.key ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.55)",
                        marginBottom: 3,
                      }}
                    >
                      {h.jp}
                    </div>
                    <div
                      className="mono"
                      style={{ fontSize: 10, color: "rgba(255,255,255,0.32)", letterSpacing: "0.16em" }}
                    >
                      {h.label}
                    </div>
                  </div>
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 999,
                      background: horizon === h.key ? "rgba(255,255,255,0.92)" : "transparent",
                      border: "1px solid rgba(255,255,255,0.32)",
                      boxShadow:
                        horizon === h.key ? "0 0 12px rgba(255,255,255,0.5)" : "none",
                    }}
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <div className="label-eyebrow" style={{ marginBottom: 16 }}>
              流れの方向 · どこへ向かう感じ?
            </div>
            <div style={{ display: "grid", gap: 8 }}>
              {MODES.map((m) => (
                <button
                  key={m.key}
                  onClick={() => setMode(m.key)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "16px 20px",
                    borderRadius: 12,
                    border: `1px solid ${mode === m.key ? "rgba(255,255,255,0.32)" : "rgba(255,255,255,0.07)"}`,
                    background:
                      mode === m.key ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.018)",
                    transition: "all 0.25s ease",
                    textAlign: "left",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: 14,
                        color: mode === m.key ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.55)",
                        marginBottom: 4,
                      }}
                    >
                      {m.jp}
                    </div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>
                      {m.desc}
                    </div>
                  </div>
                  <div
                    className="mono"
                    style={{
                      fontSize: 10,
                      color: mode === m.key ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.22)",
                      letterSpacing: "0.18em",
                    }}
                  >
                    {m.label}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <div className="label-eyebrow" style={{ marginBottom: 16 }}>
              いま、見にいきたい一言 · 任意
            </div>
            <textarea
              value={intent}
              onChange={(e) => setIntent(e.target.value)}
              placeholder="例: もう少し静かに動いていたい / 関係をひとつ手放したい / 続けるかやめるか迷う"
              rows={5}
              className="input-text"
              style={{ resize: "vertical" }}
            />
            <div
              style={{
                marginTop: 10,
                fontSize: 11,
                color: "rgba(255,255,255,0.28)",
                lineHeight: 1.7,
              }}
            >
              書かなくていい。書く場合は短く。<br />
              この一言は、未来の言葉の選び方に少しだけ反映される。
            </div>
          </div>
        )}
      </div>

      <div
        style={{
          marginTop: 28,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <button
          onClick={back}
          disabled={step === 0}
          className="btn-ghost"
          style={{ opacity: step === 0 ? 0.3 : 1, cursor: step === 0 ? "default" : "pointer" }}
        >
          ← Back
        </button>
        {step < 3 ? (
          <button onClick={next} className="btn-primary">
            Next →
          </button>
        ) : (
          <button onClick={submit} className="btn-primary">
            未来を視る
          </button>
        )}
      </div>
    </div>
  );
}
