import Clients from "@/components/shared/clients/Clients";
import Hero from "@/components/shared/hero/Hero";
import Intro from "@/components/shared/intro/Intro";
import Offer from "@/components/shared/offer/Offer";
import Process from "@/components/shared/process/Process";

export default function Home() {
  return (
    <main>
      <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 lg:gap-12 min-h-screen">
        <section>
          <Hero />
        </section>
        <section>
          <Clients />
        </section>
        <section>
          <Intro />
        </section>
        <section>
          <Process />
        </section>
        <section>
          <Offer />
        </section>
      </div>
    </main>
  );
}
