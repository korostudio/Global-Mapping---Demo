import Link from "next/link";
import Container from "./Container";

interface Props {
  title: string;
}

export default function UnderConstruction({ title }: Props) {
  return (
    <main className="flex-1 flex items-center bg-[#F4F6F8]">
      <Container>
        <div className="py-32 text-center">
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#00a9c2"
            strokeWidth={1.5}
            className="mx-auto mb-8"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
          </svg>

          <div className="section-label justify-center mb-4">{title}</div>

          <h1
            className="font-condensed font-black uppercase text-[#0D2137] leading-none mb-5"
            style={{ fontSize: "clamp(36px, 5vw, 56px)" }}
          >
            Página en{" "}
            <span className="text-[#00a9c2]">construcción</span>
          </h1>

          <p className="text-[15px] font-light leading-[1.75] text-[#6B7280] max-w-[440px] mx-auto mb-10">
            Estamos trabajando en esta sección. Vuelve pronto o contáctanos directamente.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/"
              className="font-condensed bg-[#00a9c2] text-white font-bold text-[12px] tracking-[0.12em] uppercase px-8 py-3.5 hover:bg-[#007F94] transition-colors rounded-[4px]"
            >
              ← Volver al inicio
            </Link>
            <Link
              href="/contacto"
              className="font-condensed text-[#0D2137] font-semibold text-[12px] tracking-[0.12em] uppercase px-7 py-3.5 border border-[#E5E7EB] hover:border-[#0D2137] transition-colors rounded-[4px]"
            >
              Contactar
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
}
