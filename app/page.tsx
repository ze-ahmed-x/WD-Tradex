import Clients from "@/components/shared/clients/Clients";
import Navbar from "@/components/shared/header/Navbar";
import Hero from "@/components/shared/hero/Hero";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Navbar />
      <div className="flex flex-col gap-4 sm:gap-6 md:gap-7 lg:gap-8 min-h-screen">
        <section>
          <Hero />
        </section>
        <section>
          <Clients />
        </section>
      </div>
    </main>
  );
}
