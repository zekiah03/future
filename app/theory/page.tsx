import { AXES, HORIZONS, MODES } from "@/lib/types";

export default function TheoryPage() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "52px 28px 80px" }}>
      <div className="fsi" style={{ animationDelay: "0.04s", marginBottom: 36 }}>
        <div className="label-eyebrow" style={{ marginBottom: 14 }}>
          Theory · どう未来を読むのか
        </div>
        <h1 className="h-title" style={{ margin: "0 0 14px 0" }}>
          ツインは、当てるのではなく描く
        </h1>
        <p className="body-soft" style={{ maxWidth: 460 }}>
          このアプリの予測は、過去のあなたのデータを集めて統計的に推論するものではない。
          いま選んだ現在地と、選んだ流れの方向から、ありうる輪郭を描き戻す道具。
        </p>
      </div>

      <section className="fsi" style={{ animationDelay: "0.14s", marginBottom: 28 }}>
        <div className="label-eyebrow" style={{ marginBottom: 14 }}>
          1 — 13軸の現在地
        </div>
        <div className="glass-card" style={{ padding: 24 }}>
          <p
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.62)",
              lineHeight: 1.85,
              marginBottom: 16,
              fontWeight: 300,
            }}
          >
            人を一つの数値で測ることはできない。だから13の軸で測る。<br />
            それぞれが0〜100の値を取り、平均値と分散がツインの体温を決める。
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
              gap: 8,
            }}
          >
            {AXES.map((a) => (
              <div
                key={a.key}
                style={{
                  padding: "10px 12px",
                  borderRadius: 10,
                  border: "1px solid rgba(255,255,255,0.06)",
                  background: "rgba(255,255,255,0.018)",
                }}
              >
                <div
                  className="mono"
                  style={{
                    fontSize: 9,
                    color: "rgba(255,255,255,0.4)",
                    letterSpacing: "0.18em",
                    marginBottom: 3,
                  }}
                >
                  {a.label}
                </div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.72)", marginBottom: 3 }}>
                  {a.jp}
                </div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.28)", lineHeight: 1.5 }}>
                  {a.hint}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="fsi" style={{ animationDelay: "0.22s", marginBottom: 28 }}>
        <div className="label-eyebrow" style={{ marginBottom: 14 }}>
          2 — 時間軸と流れ
        </div>
        <div className="glass-card" style={{ padding: 24 }}>
          <p
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.62)",
              lineHeight: 1.85,
              marginBottom: 18,
              fontWeight: 300,
            }}
          >
            未来は時間の長さで姿が変わる。
            さらに、自分がいまどの方向の流れにいるかで、同じ現在地でも別の未来が描かれる。
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
            <div>
              <div className="label-eyebrow" style={{ marginBottom: 10 }}>
                Horizons
              </div>
              <div style={{ display: "grid", gap: 6 }}>
                {HORIZONS.map((h) => (
                  <div key={h.key} style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}>{h.jp}</span>
                    <span
                      className="mono"
                      style={{
                        fontSize: 10,
                        color: "rgba(255,255,255,0.32)",
                        letterSpacing: "0.16em",
                      }}
                    >
                      {h.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="label-eyebrow" style={{ marginBottom: 10 }}>
                Modes
              </div>
              <div style={{ display: "grid", gap: 6 }}>
                {MODES.map((m) => (
                  <div key={m.key}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}>{m.jp}</span>
                      <span
                        className="mono"
                        style={{
                          fontSize: 10,
                          color: "rgba(255,255,255,0.32)",
                          letterSpacing: "0.16em",
                        }}
                      >
                        {m.label}
                      </span>
                    </div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.32)", lineHeight: 1.5 }}>
                      {m.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="fsi" style={{ animationDelay: "0.3s", marginBottom: 28 }}>
        <div className="label-eyebrow" style={{ marginBottom: 14 }}>
          3 — 3つの分岐
        </div>
        <div className="glass-card" style={{ padding: 24 }}>
          <p
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.62)",
              lineHeight: 1.85,
              marginBottom: 16,
              fontWeight: 300,
            }}
          >
            未来は決まっていない。ありうる輪郭を、3つの確率分布として描く。
          </p>
          <div style={{ display: "grid", gap: 12 }}>
            {[
              {
                k: "Light",
                jp: "光",
                desc: "いまの流れが追い風を受けたとき。前向きな転機が早めに訪れる輪郭。",
                dot: "rgba(255,255,255,0.92)",
              },
              {
                k: "Median",
                jp: "中庸",
                desc: "今のリズムを保ったままの自然な延長。劇的な変化は無いが、見方は変わる。",
                dot: "rgba(255,255,255,0.55)",
              },
              {
                k: "Shadow",
                jp: "影",
                desc: "流れが内側で軋んだとき。手放す/やめる選択肢が静かに浮かぶ輪郭。",
                dot: "rgba(255,255,255,0.28)",
              },
            ].map((b) => (
              <div key={b.k} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 999,
                    background: b.dot,
                    boxShadow: `0 0 12px ${b.dot}`,
                    marginTop: 6,
                    flexShrink: 0,
                  }}
                />
                <div>
                  <div style={{ display: "flex", gap: 10, alignItems: "baseline", marginBottom: 3 }}>
                    <span
                      className="mono"
                      style={{
                        fontSize: 10,
                        color: "rgba(255,255,255,0.55)",
                        letterSpacing: "0.18em",
                      }}
                    >
                      {b.k}
                    </span>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.78)" }}>{b.jp}</span>
                  </div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", lineHeight: 1.7 }}>
                    {b.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="fsi" style={{ animationDelay: "0.38s", marginBottom: 28 }}>
        <div className="label-eyebrow" style={{ marginBottom: 14 }}>
          4 — 何のため
        </div>
        <div
          className="glass-card"
          style={{
            padding: 28,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 15,
              color: "rgba(255,255,255,0.78)",
              lineHeight: 1.95,
              fontWeight: 300,
              letterSpacing: "0.02em",
              fontStyle: "italic",
            }}
          >
            「未来を当てる」ためではない。<br />
            <span style={{ color: "rgba(255,255,255,0.55)" }}>
              いまの自分の輪郭を、はっきり見るため。
            </span>
          </div>
        </div>
      </section>

      <div
        className="fsi"
        style={{
          fontSize: 10,
          color: "rgba(255,255,255,0.18)",
          textAlign: "center",
          letterSpacing: "0.2em",
          animationDelay: "0.5s",
        }}
      >
        FUTURE v0.1 · Solnova Lab · 13軸 × 4 horizons × 3 branches
      </div>
    </div>
  );
}
