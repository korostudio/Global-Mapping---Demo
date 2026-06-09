import Container from "./Container";
import content from "@/lib/content";

const { services } = content;

export default function Services() {
  return (
    <section className="bg-white py-14 sm:py-20 lg:py-24">
      <Container>
        <div className="mb-8 sm:mb-12">
          <div className="section-label">{services.label}</div>
          <h2
            className="font-condensed font-black uppercase text-[#0D2137] leading-none mt-3"
            style={{ fontSize: "clamp(28px, 5vw, 44px)" }}
          >
            {services.heading}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-[#E5E7EB]">
          {services.items.map((s) => (
            <div key={s.title} className="service-card bg-white p-6 sm:p-8">
              <div className="text-[26px] sm:text-[28px] text-[#00a9c2] mb-4 sm:mb-5">{s.icon}</div>
              <h3 className="font-condensed text-[16px] font-bold uppercase tracking-[0.05em] text-[#0D2137] mb-2 sm:mb-3 leading-tight">
                {s.title}
              </h3>
              <p className="text-[14px] sm:text-[15px] font-light leading-[1.7] text-[#6B7280] mb-3 sm:mb-4">
                {s.description}
              </p>
              <div className="font-condensed text-[12px] font-semibold tracking-[0.1em] uppercase text-[#00a9c2]">
                {s.spec}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
