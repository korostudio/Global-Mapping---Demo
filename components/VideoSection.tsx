"use client";
import { useState } from "react";
import Container from "./Container";

const VIDEO_ID = "t86YfAz_3UQ";
const START_SEC = 206;

export default function VideoSection() {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="bg-[#0D2137] py-14 sm:py-20 lg:py-24 border-t border-white/[0.06]">
      <Container>

        <div className="flex flex-col items-center text-center mb-8 sm:mb-12">
          <div className="section-label justify-center mb-3">Video institucional</div>
          <h2
            className="font-condensed font-black uppercase text-white leading-none"
            style={{ fontSize: "clamp(26px, 4vw, 42px)" }}
          >
            Conoce nuestro trabajo en campo
          </h2>
          <p className="text-[14px] sm:text-[15px] font-light text-white/50 mt-3 max-w-[500px] leading-relaxed">
            Sobrevuelos LiDAR, topografía y fotogrametría en proyectos reales en Perú y Latinoamérica.
          </p>
        </div>

        {/* Video container — 16:9 */}
        <div className="max-w-[860px] mx-auto">
          <div className="relative w-full rounded-[6px] overflow-hidden shadow-2xl" style={{ paddingBottom: "56.25%" }}>

            {!playing ? (
              <button
                onClick={() => setPlaying(true)}
                className="absolute inset-0 w-full h-full group"
                aria-label="Reproducir video"
              >
                {/* Thumbnail */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
                  alt="Video institucional Global Mapping"
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-[#0D2137]/55 group-hover:bg-[#0D2137]/30 transition-colors duration-400" />

                {/* Teal border on hover */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#00a9c2]/60 transition-colors duration-300 rounded-[6px]" />

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#00a9c2] group-hover:bg-[#007F94] group-hover:scale-110 transition-all duration-300 flex items-center justify-center shadow-2xl">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="white" className="ml-1">
                        <polygon points="5,3 19,12 5,21" />
                      </svg>
                    </div>
                    <span className="font-condensed text-[11px] font-semibold tracking-[0.14em] uppercase text-white/70 group-hover:text-white transition-colors duration-300">
                      Reproducir video
                    </span>
                  </div>
                </div>
              </button>
            ) : (
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&start=${START_SEC}&rel=0&modestbranding=1`}
                title="Global Mapping — Video institucional"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}

          </div>
        </div>

      </Container>
    </section>
  );
}
