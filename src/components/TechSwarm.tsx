import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Terminal, Code2, Server, Database, Globe, Cloud, Layout, Cpu } from "lucide-react";

interface TechItem {
  name: string;
  devicon: string;
  cat: "frontend" | "backend" | "cms" | "mobile" | "pwa" | "db" | "cloud" | "devops" | "api" | "design";
}

const TECH_POOL: TechItem[] = [
  // Frontend
  { name: "HTML5", devicon: "html5", cat: "frontend" },
  { name: "CSS3", devicon: "css3", cat: "frontend" },
  { name: "JavaScript", devicon: "javascript", cat: "frontend" },
  { name: "TypeScript", devicon: "typescript", cat: "frontend" },
  { name: "React.js", devicon: "react", cat: "frontend" },
  { name: "Next.js", devicon: "nextjs", cat: "frontend" },
  { name: "Vue.js", devicon: "vuejs", cat: "frontend" },
  { name: "Nuxt.js", devicon: "nuxtjs", cat: "frontend" },
  { name: "Angular", devicon: "angular", cat: "frontend" },
  { name: "Bootstrap", devicon: "bootstrap", cat: "frontend" },
  { name: "Tailwind CSS", devicon: "tailwindcss", cat: "frontend" },
  { name: "Sass/SCSS", devicon: "sass", cat: "frontend" },

  // Backend
  { name: "Node.js", devicon: "nodejs", cat: "backend" },
  { name: "Express.js", devicon: "express", cat: "backend" },
  { name: "NestJS", devicon: "nestjs", cat: "backend" },
  { name: "Python", devicon: "python", cat: "backend" },
  { name: "Django", devicon: "django", cat: "backend" },
  { name: "FastAPI", devicon: "fastapi", cat: "backend" },
  { name: "ASP.NET", devicon: "dotnetcore", cat: "backend" },
  { name: "C#", devicon: "csharp", cat: "backend" },
  { name: "Java", devicon: "java", cat: "backend" },
  { name: "Spring Boot", devicon: "spring", cat: "backend" },
  { name: "Ruby on Rails", devicon: "rails", cat: "backend" },

  // CMS
  { name: "WordPress", devicon: "wordpress", cat: "cms" },
  { name: "WooCommerce", devicon: "woocommerce", cat: "cms" },
  { name: "Shopify", devicon: "shopify", cat: "cms" },
  { name: "Magento", devicon: "magento", cat: "cms" },
  { name: "Drupal", devicon: "drupal", cat: "cms" },
  { name: "Joomla", devicon: "joomla", cat: "cms" },
  { name: "Webflow", devicon: "webflow", cat: "cms" },
  { name: "Wix", devicon: "wix", cat: "cms" },
  { name: "Squarespace", devicon: "squarespace", cat: "cms" },
  { name: "OpenCart", devicon: "opencart", cat: "cms" },

  // Mobile
  { name: "Swift (iOS)", devicon: "swift", cat: "mobile" },
  { name: "SwiftUI", devicon: "swift", cat: "mobile" },
  { name: "Kotlin", devicon: "kotlin", cat: "mobile" },
  { name: "Java (Android)", devicon: "android", cat: "mobile" },
  { name: "Flutter", devicon: "flutter", cat: "mobile" },
  { name: "React Native", devicon: "react", cat: "mobile" },
  { name: ".NET MAUI", devicon: "dotnetcore", cat: "mobile" },

  // Databases
  { name: "MySQL", devicon: "mysql", cat: "db" },
  { name: "PostgreSQL", devicon: "postgresql", cat: "db" },
  { name: "Microsoft SQL Server", devicon: "microsoftsqlserver", cat: "db" },
  { name: "MariaDB", devicon: "mariadb", cat: "db" },
  { name: "MongoDB", devicon: "mongodb", cat: "db" },
  { name: "Firebase Firestore", devicon: "firebase", cat: "db" },
  { name: "Redis", devicon: "redis", cat: "db" },

  // Cloud & Hosting
  { name: "AWS", devicon: "amazonwebservices", cat: "cloud" },
  { name: "Google Cloud Platform (GCP)", devicon: "googlecloud", cat: "cloud" },
  { name: "Microsoft Azure", devicon: "azure", cat: "cloud" },

  // DevOps
  { name: "Docker", devicon: "docker", cat: "devops" },
  { name: "Kubernetes", devicon: "kubernetes", cat: "devops" },
  { name: "Git", devicon: "git", cat: "devops" },
  { name: "GitHub", devicon: "github", cat: "devops" },
  { name: "GitLab", devicon: "gitlab", cat: "devops" },
  { name: "Jenkins", devicon: "jenkins", cat: "devops" },
  { name: "Nginx", devicon: "nginx", cat: "devops" },
  { name: "Apache", devicon: "apache", cat: "devops" },

  // APIs & Integrations
  { name: "REST APIs", devicon: "express", cat: "api" },
  { name: "GraphQL", devicon: "graphql", cat: "api" },
  { name: "Stripe", devicon: "stripe", cat: "api" },
  { name: "PayPal", devicon: "paypal", cat: "api" },

  // Design Tools
  { name: "Figma", devicon: "figma", cat: "design" },
  { name: "Adobe XD", devicon: "adobexd", cat: "design" },
  { name: "Photoshop", devicon: "photoshop", cat: "design" },
  { name: "Illustrator", devicon: "illustrator", cat: "design" }
];

