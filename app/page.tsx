import Achievements from "@/components/shared/achievements/Achievements";
import Clients from "@/components/shared/clients/Clients";
import Contact from "@/components/shared/contact/Contact";
import Hero from "@/components/shared/hero/Hero";
import Intro from "@/components/shared/intro/Intro";
import Offer from "@/components/shared/offer/Offer";
import Process from "@/components/shared/process/Process";

export default function Home() {
  return (
    <main>
      <div className="flex flex-col gap-10 sm:gap-14 md:gap-16 lg:gap-20 min-h-screen">
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
          <Achievements />
        </section>
        <section>
          <Process />
        </section>
        <section>
          <Offer />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </div>
    </main>
  );
}
