import Navbar from "@/components/shared/header/Navbar";
import Hero from "@/components/shared/hero/Hero";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Navbar />
      <section>
        <Hero />
      </section>
      
    </main>
  );
}