const CAT_META = {
  frontend: { border: "border-orange-500/20", bg: "bg-orange-500/5", text: "text-orange-300", glow: "rgba(249, 115, 22, 0.15)" },
  backend: { border: "border-sky-500/20", bg: "bg-sky-500/5", text: "text-sky-300", glow: "rgba(14, 165, 233, 0.15)" },
  cms: { border: "border-amber-500/20", bg: "bg-amber-500/5", text: "text-amber-300", glow: "rgba(245, 158, 11, 0.15)" },
  mobile: { border: "border-emerald-500/20", bg: "bg-emerald-500/5", text: "text-emerald-300", glow: "rgba(16, 185, 129, 0.15)" },
  pwa: { border: "border-pink-500/20", bg: "bg-pink-500/5", text: "text-pink-300", glow: "rgba(236, 72, 153, 0.15)" },
  db: { border: "border-purple-500/20", bg: "bg-purple-500/5", text: "text-purple-300", glow: "rgba(168, 85, 247, 0.15)" },
  cloud: { border: "border-blue-500/20", bg: "bg-blue-500/5", text: "text-blue-300", glow: "rgba(59, 130, 246, 0.15)" },
  devops: { border: "border-teal-500/20", bg: "bg-teal-500/5", text: "text-teal-300", glow: "rgba(20, 184, 166, 0.15)" },
  api: { border: "border-yellow-500/20", bg: "bg-yellow-500/5", text: "text-yellow-300", glow: "rgba(234, 179, 8, 0.15)" },
  design: { border: "border-rose-500/20", bg: "bg-rose-500/5", text: "text-rose-300", glow: "rgba(244, 63, 94, 0.15)" }
};

interface SlotConfig {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  duration: number;
  delay: number;
  xPath: number[];
  yPath: number[];
}

