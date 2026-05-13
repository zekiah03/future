import Link from "next/link";

export default function Home() {
  return (
    <div>
      <section
        style={{
          padding: "clamp(60px, 9vw, 130px) clamp(20px, 5vw, 64px) clamp(40px, 7vw, 90px)",
          borderBottom: "1px solid var(--line)",
        }}
      >
        <div
          className="mono rise"
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 12,
            fontSize: 10,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "var(--fg-mid)",
            marginBottom: 28,
            animationDelay: "0.04s",
          }}
        >
          <span className="dot dot-accent" style={{ alignSelf: "center" }} />
          <span>Predictor Lineup · vol.01</span>
          <span style={{ color: "var(--fg-ghost)" }}>· 13 axis × 4 horizons × 3 branches</span>
        </div>

        <h1
          className="display rise"
          style={{
            fontSize: "clamp(56px, 16vw, 220px)",
            margin: 0,
            color: "var(--fg)",
            animationDelay: "0.1s",
          }}
        >
          FUTURE
          <br />
          PREDICTOR
        </h1>

        <div
          className="rise"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(20px, 4vw, 64px)",
            marginTop: 48,
            animationDelay: "0.22s",
            maxWidth: 1100,
          }}
        >
          <p
            className="serif"
            style={{
              fontSize: "clamp(16px, 1.6vw, 22px)",
              fontWeight: 300,
              lineHeight: 1.85,
              color: "var(--fg)",
              letterSpacing: "0.02em",
            }}
          >
            13の現在地を置くと、
            <br />
            ツインがそこから先の輪郭を
            <br />
            <span style={{ color: "var(--accent)" }}>三つの分岐</span>として返す。
          </p>
          <p
            style={{
              fontSize: 13,
              lineHeight: 1.95,
              color: "var(--fg-mid)",
              maxWidth: 460,
            }}
          >
            当てるためのアプリではなく、向き合うためのコンパス。
            <br />
            外れた距離が、いつかの自分の動いた距離になる。
          </p>
        </div>

        <div className="rise" style={{ marginTop: 56, display: "flex", gap: 12, flexWrap: "wrap", animationDelay: "0.34s" }}>
          <Link href="/predict" className="btn-fill">
            ▸ Predict the Future
          </Link>
          <Link href="/theory" className="btn-line">
            How it works
          </Link>
        </div>
      </section>

      <section
        style={{
          padding: "clamp(50px, 7vw, 100px) clamp(20px, 5vw, 64px)",
          borderBottom: "1px solid var(--line)",
        }}
      >
        <div className="section-title">
          <span className="no">N° 01</span>
          <span className="name">ラインナップ</span>
          <span className="name-en">— PROGRAM</span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 0,
            borderLeft: "1px solid var(--line-ghost)",
          }}
        >
          {[
            {
              no: "01",
              jp: "現在地を置く",
              en: "Set the present",
              desc: "13軸の数値で、いまの自分を一度だけ静かに描く",
              href: "/predict",
            },
            {
              no: "02",
              jp: "未来を視る",
              en: "Read the futures",
              desc: "Light / Median / Shadow の3分岐がそれぞれの確率で返る",
              href: "/result",
            },
            {
              no: "03",
              jp: "時間に置く",
              en: "Lay in time",
              desc: "Timelineに重ね、外れた距離をあとから確かめる",
              href: "/timeline",
            },
            {
              no: "04",
              jp: "理屈を知る",
              en: "Know the why",
              desc: "ツインがどう未来を描くか、内側の仕組みを開示する",
              href: "/theory",
            },
          ].map((s, i) => (
            <Link
              key={s.no}
              href={s.href}
              className="rise"
              style={{
                padding: "32px 28px",
                borderRight: "1px solid var(--line-ghost)",
                borderBottom: "1px solid var(--line-ghost)",
                display: "flex",
                flexDirection: "column",
                gap: 18,
                minHeight: 260,
                animationDelay: `${0.12 + i * 0.07}s`,
                transition: "background 0.25s ease",
              }}
            >
              <div className="mono" style={{ fontSize: 11, color: "var(--fg-mid)", letterSpacing: "0.24em" }}>
                STEP — {s.no}
              </div>
              <div className="serif" style={{ fontSize: 24, fontWeight: 500, color: "var(--fg)", lineHeight: 1.4 }}>
                {s.jp}
              </div>
              <div
                className="mono"
                style={{
                  fontSize: 10,
                  letterSpacing: "0.24em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                }}
              >
                {s.en}
              </div>
              <div style={{ fontSize: 12, lineHeight: 1.8, color: "var(--fg-mid)", marginTop: "auto" }}>
                {s.desc}
              </div>
              <div className="mono" style={{ fontSize: 10, color: "var(--fg-ghost)", letterSpacing: "0.24em" }}>
                ▸ OPEN
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section
        style={{
          padding: "clamp(50px, 7vw, 100px) clamp(20px, 5vw, 64px)",
          borderBottom: "1px solid var(--line)",
          display: "grid",
          gridTemplateColumns: "240px 1fr",
          gap: "clamp(24px, 4vw, 72px)",
          alignItems: "start",
        }}
      >
        <div>
          <div className="eyebrow" style={{ marginBottom: 14 }}>
            Manifesto
          </div>
          <div className="serif" style={{ fontSize: 28, fontWeight: 300, lineHeight: 1.5, letterSpacing: "0.02em" }}>
            未来は<br />
            選ばれた未来。
          </div>
        </div>
        <div>
          <p
            style={{
              fontSize: 15,
              lineHeight: 2.05,
              color: "var(--fg)",
              fontWeight: 300,
              maxWidth: 700,
              letterSpacing: "0.02em",
            }}
          >
            このアプリは未来を当てない。
            いまの自分から滲み出る別の自分の輪郭を、
            ありうる確率として並べてみせるだけ。
            <br />
            <br />
            13の軸はそれぞれが0〜100の値を持ち、
            その合成と分散がツインの体温を決める。
            時間が経つと、外れたぶんだけ自分が動いている。
            予測は地図ではなく、コンパスだ。
          </p>
          <div
            style={{
              marginTop: 32,
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontFamily: "var(--mono)",
              fontSize: 10,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "var(--fg-mid)",
            }}
          >
            <span style={{ width: 28, height: 1, background: "var(--fg-mid)" }} />
            Twin Mirror · Solnova Lab
          </div>
        </div>
      </section>

      <section style={{ padding: "clamp(50px, 7vw, 100px) clamp(20px, 5vw, 64px)" }}>
        <div className="section-title">
          <span className="no">N° 02</span>
          <span className="name">13軸の名前</span>
          <span className="name-en">— AXIS INDEX</span>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: 0,
            borderLeft: "1px solid var(--line-ghost)",
            borderTop: "1px solid var(--line-ghost)",
          }}
        >
          {[
            ["mind", "心", "気分と思考"],
            ["body", "身体", "感覚と元気"],
            ["relations", "関係", "人と人の間"],
            ["work", "働き", "営みの流れ"],
            ["money", "財", "経済の手応え"],
            ["learning", "学び", "知の進み"],
            ["play", "遊び", "余白と楽しさ"],
            ["expression", "表現", "外に出す動き"],
            ["discovery", "発見", "新しい出会い"],
            ["trust", "信", "自分への信"],
            ["peace", "静", "内の静けさ"],
            ["resonance", "響", "響き合うもの"],
            ["trace", "跡", "残してきた足跡"],
          ].map(([k, jp, desc], i) => (
            <div
              key={k}
              className="rise"
              style={{
                padding: "20px 22px",
                borderRight: "1px solid var(--line-ghost)",
                borderBottom: "1px solid var(--line-ghost)",
                animationDelay: `${0.1 + i * 0.03}s`,
              }}
            >
              <div className="mono" style={{ fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--fg-mid)", marginBottom: 8 }}>
                AX/{String(i + 1).padStart(2, "0")}
              </div>
              <div className="serif" style={{ fontSize: 22, fontWeight: 500, marginBottom: 4 }}>
                {jp}
              </div>
              <div className="mono" style={{ fontSize: 10, letterSpacing: "0.18em", color: "var(--fg-ghost)", marginBottom: 8, textTransform: "uppercase" }}>
                {k}
              </div>
              <div style={{ fontSize: 11, color: "var(--fg-low)", lineHeight: 1.7 }}>{desc}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
