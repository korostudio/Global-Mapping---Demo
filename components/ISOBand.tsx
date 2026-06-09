import Container from "./Container";
import content from "@/lib/content";

export default function ISOBand() {
  return (
    <div className="bg-[#00a9c2]">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4 py-2.5">
          <span className="font-condensed text-[11px] sm:text-[12px] font-bold tracking-[0.15em] uppercase text-white">
            {content.company.iso} Certificado
          </span>
          <div className="w-px h-5 bg-white/35 hidden sm:block" />
          <span className="font-condensed text-[11px] sm:text-[12px] font-bold tracking-[0.15em] uppercase text-white/90 sm:text-white">
            Servicios de Geomática, Topografía y LiDAR
          </span>
        </div>
      </Container>
    </div>
  );
}