const SLOTS_CONFIG: SlotConfig[] = [
  // 1. Primarily on top of the selected item (above or near the upper half of the card)
  { top: "4%", left: "12%", duration: 7.5, delay: 0, xPath: [0, 16, -10, 12, 0], yPath: [0, -14, 18, -12, 0] },
  { top: "-2%", left: "30%", duration: 8.2, delay: 0.8, xPath: [0, -18, 14, -8, 0], yPath: [0, 22, -12, 10, 0] },
  { top: "8%", left: "48%", duration: 7.8, delay: 1.5, xPath: [0, 20, -15, 10, 0], yPath: [0, -16, 20, -12, 0] },
  { top: "-2%", right: "30%", duration: 8.5, delay: 0.3, xPath: [0, 14, -20, 12, 0], yPath: [0, 24, -14, 12, 0] },
  { top: "4%", right: "12%", duration: 8.0, delay: 1.1, xPath: [0, -22, 12, -14, 0], yPath: [0, -12, 18, -10, 0] },

  // 2. Left side, close to the item
  { top: "28%", left: "2%", duration: 9.0, delay: 0.5, xPath: [0, 24, -10, 14, 0], yPath: [0, 18, -22, 12, 0] },
  { top: "54%", left: "0%", duration: 9.5, delay: 1.2, xPath: [0, 14, -22, 10, 0], yPath: [0, -16, 24, -14, 0] },
  { top: "80%", left: "5%", duration: 8.8, delay: 0.2, xPath: [0, 22, -14, 16, 0], yPath: [0, 20, -14, 10, 0] },

  // 3. Right side, close to the item
  { top: "28%", right: "2%", duration: 9.2, delay: 1.6, xPath: [0, -24, 12, -16, 0], yPath: [0, -18, 20, -14, 0] },
  { top: "54%", right: "0%", duration: 9.8, delay: 0.7, xPath: [0, -16, 24, -12, 0], yPath: [0, 22, -18, 12, 0] },
  { top: "80%", right: "5%", duration: 8.6, delay: 1.9, xPath: [0, -20, 14, -12, 0], yPath: [0, -14, 22, -8, 0] },

  // 4. Subtle bottom coordinates close to bottom border
  { bottom: "8%", left: "38%", duration: 9.4, delay: 0.4, xPath: [0, -12, 18, -10, 0], yPath: [0, 16, -20, 14, 0] }
];

function TechChip({ item, styleConfig }: { item: TechItem; styleConfig: SlotConfig }) {
  const [src, setSrc] = useState(
    `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${item.devicon}/${item.devicon}-original.svg`
  );
  const [failedOnce, setFailedOnce] = useState(false);
  const [fallbackToBadge, setFallbackToBadge] = useState(false);

  useEffect(() => {
    // Reset state whenever item changes to refresh the logo
    setSrc(`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${item.devicon}/${item.devicon}-original.svg`);
    setFailedOnce(false);
    setFallbackToBadge(false);
  }, [item]);

  const handleImgError = () => {
    if (!failedOnce) {
      setFailedOnce(true);
      setSrc(`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${item.devicon}/${item.devicon}-plain.svg`);
    } else {
      setFallbackToBadge(true);
    }
  };

  const meta = CAT_META[item.cat] || CAT_META.frontend;

  // Combine coordinate positions safely
  const positionStyles: React.CSSProperties = {
    position: "relative",
    zIndex: 30
  };

  return (
    <motion.div
      animate={{
        y: styleConfig.yPath,
        x: styleConfig.xPath
      }}
      transition={{
        duration: styleConfig.duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: styleConfig.delay
      }}
      className={`tech-chip flex items-center gap-2 px-2.5 py-1.5 rounded-full border ${meta.border} ${meta.bg} transition-colors duration-500 shadow-md`}
      style={{
        ...positionStyles,
        willChange: "transform",
        boxShadow: `0 4px 10px rgba(0,0,0,0.4), 0 0 6px ${meta.glow}`
      }}
    >
      <div className="w-4 h-4 flex items-center justify-center shrink-0">
        {fallbackToBadge ? (
          <div className="w-4 h-4 flex items-center justify-center rounded bg-white/5 border border-white/10 text-[7px] font-bold text-white font-mono uppercase">
            {item.name.substring(0, 2)}
          </div>
        ) : (
          <img
            src={src}
            alt={item.name}
            onError={handleImgError}
            className="w-4 h-4 object-contain"
            referrerPolicy="no-referrer"
          />
        )}
      </div>
      <span className={`text-[9px] font-mono tracking-wider font-medium whitespace-nowrap ${meta.text}`}>
        {item.name}
      </span>
    </motion.div>
  );
}

