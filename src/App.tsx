import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Work from "./components/Work";
import Process from "./components/Process";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

export default function App() {
  const [selectedService, setSelectedService] = useState<string>("");

  const handleInquireRedirect = (serviceTitle?: string) => {
    if (serviceTitle) {
      setSelectedService(serviceTitle);
    }
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen bg-dark-obsidian text-white flex flex-col font-sans selection:bg-brand selection:text-white" id="portfolio-root">
      {/* Sticky frosted Navbar */}
      <Header onInquireClick={() => handleInquireRedirect()} />

      {/* Hero Entrance Stage */}
      <Hero onInquireClick={() => handleInquireRedirect()} />

      {/* About Narrative Block */}
      <About />

      {/* Services Grid (10 custom cards) */}
      <Services onInquireClick={handleInquireRedirect} />

      {/* Case Studies Portfolio */}
      <Work />

      {/* Process pipeline timeline */}
      <Process />

      {/* Testimonials dynamic carousel */}
      {/* <Testimonials /> */}

      {/* Lead Contact Module */}
      <Contact initialService={selectedService} />

      {/* Clean Copyright footer */}
      <Footer />

      <WhatsAppButton />
    </div>
  );
}
