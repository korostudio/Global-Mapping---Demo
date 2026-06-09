import Link from "next/link";
import Container from "./Container";
import content from "@/lib/content";

const { whyUs } = content;

export default function WhyUs() {
  return (
    <section className="bg-[#F4F6F8] py-14 sm:py-20 lg:py-24">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">

          <div>
            <div className="section-label">{whyUs.label}</div>
            <h2
              className="font-condensed font-black uppercase text-[#0D2137] leading-none mt-3 mb-5 sm:mb-6"
              style={{ fontSize: "clamp(28px, 4vw, 42px)" }}
            >
              {whyUs.heading.map((line, i) => (
                <span key={i}>{line}{i < whyUs.heading.length - 1 && <br />}</span>
              ))}
            </h2>
            <p className="text-[14px] sm:text-[15px] font-light leading-[1.8] text-[#6B7280] mb-8 sm:mb-10 max-w-xl md:max-w-[340px]">
              {whyUs.description}
            </p>
            <Link
              href="/nosotros"
              className="font-condensed bg-[#00a9c2] text-white font-bold text-[12px] tracking-[0.12em] uppercase px-8 py-3.5 inline-flex items-center gap-2 hover:bg-[#007F94] transition-colors rounded-[4px]"
            >
              Conocer más →
            </Link>
          </div>

          <div className="flex flex-col gap-px bg-[#E5E7EB]">
            {whyUs.items.map((item) => (
              <div key={item.num} className="bg-white p-5 sm:p-7 flex gap-4 sm:gap-6 items-start">
                <div className="font-condensed text-[26px] sm:text-[30px] font-black text-[#00a9c2] leading-none flex-shrink-0 w-8 sm:w-10 pt-0.5">
                  {item.num}
                </div>
                <div>
                  <h4 className="font-condensed text-[15px] sm:text-[16px] font-bold uppercase tracking-[0.05em] text-[#0D2137] mb-1.5 sm:mb-2">
                    {item.title}
                  </h4>
                  <p className="text-[14px] sm:text-[15px] font-light leading-[1.7] text-[#6B7280]">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </Container>
    </section>
  );
}
