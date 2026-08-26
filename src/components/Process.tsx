import { motion } from "motion/react";
import { PROCESS_STEPS } from "../data";
import { Eye, Layers, Code2, Rocket, ArrowRight } from "lucide-react";

const getProcessIcon = (iconName: string) => {
  switch (iconName) {
    case "Eye":
      return <Eye className="w-5 h-5" />;
    case "Figma":
      return <Layers className="w-5 h-5" />;
    case "Code2":
      return <Code2 className="w-5 h-5" />;
    case "Rocket":
      return <Rocket className="w-5 h-5" />;
    default:
      return <Code2 className="w-5 h-5" />;
  }
};

export default function Process() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 18,
      },
    },
  };

  return (
    <section id="process" className="relative py-24 sm:py-32 bg-dark-carbon overflow-hidden">
      {/* Background grids & lights */}
      <div className="absolute top-[30%] left-[5%] w-[30vw] h-[30vw] bg-brand/5 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute top-[1px] w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      {/* Grid Pattern overlays */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase leading-[1.1]">
            Our Execution Roadmap
          </h2>
          <p className="mt-4 text-white/50 text-sm font-light">
            A clear, step-by-step process designed to take your project from an initial idea to a successful launch.
          </p>
        </div>

        {/* Step Cards with Connected Pipeline Flow */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative"
          id="process-deck"
        >
          {PROCESS_STEPS.map((step, idx) => {
            const IconComponent = getProcessIcon(step.iconName);

            return (
              <motion.div
                key={step.number}
                variants={cardVariants}
                className="relative group flex flex-col justify-between p-7 rounded-2xl glass-card transition-all duration-300 border border-white/5 hover:border-brand/30"
                id={`process-node-${step.number}`}
              >
                {/* Visual Pipeline Link Header for Desktop/Tablets */}
                {idx < 3 && (
                  <div className="hidden lg:block absolute top-[44px] left-[calc(100%-8px)] w-[calc(100%-25px)] h-[2px] bg-gradient-to-r from-brand/50 to-transparent z-0 overflow-hidden pointer-events-none">
                    <motion.div
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                      className="w-1/2 h-full bg-gradient-to-r from-transparent via-brand to-transparent"
                    />
                  </div>
                )}

                <div>
                  {/* Step ID Header */}
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-gradient font-display font-black text-4xl sm:text-5xl text-brand/20 group-hover:text-brand/40 transition-colors">
                      {step.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand group-hover:scale-110 group-hover:bg-brand group-hover:text-white transition-all duration-300 shadow-md">
                      {IconComponent}
                    </div>
                  </div>

                  {/* Copy */}
                  <h3 className="font-display font-black text-sm tracking-widest text-white uppercase mb-3">
                    {step.title}
                  </h3>
                  <p className="text-white/50 text-xs sm:text-sm leading-relaxed font-light">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
