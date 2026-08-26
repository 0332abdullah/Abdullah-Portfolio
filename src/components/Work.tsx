import { motion } from "motion/react";
import { PORTFOLIO_PROJECTS } from "../data";
import { ArrowUpRight } from "lucide-react";

export default function Work() {
  return (
    <section id="work" className="relative py-24 sm:py-32 bg-dark-obsidian overflow-hidden">
      {/* Visual background elements */}
      <div className="absolute top-[20%] left-[-10%] w-[35vw] h-[35vw] bg-brand/5 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-1%] w-[25vw] h-[25vw] bg-neutral-900 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase leading-[1.1]">
              My work
            </h2>
          </div>

          <div className="flex items-center">
<p className="mt-4 text-white/50 text-sm max-w-xl font-light">
              Real projects built for speed, strong conversion rates, and steady business growth.
            </p>
          </div>
        </div>

        {/* Portfolio Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="portfolio-grid">
          {PORTFOLIO_PROJECTS.map((project, idx) => (
            <motion.a
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              key={project.id}
              href={project.link || "#"}
              target="_blank"
              rel="noreferrer"
              className="group relative h-[380px] sm:h-[450px] rounded-3xl overflow-hidden cursor-pointer border border-white/5 shadow-2xl"
              id={`project-card-${project.id}`}
            >
              {/* Image Frame with hover zoom */}
              <div className="absolute inset-0">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.4] group-hover:brightness-[0.45] referrer-policy"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Dynamic Gradient backdrop mask */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/40 opacity-90 group-hover:opacity-80 transition-opacity" />

              {/* Glowing Corner Light */}
              <div className="absolute inset-0 bg-radial-gradient(circle at bottom left, rgba(255, 68, 0, 0.15), transparent 60%) opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <span className="absolute top-6 right-6 z-10 w-9 h-9 rounded-full bg-white/10 group-hover:bg-brand group-hover:scale-110 flex items-center justify-center text-white transition-all duration-300">
                <ArrowUpRight className="w-4 h-4" />
              </span>

              {/* Narrative Block (Bottom) */}
              <div className="absolute bottom-0 left-0 w-full p-8">
                <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight uppercase leading-[1.1] group-hover:text-glow transition-all">
                  {project.title}
                </h3>

              </div>
            </motion.a>
          ))}
        </div>
      </div>

    </section>
  );
}
