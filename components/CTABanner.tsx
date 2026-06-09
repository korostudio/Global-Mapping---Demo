import Link from "next/link";
import Container from "./Container";
import content from "@/lib/content";

const { cta, contact } = content;

export default function CTABanner() {
  return (
    <section className="bg-[#00a9c2] py-14 sm:py-20 lg:py-24">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 lg:gap-12 items-center">

          <div>
            <h2
              className="font-condensed font-black uppercase text-white leading-none mb-4 sm:mb-5"
              style={{ fontSize: "clamp(30px, 4.5vw, 48px)" }}
            >
              {cta.heading[0]}{" "}
              <span className="text-[#0D2137]">{cta.highlight}</span>
            </h2>
            <p className="text-[14px] sm:text-[15px] font-light leading-[1.8] text-white max-w-[480px]">
              {cta.description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 sm:gap-4 w-full sm:w-auto items-stretch sm:items-start lg:items-end">
            <Link
              href="/contacto"
              className="font-condensed bg-[#0D2137] text-white font-black text-[13px] tracking-[0.12em] uppercase px-10 py-4 whitespace-nowrap hover:bg-[#071828] transition-colors text-center inline-flex justify-center rounded-[4px]"
            >
              Solicitar cotización
            </Link>
            <a
              href={`tel:${contact.phoneRaw}`}
              className="font-condensed text-white font-semibold text-[12px] tracking-[0.12em] uppercase px-8 py-4 border border-white/40 whitespace-nowrap hover:border-white/70 transition-colors text-center inline-flex justify-center rounded-[4px]"
            >
              {contact.phone}
            </a>
          </div>

        </div>
      </Container>
    </section>
  );
}
