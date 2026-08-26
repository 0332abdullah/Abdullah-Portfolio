import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";
import { AGENCY_TAGLINE, SYSTEM_STATS } from "../data";
import FlowingCanvas from "./FlowingCanvas";
import TechSwarm from "./TechSwarm";

interface HeroProps {
  onInquireClick: () => void;
}

export default function Hero({ onInquireClick }: HeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  };

  const slowFloat = {
    animate: {
      y: [0, -15, 0],
      rotate: [0, 4, -4, 0],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };



  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden mesh-gradient"
    >
      {/* High-fidelity interactive constellation vector background */}
      <FlowingCanvas />

      {/* Decorative Neon Blurs */}
      <div className="absolute top-[25%] left-[10%] w-[35vw] h-[35vw] bg-brand/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen animate-pulse duration-5000" />
      <div className="absolute bottom-[15%] right-[15%] w-[30vw] h-[30vw] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />

      {/* Grid Pattern overlays */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Hero Copy (Left 7 Cols) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col justify-center text-left"
          id="hero-text-container"
        >
          {/* Heading with continuous glowing accent */}
          <motion.h1
            variants={itemVariants}
            className="font-display text-4xl sm:text-5xl xl:text-5xl font-extrabold tracking-tight text-white leading-[1.1] uppercase break-words"
          >
            Building digital <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand via-amber-400 to-brand text-glow break-words">
              experiences 
            </span>{" "}
            that matter.
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-6 text-white/70 text-md sm:text-xl font-light max-w-xl leading-relaxed"
          >I create modern websites, mobile apps, UI/UX designs, and creative visuals that help businesses build a strong digital presence. Combining design, technology, and creativity, I transform ideas into seamless digital experiences.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
          >
            <button
              onClick={onInquireClick}
              className="px-8 py-4 bg-brand text-white font-bold rounded-xl text-center hover:bg-brand-dim active:scale-95 transition-all duration-200 cursor-pointer text-glow border border-brand/30 hover:border-brand/60 pulse-glow"
              id="hero-primary-cta"
            >
              Discuss Your Idea
            </button>
            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl text-center border border-white/10 hover:border-white/20 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
              id="hero-secondary-cta"
            >
              Browse Skills
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </a>
          </motion.div>

          </motion.div>

        {/* Floating 3D Elements (Right 5 Cols) */}
        <div className="lg:col-span-5 relative flex flex-col items-center justify-center placeholder:pointer-events-none" id="hero-assets-visual">
          <TechSwarm>
            {/* Main Floating Neon Dashboard Plate */}
            <motion.div
              variants={slowFloat}
              animate="animate"
              className="relative w-full aspect-video rounded-2xl glass-card border border-white/10 p-6 shadow-2xl border-glow shadow-brand/10 overflow-hidden"
            >
              {/* Visual Header bar */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/5">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-brand" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500" />
                  <span className="w-3 h-3 rounded-full bg-green-500" />
                </div>
              </div>

              {/* Simulated UI layout */}
              <div className="font-mono text-xs sm:text-sm space-y-2 text-left text-white/90">
                <div>
                  <span className="text-brand font-bold">const</span> <span className="text-cyan-400">platform</span> = <span className="text-amber-400">new</span> <span className="text-emerald-400">ABC</span>();
                </div>
                <div>
                  <span className="text-cyan-400">platform</span>.<span className="text-purple-400">execute</span>({`{`}
                </div>
                <div className="pl-4">
                  <span className="text-white/75">output</span>: <span className="text-emerald-300">"Hello World"</span>,
                </div>
                <div className="pl-4">
                  <span className="text-white/75">message</span>: <span className="text-emerald-300">"Welcome to the right place."</span>
                </div>
                <div>{`});`}</div>
              </div>
            </motion.div>
          </TechSwarm>

          
        {/* Live system indicators */}
        <motion.div
          variants={itemVariants}
          className="w-full pt-8 border-t border-white/5 flex flex-row items-center justify-center gap-6 sm:gap-10 md:gap-12"
          id="hero-stats-row"
        >
          {SYSTEM_STATS.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center px-4">
              <span className="text-3xl text-center sm:text-2xl font-mono font-extrabold text-white tracking-tight">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 + idx * 0.15 }}
                >
                  {stat.value}
                </motion.span>
              </span>
              <span className="text-xs text-center text-transparent bg-clip-text bg-gradient-to-r from-brand via-amber-400 to-brand text-glow tracking-wider font-medium uppercase mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
        </div>

      </div>


    </section>
  );
}
