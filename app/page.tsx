import Link from "next/link";

export default function Home() {
  return (
    <div style={{ maxWidth: 680, margin: "0 auto", padding: "52px 28px 70px" }}>
      <div className="fsi" style={{ animationDelay: "0.04s", marginBottom: 56 }}>
        <div className="label-eyebrow" style={{ marginBottom: 14 }}>
          Future Prediction · Twin Mirror
        </div>
        <h1 className="h-title" style={{ margin: "0 0 14px 0" }}>
          未来の自分を、いま視にいく
        </h1>
        <p className="body-soft" style={{ maxWidth: 440, margin: 0 }}>
          いまの13軸の自分を記録すると、ツインがそこから先の輪郭を返します。
          <br />
          当てるためではなく、向き合うためのコンパス。
        </p>
      </div>

      <section className="fsi" style={{ animationDelay: "0.16s", marginBottom: 48 }}>
        <div className="label-eyebrow" style={{ marginBottom: 18 }}>
          いま、はじめる
        </div>
        <Link
          href="/predict"
          className="glass-card fsi"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 22,
            padding: "26px 28px",
            animationDelay: "0.22s",
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 16,
              border: "1px solid rgba(255,255,255,0.18)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              background: "rgba(255,255,255,0.025)",
              boxShadow: "inset 0 0 24px rgba(255,255,255,0.06), 0 0 28px rgba(255,255,255,0.07)",
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.78)" strokeWidth="1.2">
              <circle cx="12" cy="12" r="9" />
              <circle cx="12" cy="12" r="3.5" />
              <line x1="12" y1="3" x2="12" y2="7" />
              <line x1="12" y1="17" x2="12" y2="21" />
              <line x1="3" y1="12" x2="7" y2="12" />
              <line x1="17" y1="12" x2="21" y2="12" />
            </svg>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontSize: 10,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.6)",
                marginBottom: 6,
              }}
            >
              Predict
            </div>
            <div
              style={{
                fontSize: 16,
                fontWeight: 300,
                color: "rgba(255,255,255,0.88)",
                marginBottom: 4,
                letterSpacing: "0.01em",
              }}
            >
              現在地を入れて、未来を読む
            </div>
            <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.32)" }}>
              13軸 × 4つの時間軸 × 3つの分岐
            </div>
          </div>
          <span
            style={{
              fontSize: 18,
              color: "rgba(255,255,255,0.42)",
              flexShrink: 0,
            }}
          >
            →
          </span>
        </Link>
      </section>

      <section style={{ marginBottom: 48 }}>
        <div className="label-eyebrow fsi" style={{ animationDelay: "0.3s", marginBottom: 18 }}>
          観測の続きを見る
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
          <Link
            href="/result"
            className="glass-tile fsi"
            style={{ display: "block", padding: 16, animationDelay: "0.36s" }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: 999,
                background: "rgba(255,255,255,0.72)",
                boxShadow: "0 0 6px rgba(255,255,255,0.6), 0 0 14px rgba(255,255,255,0.25)",
                marginBottom: 12,
              }}
            />
            <div
              className="mono"
              style={{
                fontSize: 11,
                color: "rgba(255,255,255,0.78)",
                marginBottom: 6,
              }}
            >
              result
            </div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", lineHeight: 1.5 }}>
              直近の未来予測
            </div>
          </Link>
          <Link
            href="/timeline"
            className="glass-tile fsi"
            style={{ display: "block", padding: 16, animationDelay: "0.42s" }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: 999,
                background: "rgba(255,255,255,0.72)",
                boxShadow: "0 0 6px rgba(255,255,255,0.6), 0 0 14px rgba(255,255,255,0.25)",
                marginBottom: 12,
              }}
            />
            <div
              className="mono"
              style={{
                fontSize: 11,
                color: "rgba(255,255,255,0.78)",
                marginBottom: 6,
              }}
            >
              timeline
            </div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", lineHeight: 1.5 }}>
              これまでの予測の系譜
            </div>
          </Link>
          <Link
            href="/theory"
            className="glass-tile fsi"
            style={{ display: "block", padding: 16, animationDelay: "0.48s" }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: 999,
                background: "rgba(255,255,255,0.72)",
                boxShadow: "0 0 6px rgba(255,255,255,0.6), 0 0 14px rgba(255,255,255,0.25)",
                marginBottom: 12,
              }}
            />
            <div
              className="mono"
              style={{
                fontSize: 11,
                color: "rgba(255,255,255,0.78)",
                marginBottom: 6,
              }}
            >
              theory
            </div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", lineHeight: 1.5 }}>
              どう未来を読むのか
            </div>
          </Link>
        </div>
      </section>

      <section className="fsi" style={{ animationDelay: "0.6s" }}>
        <div className="label-eyebrow" style={{ marginBottom: 18 }}>
          このアプリの輪郭
        </div>
        <div
          className="glass-card"
          style={{
            padding: "26px 28px",
            display: "grid",
            gap: 18,
          }}
        >
          {[
            { k: "01", t: "13軸の現在地を入れる", s: "心・身体・関係・働き・財・学び・遊び・表現・発見・信・静・響・跡" },
            { k: "02", t: "時間軸と流れを選ぶ", s: "1ヶ月・半年・1年・3年 × 拡張・均衡・深化" },
            { k: "03", t: "ツインが3つの分岐を描く", s: "Light · Median · Shadow の確率と転機が返ってくる" },
            { k: "04", t: "Timelineに置いて、時間と照らす", s: "外れた距離が、自分の動いた距離になる" },
          ].map((it) => (
            <div key={it.k} style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
              <div
                className="mono"
                style={{
                  fontSize: 10,
                  color: "rgba(255,255,255,0.35)",
                  paddingTop: 3,
                  letterSpacing: "0.18em",
                }}
              >
                {it.k}
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 400,
                    color: "rgba(255,255,255,0.78)",
                    marginBottom: 4,
                  }}
                >
                  {it.t}
                </div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", lineHeight: 1.7 }}>{it.s}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
