import { useState } from "react";
import { motion } from "motion/react";
import profileImage from "../../assets/download.png";
import { Target, Award, Eye } from "lucide-react";

export default function About() {
  const [activeTab, setActiveTab] = useState<"mission" | "vision" | "philosophy">("mission");

  const tabsContent = {
    mission: {
      title: "FORGING CONVERSION ENGINE LOOPS",
      description: "Our mission is to replace boring structural websites and flat creator layouts with stunning, custom high-performance models. We combine hyper-optimized WebXR frameworks, retention engineering pipelines, and semantic positioning elements so high-end businesses command attention.",
      icon: Target,
      bullets: [
        "Unlocking 60fps GPU fluid motion layouts",
        "Pacing creator content for maximum average duration loops",
        "Targeting structural core web vitals absolute scale (99+ score)",
      ],
    },
    vision: {
      title: "THE FUTURE OF INTERACTION GRAPHICS",
      description: "We envision a digital world where every elite agency and content creator brand is powered by a high-energy, responsive tactile workspace. Aether seeks to establish the standard for luxury digital interfaces that unify form, animation, and growth psychology.",
      icon: Eye,
      bullets: [
        "Eliminating basic boilerplate templates universally",
        "Pioneering integrated WebGL configurators for eCommerce",
        "Powering cross-platform native app acquisition funnels",
      ],
    },
    philosophy: {
      title: "LUXURY CRAFTSMANSHIP & RIGOR",
      description: "True digital authority is earned in pixels. We discard standard generic layouts. Our team designs each border-glow, typography pairing, and motion delay from scratch, guaranteeing your platform is an undeniable, prestigious masterwork.",
      icon: Award,
      bullets: [
        "Strictly bespoke layouts designed individually from zero",
        "High contrast contrast layouts for pristine structural layout",
        "Continuous optimization keeping code highly agile",
      ],
    },
  };

  const ActiveIcon = tabsContent[activeTab].icon;

  return (
    <section id="about" className="relative py-24 sm:py-32 bg-dark-obsidian overflow-hidden">
      {/* Background visual accents */}
      <div className="absolute top-[40%] right-[-10%] w-[40vw] h-[40vw] bg-neutral-900/40 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[5%] left-[-5%] w-[25vw] h-[25vw] bg-brand/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
      <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase leading-[1.1]">
            About Me
          </h2>
          </div>


        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
           <div className="lg:col-span-6 space-y-8" id="about-team-spotlights">
<motion.p
            className="mt-6 text-white text-sm sm:text-xl font-light leading-relaxed"
          >I'm a Certified Software Engineer who helps businesses build modern, high-performing websites and applications from concept to deployment.
</motion.p>
<motion.p
            className="mt-6 text-white text-md sm:text-xl font-light leading-relaxed"
          >Before development begins, I often create a working homepage prototype based on your requirements. This allows you to visualize the design, provide feedback early, and move forward with confidence instead of relying on assumptions. This collaborative approach helps ensure the final product aligns with your vision from the very beginning.
</motion.p>
<motion.p
            className="mt-6 text-white text-md sm:text-xl font-light leading-relaxed"
          >With 3+ years of experience working directly with clients, I've built websites and applications that are fast, responsive, user-friendly, and designed to support real business goals.
</motion.p>
<motion.p
            className="mt-6 text-white text-md sm:text-xl font-light leading-relaxed"
          > I believe great digital products should do more than just look good—they should be fast, intuitive, secure, and effective at converting visitors into customers. Whether you need a WordPress website, a fully custom web application, or a mobile app, I can manage the entire process from planning and design to development, testing, and deployment.
          </motion.p>
          </div>

          {/* Right Column: Portrait Image with Neon Glow Effect */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center pt-8 lg:pt-0" id="about-portrait-image-wrapper">
            <div className="relative w-full max-w-[400px] aspect-[9/16] rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(244,63,94,0.3)] border-2 border-brand/60 hover:shadow-[0_0_60px_rgba(244,63,94,0.5)] transition-all duration-500 group mx-auto">
              <img
                src={profileImage}
                alt="Portrait"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
