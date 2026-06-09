import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UnderConstruction from "@/components/UnderConstruction";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Servicios",
  description: "LiDAR aerotransportado, topografía, fotogrametría, supervisión topográfica y diseños de ingeniería. Servicios geoespaciales de alta precisión.",
};

export default function ServiciosPage() {
  return (
    <>
      <Navbar />
      <UnderConstruction title="Servicios" />
      <Footer />
    </>
  );
}
