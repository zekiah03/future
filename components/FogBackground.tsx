"use client";

import { useEffect, useRef } from "react";

export default function FogBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = (canvas.width = window.innerWidth * devicePixelRatio);
    let h = (canvas.height = window.innerHeight * devicePixelRatio);
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";

    type Blob = { x: number; y: number; r: number; vx: number; vy: number; o: number };
    const blobs: Blob[] = Array.from({ length: 7 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: (160 + Math.random() * 280) * devicePixelRatio,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      o: 0.018 + Math.random() * 0.022,
    }));

    type Star = { x: number; y: number; o: number; t: number };
    const stars: Star[] = Array.from({ length: 80 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      o: 0.06 + Math.random() * 0.22,
      t: Math.random() * Math.PI * 2,
    }));

    const onResize = () => {
      w = canvas.width = window.innerWidth * devicePixelRatio;
      h = canvas.height = window.innerHeight * devicePixelRatio;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
    };
    window.addEventListener("resize", onResize);

    const tick = (time: number) => {
      ctx.clearRect(0, 0, w, h);

      ctx.fillStyle = "#050508";
      ctx.fillRect(0, 0, w, h);

      for (const b of blobs) {
        b.x += b.vx;
        b.y += b.vy;
        if (b.x < -b.r) b.x = w + b.r;
        if (b.x > w + b.r) b.x = -b.r;
        if (b.y < -b.r) b.y = h + b.r;
        if (b.y > h + b.r) b.y = -b.r;
        const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        g.addColorStop(0, `rgba(255,255,255,${b.o})`);
        g.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = g;
        ctx.fillRect(b.x - b.r, b.y - b.r, b.r * 2, b.r * 2);
      }

      for (const s of stars) {
        const op = s.o * (0.5 + 0.5 * Math.sin(time * 0.0008 + s.t));
        ctx.fillStyle = `rgba(255,255,255,${op})`;
        ctx.fillRect(s.x, s.y, devicePixelRatio, devicePixelRatio);
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
    />
  );
}
