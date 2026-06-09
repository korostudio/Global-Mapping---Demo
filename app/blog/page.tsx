import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UnderConstruction from "@/components/UnderConstruction";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Artículos, noticias y novedades sobre geomática, LiDAR, topografía y tecnología geoespacial en Perú y Latinoamérica.",
};

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <UnderConstruction title="Blog" />
      <Footer />
    </>
  );
}