export default function TechSwarm({ children }: { children: React.ReactNode }) {
  // We keep a list of active tech slots containing either a TechItem or null.
  // We initialize exactly 9 active items situated in 9 random slots.
  const [activeItems, setActiveItems] = useState<(TechItem | null)[]>(() => {
    const slots = Array(SLOTS_CONFIG.length).fill(null);
    const shuffledPool = [...TECH_POOL].sort(() => Math.random() - 0.5);
    const initialTechs = shuffledPool.slice(0, 9);
    
    // Choose 9 unique random slot indices
    const indices = Array.from({ length: SLOTS_CONFIG.length }, (_, i) => i);
    const shuffledIndices = indices.sort(() => Math.random() - 0.5).slice(0, 9);
    
    shuffledIndices.forEach((slotIdx, i) => {
      slots[slotIdx] = initialTechs[i];
    });
    
    return slots;
  });

  useEffect(() => {
    // Every 3.2 seconds, randomly select 2-3 active spaces to fade out, 
    // and select 2-3 empty spaces to fade in new technologies.
    // This maintains exactly 9 items on screen at all times while keeping the visuals fluid.
    const interval = setInterval(() => {
      setActiveItems((prev) => {
        const next = [...prev];
        
        // Find all indices that currently have items (occupied)
        const occupiedIndices: number[] = [];
        next.forEach((item, idx) => {
          if (item !== null) {
            occupiedIndices.push(idx);
          }
        });
        
        // Find all indices that are empty (vacant)
        const vacantIndices: number[] = [];
        next.forEach((item, idx) => {
          if (item === null) {
            vacantIndices.push(idx);
          }
        });

        const numToCycle = 2; // Cycle 2 items at a time to maintain exactly 9 items
        if (occupiedIndices.length >= numToCycle && vacantIndices.length >= numToCycle) {
          // Choose 2 occupied indices to remove
          const shuffledOccupied = [...occupiedIndices].sort(() => Math.random() - 0.5);
          const toRemove = shuffledOccupied.slice(0, numToCycle);
          
          // Choose 2 vacant indices to populate
          const shuffledVacant = [...vacantIndices].sort(() => Math.random() - 0.5);
          const toPopulate = shuffledVacant.slice(0, numToCycle);
          
          // Remove the selected old items
          toRemove.forEach((idx) => {
            next[idx] = null;
          });
          
          // Populate the selected vacant slots with new candidates
          toPopulate.forEach((slotIdx) => {
            let candidate = TECH_POOL[Math.floor(Math.random() * TECH_POOL.length)];
            let attempts = 0;
            // Ensure we don't pick a duplicate currently shown
            while (next.some((item) => item?.name === candidate.name) && attempts < 30) {
              candidate = TECH_POOL[Math.floor(Math.random() * TECH_POOL.length)];
              attempts++;
            }
            next[slotIdx] = candidate;
          });
        }
        
        return next;
      });
    }, 3200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-lg mx-auto flex items-center justify-center py-24 px-6 md:px-10">
      {/* Dynamic ambient gradient glow background (modern tech aesthetic) */}
      <div className="absolute inset-0 bg-radial from-brand/5 via-transparent to-transparent pointer-events-none rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] bg-gradient-to-r from-brand/10 to-amber-500/10 rounded-full blur-[90px] pointer-events-none" />

      {/* Embedded Central Card ("Selected Item" placeholder) */}
      <div className="relative z-20 w-full">
        {children}
      </div>

      {/* Gentle looping constellation stars/nodes */}
      {SLOTS_CONFIG.map((slot, index) => {
        const currentItem = activeItems[index];

        return (
          <div
            key={index}
            style={{
              position: "absolute",
              top: slot.top,
              bottom: slot.bottom,
              left: slot.left,
              right: slot.right,
              zIndex: 30,
              pointerEvents: "none"
            }}
          >
            <AnimatePresence mode="wait">
              {currentItem && (
                <motion.div
                  key={currentItem.name}
                  initial={{ opacity: 0, y: 8, scale: 0.88 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.88 }}
                  transition={{ duration: 0.65, ease: "easeInOut" }}
                >
                  <TechChip item={currentItem} styleConfig={slot} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
