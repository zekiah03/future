import { AXES, HORIZONS, MODES } from "@/lib/types";

export default function TheoryPage() {
  return (
    <div>
      <section
        style={{
          padding: "clamp(50px, 7vw, 100px) clamp(20px, 5vw, 64px)",
          borderBottom: "1px solid var(--line)",
        }}
      >
        <div className="mono rise" style={{ fontSize: 10, letterSpacing: "0.28em", color: "var(--fg-mid)", marginBottom: 22 }}>
          ▸ STAGE 04 · THEORY
        </div>
        <h1 className="display rise" style={{ fontSize: "clamp(44px, 11vw, 150px)", animationDelay: "0.08s" }}>
          THEORY
        </h1>
        <p
          className="serif rise"
          style={{
            marginTop: 26,
            fontSize: "clamp(15px, 1.5vw, 22px)",
            color: "var(--fg-mid)",
            lineHeight: 1.85,
            maxWidth: 640,
            fontWeight: 300,
            animationDelay: "0.18s",
          }}
        >
          ツインは、当てるのではなく描く。
          ありうる輪郭を、確率分布として並べるための小さな道具。
        </p>
      </section>

      <section
        style={{
          padding: "clamp(50px, 7vw, 90px) clamp(20px, 5vw, 64px)",
          borderBottom: "1px solid var(--line)",
          display: "grid",
          gridTemplateColumns: "minmax(0, 200px) 1fr",
          gap: "clamp(24px, 4vw, 72px)",
          alignItems: "start",
        }}
      >
        <div>
          <div className="mono" style={{ fontSize: 11, letterSpacing: "0.28em", color: "var(--fg-mid)", textTransform: "uppercase", marginBottom: 10 }}>
            N° 01
          </div>
          <div className="serif" style={{ fontSize: 30, fontWeight: 300, lineHeight: 1.4 }}>
            13軸の<br />現在地
          </div>
        </div>
        <div>
          <p style={{ fontSize: 14.5, lineHeight: 2, color: "var(--fg)", maxWidth: 720, fontWeight: 300, marginBottom: 28 }}>
            人を一つの数値で測ることはできない。だから13の軸で測る。
            それぞれが0〜100の値を取り、平均値と分散がツインの体温を決める。
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: 0,
              borderTop: "1px solid var(--line-ghost)",
              borderLeft: "1px solid var(--line-ghost)",
            }}
          >
            {AXES.map((a, i) => (
              <div
                key={a.key}
                style={{
                  padding: "16px 18px",
                  borderRight: "1px solid var(--line-ghost)",
                  borderBottom: "1px solid var(--line-ghost)",
                }}
              >
                <div className="mono" style={{ fontSize: 9, letterSpacing: "0.22em", color: "var(--fg-ghost)", textTransform: "uppercase", marginBottom: 6 }}>
                  AX/{String(i + 1).padStart(2, "0")} — {a.label}
                </div>
                <div className="serif" style={{ fontSize: 20, fontWeight: 500, marginBottom: 6 }}>
                  {a.jp}
                </div>
                <div style={{ fontSize: 11, color: "var(--fg-low)", lineHeight: 1.65 }}>{a.hint}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        style={{
          padding: "clamp(50px, 7vw, 90px) clamp(20px, 5vw, 64px)",
          borderBottom: "1px solid var(--line)",
          display: "grid",
          gridTemplateColumns: "minmax(0, 200px) 1fr",
          gap: "clamp(24px, 4vw, 72px)",
          alignItems: "start",
        }}
      >
        <div>
          <div className="mono" style={{ fontSize: 11, letterSpacing: "0.28em", color: "var(--fg-mid)", textTransform: "uppercase", marginBottom: 10 }}>
            N° 02
          </div>
          <div className="serif" style={{ fontSize: 30, fontWeight: 300, lineHeight: 1.4 }}>
            時間軸と<br />流れ
          </div>
        </div>
        <div>
          <p style={{ fontSize: 14.5, lineHeight: 2, color: "var(--fg)", maxWidth: 720, fontWeight: 300, marginBottom: 28 }}>
            未来は時間の長さで姿が変わる。
            さらに、自分がいまどの方向の流れにいるかで、同じ現在地でも別の未来が描かれる。
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(20px, 4vw, 48px)", borderTop: "1px solid var(--line)", paddingTop: 28 }}>
            <div>
              <div className="mono" style={{ fontSize: 10, letterSpacing: "0.28em", color: "var(--fg-mid)", textTransform: "uppercase", marginBottom: 16 }}>
                Horizons
              </div>
              <div>
                {HORIZONS.map((h, i) => (
                  <div
                    key={h.key}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      padding: "14px 0",
                      borderBottom: "1px solid var(--line-ghost)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                      <span className="mono" style={{ fontSize: 10, color: "var(--fg-ghost)", letterSpacing: "0.22em" }}>
                        HZ/{String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="serif" style={{ fontSize: 18, fontWeight: 500 }}>{h.jp}</span>
                    </div>
                    <span className="mono" style={{ fontSize: 10, color: "var(--fg-mid)", letterSpacing: "0.22em", textTransform: "uppercase" }}>
                      {h.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="mono" style={{ fontSize: 10, letterSpacing: "0.28em", color: "var(--fg-mid)", textTransform: "uppercase", marginBottom: 16 }}>
                Modes
              </div>
              <div>
                {MODES.map((m, i) => (
                  <div
                    key={m.key}
                    style={{
                      padding: "14px 0",
                      borderBottom: "1px solid var(--line-ghost)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                        <span className="mono" style={{ fontSize: 10, color: "var(--fg-ghost)", letterSpacing: "0.22em" }}>
                          MD/{String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="serif" style={{ fontSize: 18, fontWeight: 500 }}>{m.jp}</span>
                      </div>
                      <span className="mono" style={{ fontSize: 10, color: "var(--fg-mid)", letterSpacing: "0.22em", textTransform: "uppercase" }}>
                        {m.label}
                      </span>
                    </div>
                    <div style={{ fontSize: 11, color: "var(--fg-low)", marginTop: 6, lineHeight: 1.6 }}>{m.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        style={{
          padding: "clamp(50px, 7vw, 90px) clamp(20px, 5vw, 64px)",
          borderBottom: "1px solid var(--line)",
          display: "grid",
          gridTemplateColumns: "minmax(0, 200px) 1fr",
          gap: "clamp(24px, 4vw, 72px)",
          alignItems: "start",
        }}
      >
        <div>
          <div className="mono" style={{ fontSize: 11, letterSpacing: "0.28em", color: "var(--fg-mid)", textTransform: "uppercase", marginBottom: 10 }}>
            N° 03
          </div>
          <div className="serif" style={{ fontSize: 30, fontWeight: 300, lineHeight: 1.4 }}>
            3つの<br />分岐
          </div>
        </div>
        <div>
          <p style={{ fontSize: 14.5, lineHeight: 2, color: "var(--fg)", maxWidth: 720, fontWeight: 300, marginBottom: 28 }}>
            未来は決まっていない。
            ありうる輪郭を、3つの確率分布として描き返す。
          </p>
          <div style={{ borderTop: "1px solid var(--line)" }}>
            {[
              { k: "LIGHT", jp: "光", marker: "var(--accent-2)", desc: "いまの流れが追い風を受けたとき。前向きな転機が早めに訪れる輪郭。" },
              { k: "MEDIAN", jp: "中庸", marker: "var(--fg)", desc: "今のリズムを保ったままの自然な延長。劇的な変化は無いが、見方は変わる。" },
              { k: "SHADOW", jp: "影", marker: "var(--accent)", desc: "流れが内側で軋んだとき。手放す/やめる選択肢が静かに浮かぶ輪郭。" },
            ].map((b, i) => (
              <div
                key={b.k}
                style={{
                  padding: "26px 0",
                  borderBottom: "1px solid var(--line-ghost)",
                  display: "grid",
                  gridTemplateColumns: "60px 100px 1fr",
                  gap: 24,
                  alignItems: "center",
                }}
              >
                <div className="mono" style={{ fontSize: 11, letterSpacing: "0.28em", color: "var(--fg-mid)" }}>
                  BR/{String(i + 1).padStart(2, "0")}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ display: "inline-block", width: 22, height: 8, background: b.marker }} />
                  <span className="serif" style={{ fontSize: 22, fontWeight: 500 }}>{b.jp}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <span className="mono" style={{ fontSize: 10, letterSpacing: "0.26em", color: "var(--fg-mid)" }}>
                    {b.k}
                  </span>
                  <span style={{ fontSize: 12.5, color: "var(--fg-low)", lineHeight: 1.7 }}>{b.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        style={{
          padding: "clamp(70px, 9vw, 130px) clamp(20px, 5vw, 64px)",
          textAlign: "center",
        }}
      >
        <div className="mono" style={{ fontSize: 10, letterSpacing: "0.28em", color: "var(--fg-mid)", marginBottom: 28 }}>
          N° 04 — WHY
        </div>
        <p
          className="serif"
          style={{
            fontSize: "clamp(24px, 3.4vw, 44px)",
            fontWeight: 300,
            lineHeight: 1.55,
            maxWidth: 900,
            margin: "0 auto",
            color: "var(--fg)",
            letterSpacing: "0.02em",
          }}
        >
          「未来を当てる」ためではない。
          <br />
          <span style={{ color: "var(--accent)" }}>いまの自分の輪郭</span>を、はっきり見るため。
        </p>
      </section>
    </div>
  );
}
