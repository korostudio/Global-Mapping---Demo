import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UnderConstruction from "@/components/UnderConstruction";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nosotros",
  description: "Conoce al equipo detrás de Global Mapping. Más de 25 años de experiencia en geomática, LiDAR y topografía en Perú y Latinoamérica.",
};

export default function NosotrosPage() {
  return (
    <>
      <Navbar />
      <UnderConstruction title="Nosotros" />
      <Footer />
    </>
  );
}
