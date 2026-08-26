import { useState, useEffect, useRef } from "react";
import { TESTIMONIALS } from "../data";
import { Star, MessageSquareDot, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoRotation = () => {
    stopAutoRotation();
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 8500);
  };

  const stopAutoRotation = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  useEffect(() => {
    startAutoRotation();
    return () => stopAutoRotation();
  }, []);

  const handlePrev = () => {
    stopAutoRotation();
    setActiveIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
    startAutoRotation();
  };

  const handleNext = () => {
    stopAutoRotation();
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    startAutoRotation();
  };

  const current = TESTIMONIALS[activeIndex];

  return (
    <section id="testimonials" className="relative py-24 sm:py-32 bg-dark-obsidian overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-[20%] right-[-10%] w-[35vw] h-[35vw] bg-neutral-900/40 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[5%] left-[-5%] w-[25vw] h-[25vw] bg-brand/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase leading-[1.1]">
            Client Testimonials
          </h2>
        </div>

        {/* Carousel Frame */}
        <div className="relative" id="reviews-carousel-box">
          {/* Main decorative quote icon back drop */}
          <div className="absolute -top-10 -left-6 text-brand/5 z-0 pointer-events-none select-none">
            <MessageSquareDot className="w-36 h-36" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="relative p-8 sm:p-12 rounded-3xl glass-card border border-white/5 z-10 overflow-hidden"
            >
              {/* Internal glow dot */}
              <div className="absolute -top-12 -right-12 w-28 h-28 bg-brand/10 rounded-full blur-2xl" />

              {/* Star Rating & Quote Block */}
              <div className="flex flex-col h-full justify-between">
                <div>
                  <div className="flex gap-1 mb-6 text-yellow-500">
                    {Array.from({ length: current.rating }).map((_, idx) => (
                      <Star key={idx} className="w-5 h-5 fill-yellow-500 stroke-0" />
                    ))}
                  </div>

                  <p className="text-white/90 text-sm sm:text-lg font-light leading-relaxed italic pr-4">
                    &ldquo;{current.text}&rdquo;
                  </p>
                </div>

                {/* Profile row */}
                <div className="mt-8 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={current.avatarUrl}
                      alt={current.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-brand shadow-lg shadow-brand/10 referrer-policy"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="font-display font-bold text-white text-base">
                        {current.name}
                      </h4>
                      <p className="text-xs text-brand font-mono font-medium mt-0.5">
                        {current.role}
                      </p>
                    </div>
                  </div>

                  {/* Brand logo marker */}
                  <div className="px-4 py-2 rounded-xl bg-white/2 border border-white/5 text-[11px] font-display font-black text-white/50 tracking-wider">
                    {current.company.toUpperCase()}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Action Carousel Nav Controls */}
          <div className="mt-8 flex items-center justify-between z-20">
            {/* Index Tracker Indicators */}
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    stopAutoRotation();
                    setActiveIndex(idx);
                    startAutoRotation();
                  }}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    activeIndex === idx ? "w-8 bg-brand" : "w-2.5 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Indicator Handles */}
            <div className="flex gap-3">
              <button
                onClick={handlePrev}
                className="w-12 h-12 rounded-xl bg-neutral-900 border border-white/5 text-white flex items-center justify-center hover:bg-brand hover:border-brand/35 transition-colors cursor-pointer"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="w-12 h-12 rounded-xl bg-neutral-900 border border-white/5 text-white flex items-center justify-center hover:bg-brand hover:border-brand/35 transition-colors cursor-pointer"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
