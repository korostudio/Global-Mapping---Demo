import Image from "next/image";
import Container from "./Container";
import content from "@/lib/content";

const { sectors } = content;

export default function Sectors() {
  return (
    <section className="bg-[#F4F6F8] py-14 sm:py-20 lg:py-24 border-t border-[#E5E7EB]">
      <Container>
        <div className="section-label">{sectors.label}</div>
        <h2
          className="font-condensed font-black uppercase text-[#0D2137] leading-none mt-3 mb-8 sm:mb-12"
          style={{ fontSize: "clamp(28px, 4vw, 42px)" }}
        >
          {sectors.heading}
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#E5E7EB]">
          {sectors.items.map((s) => (
            <div key={s} className="sector-card h-[200px] sm:h-[260px] lg:h-[320px]">

              {/* Background image */}
              <div className="sector-img">
                <Image
                  src={`/Home/Proyectos/${encodeURIComponent(s)}.webp`}
                  alt={s}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>

              {/* Permanent bottom gradient */}
              <div className="sector-gradient" />

              {/* Teal hover overlay */}
              <div className="sector-overlay" />

              {/* Text content */}
              <div className="sector-content">
                <h4 className="font-condensed text-[15px] sm:text-[18px] font-black uppercase tracking-[0.05em] text-white mb-2 leading-tight">
                  {s}
                </h4>
                <div className="sector-tag font-condensed text-[11px] sm:text-[12px] font-semibold tracking-[0.1em] uppercase text-[#00a9c2]">
                  Proyectos de
                </div>
              </div>

            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
