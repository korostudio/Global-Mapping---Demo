"use client";
import { useEffect, useState } from "react";
import content from "@/lib/content";

const { hero } = content;

function parseVal(val: string): { num: number; suffix: string; withComma: boolean } {
  const match = val.match(/^([\d,]+)(.*)/);
  if (!match) return { num: 0, suffix: val, withComma: false };
  const withComma = match[1].includes(",");
  const num = parseInt(match[1].replace(/,/g, ""), 10);
  return { num, suffix: match[2], withComma };
}

function format(n: number, withComma: boolean): string {
  return withComma ? n.toLocaleString("en-US") : String(n);
}

function StatItem({
  s, index,
}: {
  s: (typeof hero.stats)[number]; index: number;
}) {
  const { num, suffix, withComma } = parseVal(s.val);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const duration = 1800;
      const start = performance.now();
      const animate = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(eased * num));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }, 400 + index * 150);

    return () => clearTimeout(timeout);
  }, [num, index]);

  return (
    <div
      className={[
        "px-3 py-4 sm:px-4 sm:py-5 text-center bg-[rgba(13,33,55,0.85)] group cursor-default border-b-[2px] border-transparent hover:border-[#00a9c2] transition-colors duration-300",
        index % 2 !== 0 ? "border-l border-white/[0.08]" : "",
        index >= 2 ? "border-t border-white/[0.08] sm:border-t-0" : "",
        index > 0 ? "sm:border-l border-white/[0.08]" : "",
      ].join(" ")}
    >
      <div
        className="font-condensed font-black text-white leading-none"
        style={{ fontSize: "clamp(18px, 4vw, 30px)" }}
      >
        <span className="text-[#00a9c2]">{s.prefix}</span>
        {format(count, withComma)}{suffix}
      </div>
      <div className="font-condensed text-[9px] sm:text-[10px] font-semibold tracking-[0.1em] sm:tracking-[0.14em] uppercase text-white/40 group-hover:text-white/65 mt-1 sm:mt-1.5 transition-colors duration-300">
        {s.label}
      </div>
    </div>
  );
}

export default function HeroStats() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4">
      {hero.stats.map((s, i) => (
        <StatItem key={s.label} s={s} index={i} />
      ))}
    </div>
  );
}
