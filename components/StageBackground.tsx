"use client";

import { useEffect, useState } from "react";

export default function StageBackground() {
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const pad = (n: number) => String(n).padStart(2, "0");
      setTime(`${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())} JST`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(1100px 700px at 84% -10%, rgba(255, 46, 46, 0.07), transparent 60%), radial-gradient(1000px 700px at -10% 110%, rgba(244, 240, 80, 0.04), transparent 55%), #000",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "100px 100px",
          maskImage: "radial-gradient(circle at 50% 35%, rgba(0,0,0,0.8), transparent 75%)",
          WebkitMaskImage: "radial-gradient(circle at 50% 35%, rgba(0,0,0,0.8), transparent 75%)",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "fixed",
          bottom: 0,
          right: 0,
          padding: "12px 16px",
          zIndex: 50,
          fontFamily: "var(--mono)",
          fontSize: 10,
          color: "rgba(255,255,255,0.32)",
          letterSpacing: "0.18em",
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: 5,
            height: 5,
            background: "var(--accent)",
            marginRight: 7,
            animation: "blink 1.4s ease-in-out infinite",
            verticalAlign: "middle",
          }}
        />
        REC · {time}
      </div>
    </>
  );
}
