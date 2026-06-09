import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UnderConstruction from "@/components/UnderConstruction";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Contacta a Global Mapping para solicitar una cotización. Jr. Carlos Neuhaus 135, San Isidro, Lima. Tel: +51 945 651 330.",
};

export default function ContactoPage() {
  return (
    <>
      <Navbar />
      <UnderConstruction title="Contacto" />
      <Footer />
    </>
  );
}
