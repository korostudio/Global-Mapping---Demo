import Link from "next/link";
import Image from "next/image";
import Container from "./Container";
import content from "@/lib/content";

const { footer, contact, company } = content;

export default function Footer() {
  return (
    <footer>
      <div className="bg-[#0D2137] border-t border-white/[0.06]">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 py-12 sm:py-16">

            <div>
              <Image
                src="/logo.svg"
                alt={company.name}
                width={320}
                height={80}
                sizes="320px"
                className="h-14 sm:h-16 w-auto mb-5 sm:mb-6 brightness-0 invert"
              />
              <p className="text-[14px] sm:text-[15px] font-light leading-[1.8] text-white/38">
                {footer.description}
              </p>

              <div className="flex items-center gap-4 mt-5">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-white/35 hover:text-[#00a9c2] transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
                  </svg>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-white/35 hover:text-[#00a9c2] transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-white/35 hover:text-[#00a9c2] transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h5 className="font-condensed text-[11px] font-bold tracking-[0.18em] uppercase text-white/35 mb-4 sm:mb-6">
                Servicios
              </h5>
              <ul className="flex flex-col gap-2.5 sm:gap-3">
                {footer.serviceLinks.map((s) => (
                  <li key={s}>
                    <Link href="/servicios" className="text-[14px] sm:text-[15px] text-white/42 hover:text-[#00a9c2] transition-colors">
                      {s}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="font-condensed text-[11px] font-bold tracking-[0.18em] uppercase text-white/35 mb-4 sm:mb-6">
                Contacto
              </h5>
              <ul className="flex flex-col gap-2.5 sm:gap-3">
                <li className="text-[14px] sm:text-[15px] text-white/42 leading-[1.7]">
                  {contact.address}
                </li>
                <li>
                  <a href={`mailto:${contact.email}`} className="text-[14px] sm:text-[15px] text-white/42 hover:text-[#00a9c2] transition-colors">
                    {contact.email}
                  </a>
                </li>
                <li>
                  <a href={`tel:${contact.phoneRaw}`} className="text-[14px] sm:text-[15px] text-white/42 hover:text-[#00a9c2] transition-colors">
                    {contact.phone}
                  </a>
                </li>
              </ul>

              <div className="flex justify-start sm:justify-end mt-6">
                <Image
                  src="/ISO 90012015.webp"
                  alt="ISO 9001:2015"
                  width={100}
                  height={100}
                  className="h-20 w-auto brightness-0 invert opacity-60"
                />
              </div>
            </div>

          </div>
        </Container>
      </div>

      <div className="bg-[#071828] border-t border-white/[0.05]">
        <Container>
          <div className="flex justify-center items-center py-5">
            <p className="text-[13px] tracking-[0.04em] text-white/28 text-center">
              © 2026 {company.name} SAC. Todos los derechos reservados.
            </p>
          </div>
        </Container>
      </div>
    </footer>
  );
}
