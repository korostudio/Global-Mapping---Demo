"use client";
import { useEffect, useRef, useState } from "react";
import Container from "./Container";
import content from "@/lib/content";

function parseNum(big: string): { prefix: string; num: number; withComma: boolean } {
  const prefix = big.startsWith("+") ? "+" : "";
  const digits = big.replace(/[^0-9,]/g, "");
  const withComma = digits.includes(",");
  const num = parseInt(digits.replace(/,/g, ""), 10);
  return { prefix, num, withComma };
}

function format(n: number, withComma: boolean): string {
  return withComma ? n.toLocaleString("en-US") : String(n);
}

function CountUp({
  big, unit, desc, delay,
}: {
  big: string; unit: string; desc: string; delay: number;
}) {
  const { prefix, num, withComma } = parseNum(big);
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
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
    }, delay);
    return () => clearTimeout(timeout);
  }, [started, num, delay]);

  return (
    <div
      ref={ref}
      className="bg-[#0D2137] px-4 py-8 sm:px-6 sm:py-10 text-center group cursor-default border-b-[3px] border-transparent hover:border-[#00a9c2] transition-colors duration-300"
    >
      <div
        className="font-condensed font-black leading-none text-white"
        style={{ fontSize: "clamp(28px, 4.5vw, 52px)" }}
      >
        {prefix}{format(count, withComma)}
        {unit && (
          <span className="text-[16px] sm:text-[22px] font-semibold text-[#00a9c2] ml-0.5">
            {unit}
          </span>
        )}
      </div>
      <div className="font-condensed text-[11px] sm:text-[13px] font-semibold tracking-[0.12em] uppercase text-white/40 mt-2 sm:mt-3 group-hover:text-white/70 transition-colors duration-300">
        {desc}
      </div>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="bg-[#0D2137] py-10 sm:py-16">
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.08]">
          {content.statBand.map((s, i) => (
            <CountUp
              key={s.desc}
              big={s.big}
              unit={s.unit}
              desc={s.desc}
              delay={i * 150}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
