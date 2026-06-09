import Link from "next/link";
import Container from "./Container";
import content from "@/lib/content";
import HeroStats from "./HeroStats";

const { hero } = content;

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0D2137]">
      <div className="hero-grid" />
      <div className="hero-accent" />

      <Container className="relative z-10 pt-24 pb-48 sm:pt-28 sm:pb-44">
        <div className="max-w-[580px]">
          {/* Eyebrow label — smaller on mobile */}
          <div className="section-label mb-4 sm:mb-5 text-[11px] sm:text-[13px]">{hero.eyebrow}</div>

          <h1
            className="font-condensed font-black uppercase text-white mb-5 sm:mb-6"
            style={{ fontSize: "clamp(36px, 8vw, 68px)", lineHeight: 0.93 }}
          >
            {hero.headline.map((line) => (
              <span key={line}>{line}<br /></span>
            ))}
            <span className="text-[#00a9c2]">{hero.highlight}</span>
          </h1>

          <p className="text-[15px] sm:text-[17px] font-light leading-[1.75] text-white/75 max-w-[440px] mb-8 sm:mb-10">
            {hero.description}
          </p>

          {/* Buttons: stack on mobile, row on sm+ */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link
              href="/servicios"
              className="font-condensed bg-[#00a9c2] text-white font-bold text-[12px] tracking-[0.12em] uppercase px-8 py-4 sm:py-3.5 hover:bg-[#007F94] transition-colors inline-flex items-center justify-center gap-2 rounded-[4px]"
            >
              Conocer servicios →
            </Link>
            <Link
              href="/contacto"
              className="font-condensed text-white font-semibold text-[12px] tracking-[0.12em] uppercase px-7 py-4 sm:py-3.5 border border-white/30 hover:border-white/70 transition-colors inline-flex items-center justify-center rounded-[4px]"
            >
              Solicitar cotización
            </Link>
          </div>
        </div>
      </Container>

      {/* Stats strip — always 2 cols on mobile, 4 on sm+ */}
      <div className="absolute bottom-0 inset-x-0 z-10 border-t border-white/[0.08]">
        <Container className="!px-0">
          <HeroStats />
        </Container>
      </div>
    </section>
  );
}
