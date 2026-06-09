"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "./Container";
import content from "@/lib/content";

const SERVICE_ITEMS = content.services.items;

function ServicesDropdown() {
  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50">
      <div className="bg-white border border-[#E5E7EB] shadow-xl rounded-[6px] py-2 w-[270px]">
        {SERVICE_ITEMS.map((s) => (
          <Link
            key={s.title}
            href="/servicios"
            className="flex items-center gap-3 px-4 py-3 hover:bg-[#F4F6F8] group transition-colors"
          >
            <span className="text-[20px] text-[#00a9c2] flex-shrink-0 w-7 text-center leading-none">
              {s.icon}
            </span>
            <span className="font-condensed text-[13px] font-bold uppercase tracking-[0.06em] text-[#0D2137] group-hover:text-[#00a9c2] transition-colors leading-tight">
              {s.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 bg-white border-b border-[#E5E7EB] transition-shadow duration-200 ${scrolled ? "shadow-md" : ""}`}>
      <Container>
        <div className="flex items-center justify-between h-[68px] gap-8">

          <Link href="/" className="flex-shrink-0">
            <Image
              src="/logo.svg"
              alt={content.company.name}
              width={200}
              height={50}
              sizes="200px"
              className="h-11 w-auto"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7 flex-1 justify-center">
            {content.nav.map((l) => {
              if (l.label === "Servicios") {
                return (
                  <div
                    key={l.href}
                    className="relative py-2 -my-2"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    <button className={`font-condensed text-[15px] font-semibold tracking-[0.1em] uppercase transition-colors whitespace-nowrap flex items-center gap-1 ${servicesOpen ? "text-[#0D2137]" : "text-[#6B7280] hover:text-[#0D2137]"}`}>
                      {l.label}
                      <svg
                        width="11" height="11" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth={2.5}
                        className={`transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                      </svg>
                    </button>
                    {servicesOpen && <ServicesDropdown />}
                  </div>
                );
              }
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className="font-condensed text-[15px] font-semibold tracking-[0.1em] uppercase text-[#6B7280] hover:text-[#0D2137] transition-colors whitespace-nowrap"
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop: Search + CTA */}
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            <NavSearch />
            <Link
              href="/contacto"
              className="font-condensed bg-[#00a9c2] text-white font-bold text-[12px] tracking-[0.1em] uppercase px-5 py-3 whitespace-nowrap hover:bg-[#007F94] transition-colors rounded-[4px]"
            >
              Solicitar cotización
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 text-[#6B7280] ml-auto"
            onClick={() => setOpen(!open)}
            aria-label="Menú"
            aria-expanded={open}
          >
            {open
              ? <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              : <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
            }
          </button>
        </div>
      </Container>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-[#E5E7EB] bg-white">
          <Container>
            <div className="flex flex-col py-4">

              {/* Mobile search */}
              <div className="relative mb-3">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" width="15" height="15" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" d="M21 21l-4.35-4.35" />
                </svg>
                <input
                  type="search"
                  placeholder="Buscar..."
                  className="w-full pl-9 pr-4 py-2.5 text-[13px] border border-[#E5E7EB] text-[#374151] placeholder-[#9CA3AF] focus:outline-none focus:border-[#00a9c2] rounded-[4px]"
                />
              </div>

              {content.nav.map((l) => {
                if (l.label === "Servicios") {
                  return (
                    <div key={l.href}>
                      <button
                        onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                        className="w-full flex items-center justify-between font-condensed text-[12px] font-semibold tracking-[0.1em] uppercase text-[#6B7280] hover:text-[#0D2137] py-3 border-b border-[#F4F6F8] transition-colors"
                      >
                        {l.label}
                        <svg
                          width="12" height="12" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth={2.5}
                          className={`transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                        </svg>
                      </button>

                      {mobileServicesOpen && (
                        <div className="bg-[#F4F6F8] rounded-[4px] my-1 overflow-hidden">
                          {SERVICE_ITEMS.map((s) => (
                            <Link
                              key={s.title}
                              href="/servicios"
                              onClick={() => { setOpen(false); setMobileServicesOpen(false); }}
                              className="flex items-center gap-3 px-4 py-3 border-b border-[#E5E7EB] last:border-0 hover:bg-[#E0F6FA] transition-colors group"
                            >
                              <span className="text-[16px] text-[#00a9c2] flex-shrink-0 w-6 text-center leading-none">
                                {s.icon}
                              </span>
                              <span className="font-condensed text-[11px] font-bold uppercase tracking-[0.06em] text-[#374151] group-hover:text-[#0D2137] transition-colors">
                                {s.title}
                              </span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="font-condensed text-[12px] font-semibold tracking-[0.1em] uppercase text-[#6B7280] hover:text-[#0D2137] py-3 border-b border-[#F4F6F8] transition-colors"
                  >
                    {l.label}
                  </Link>
                );
              })}

              <Link
                href="/contacto"
                onClick={() => setOpen(false)}
                className="font-condensed bg-[#00a9c2] text-white font-bold text-[12px] tracking-[0.1em] uppercase py-3.5 text-center mt-3 hover:bg-[#007F94] transition-colors rounded-[4px]"
              >
                Solicitar cotización
              </Link>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}

function NavSearch() {
  const [expanded, setExpanded] = useState(false);
  const [query, setQuery] = useState("");

  return (
    <div className="relative flex items-center">
      <div
        className="flex items-center overflow-hidden border border-[#E5E7EB] transition-all duration-300 rounded-[4px]"
        style={{ width: expanded ? "200px" : "36px", background: expanded ? "#fff" : "transparent" }}
      >
        <button
          id="navbar-search-btn"
          aria-label="Buscar"
          onClick={() => setExpanded((v) => !v)}
          className="flex-shrink-0 w-9 h-9 flex items-center justify-center text-[#6B7280] hover:text-[#00a9c2] transition-colors"
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" d="M21 21l-4.35-4.35" />
          </svg>
        </button>
        {expanded && (
          <input
            autoFocus
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onBlur={() => { if (!query) setExpanded(false); }}
            placeholder="Buscar..."
            className="flex-1 pr-3 py-2 text-[13px] text-[#374151] placeholder-[#9CA3AF] bg-transparent focus:outline-none"
          />
        )}
      </div>
    </div>
  );
}
