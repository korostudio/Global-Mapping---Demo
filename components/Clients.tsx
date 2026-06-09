import Image from "next/image";
import Container from "./Container";
import content from "@/lib/content";

const { clients } = content;

const LOGOS: Record<string, string> = {
  "Anglo American":  "/Home/Clientes/imgi_11_anglo-american-footer-logo.svg",
  "Barrick Gold":    "/Home/Clientes/imgi_12_BARRICK-GOLD-logo.svg",
  "Southern Copper": "/Home/Clientes/imgi_14_southern-logo.webp",
  "Newmont":         "/Home/Clientes/imgi_18_Newmont_Yanacocha.webp",
  "Hochschild":      "/Home/Clientes/imgi_17_Hochschild_Mining_logo.svg.webp",
  "Buenaventura":    "/Home/Clientes/imgi_16_Buenaventura_logo.svg.webp",
  "Nexa":            "/Home/Clientes/imgi_15_NEXA_MARCA_BAIXA.webp",
  "Poderosa":        "/Home/Clientes/imgi_13_logo-poderosa.svg",
};

// Duplicated list for seamless infinite loop
const LOOP = [...clients.names, ...clients.names];

export default function Clients() {
  return (
    <section className="bg-white py-14 sm:py-20 lg:py-24 border-t border-[#E5E7EB]">
      <Container>
        <div className="flex items-baseline justify-between mb-10 sm:mb-14 flex-wrap gap-4">
          <div>
            <div className="section-label">{clients.label}</div>
            <h2
              className="font-condensed font-black uppercase text-[#0D2137] mt-3"
              style={{ fontSize: "clamp(24px, 3.5vw, 36px)" }}
            >
              {clients.heading}
            </h2>
          </div>
          <span className="font-condensed text-[11px] sm:text-[12px] font-medium tracking-[0.08em] uppercase text-[#a09e9c]">
            {clients.count}
          </span>
        </div>
      </Container>

      {/* Full-width marquee */}
      <div className="marquee-wrapper border-t border-b border-[#E5E7EB] py-8 sm:py-10">
        <div className="marquee-track flex flex-row flex-nowrap items-center" style={{ width: "max-content" }}>
          {LOOP.map((name, i) => (
            <div key={i} className="logo-cell flex-shrink-0 flex items-center justify-center cursor-pointer" style={{ padding: "0 52px" }}>
              {LOGOS[name] ? (
                <Image
                  src={LOGOS[name]}
                  alt={name}
                  width={160}
                  height={60}
                  style={{
                    width: "auto",
                    height: "48px",
                    maxWidth: "140px",
                    objectFit: "contain",
                  }}
                />
              ) : (
                <span className="font-condensed text-[14px] font-bold tracking-[0.08em] uppercase text-[#a09e9c] whitespace-nowrap">
                  {name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
