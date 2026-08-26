import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SERVICES } from "../data";
import { ServiceItem } from "../types";
import {
  Globe,
  Paintbrush,
  Smartphone,
  Palette,
  Video,
  Search,
  Youtube,
  Sparkles,
  ShieldAlert,
  TrendingUp,
  CheckCircle,
  HelpCircle,
  ArrowRight
} from "lucide-react";

interface ServicesProps {
  onInquireClick: (serviceTitle?: string) => void;
}

// Icon mapper helper
const getIcon = (name: string) => {
  switch (name) {
    case "Globe":
      return <Globe className="w-6 h-6" />;
    case "Figma":
      return <Paintbrush className="w-6 h-6" />;
    case "Smartphone":
      return <Smartphone className="w-6 h-6" />;
    case "Palette":
      return <Palette className="w-6 h-6" />;
    case "Video":
      return <Video className="w-6 h-6" />;
    case "Search":
      return <Search className="w-6 h-6" />;
    case "Youtube":
      return <Youtube className="w-6 h-6" />;
    case "Sparkles":
      return <Sparkles className="w-6 h-6" />;
    case "ShieldCheck":
      return <ShieldAlert className="w-6 h-6" />; // custom secure badge
    case "TrendingUp":
      return <TrendingUp className="w-6 h-6" />;
    default:
      return <HelpCircle className="w-6 h-6" />;
  }
};

export default function Services({ onInquireClick }: ServicesProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Development", "Design", "SEO"];

  const filteredServices = SERVICES.filter(
    (service) => selectedCategory === "All" || service.category === selectedCategory
  );

  return (
    <section id="services" className="relative py-24 sm:py-32 bg-dark-carbon overflow-hidden">
      {/* Background aesthetics */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute top-[-10%] left-[20%] w-[40vw] h-[40vw] bg-neutral-900/40 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[10%] w-[35vw] h-[35vw] bg-brand/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Grid line layer */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase leading-[1.1]">
            Services
          </h2>

          {/* Dynamic Categories Filtering Rail */}
          <div className="mt-8 flex flex-wrap justify-center items-center gap-2" id="service-filters">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 pointer-events-auto cursor-pointer ${
                  selectedCategory === category
                    ? "bg-brand text-white text-glow shadow-lg shadow-brand/20 border border-brand/50"
                    : "bg-white/5 text-white/50 hover:text-white border border-white/5 hover:bg-white/10"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Service Cards Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          id="services-deck"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="contents"
            >
              {filteredServices.map((service) => (
                <div
                  key={service.id}
                  className="group relative flex flex-col justify-between p-8 rounded-2xl glass-card transition-all duration-300 border-glow-hover hover:border-brand/40 overflow-hidden cursor-pointer hover:-translate-y-2"
                  onClick={() => onInquireClick(service.title)}
                >
                  {/* Internal hover glowing backdrop light */}
                  <div className="absolute inset-0 bg-gradient-to-br from-brand/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Service Badge / Category */}
                  <div className="flex items-center justify-between mb-6">
                    {service.badge && (
                      <span className="bg-brand/10 text-brand font-mono text-[10px] font-extrabold px-2.5 py-1 rounded-full border border-brand/20 uppercase tracking-widest">
                        {service.badge}
                      </span>
                    )}
                  </div>

                  {/* Icon & Title */}
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand mb-5 group-hover:scale-110 group-hover:bg-brand group-hover:text-white group-hover:rotate-6 transition-all duration-300">
                      {getIcon(service.iconName)}
                    </div>

                    <h3 className="font-display font-bold text-lg text-white group-hover:text-brand tracking-tight transition-colors">
                      {service.title}
                    </h3>

                    <p className="mt-3 text-white/50 text-xs sm:text-sm leading-relaxed font-light">
                      {service.description}
                    </p>

                    {/* Features list bullet layout */}
                    <ul className="mt-6 space-y-2 border-t border-white/5 pt-5">
                      {service.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-brand flex-shrink-0" />
                          <span className="text-white/70 text-xs font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
