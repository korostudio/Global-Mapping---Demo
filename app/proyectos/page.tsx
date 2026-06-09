import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UnderConstruction from "@/components/UnderConstruction";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Proyectos",
  description: "Más de 1,100 proyectos ejecutados en minería, energía, infraestructura y construcción. Casos de éxito de Global Mapping en Perú y Latinoamérica.",
};

export default function ProyectosPage() {
  return (
    <>
      <Navbar />
      <UnderConstruction title="Proyectos" />
      <Footer />
    </>
  );
}
