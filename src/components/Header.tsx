import React, { useState, useEffect } from "react";
import { AGENCY_NAME } from "../data";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import logoImage from "../../assets/logo.png";

interface HeaderProps {
  onInquireClick: () => void;
}

export default function Header({ onInquireClick }: HeaderProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate viewport vertical scroll progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }

      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Work", href: "#work" },
    { name: "Our Process", href: "#process" },
    // { name: "Testimonials", href: "#testimonials" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      id="main-app-header"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "py-3 bg-dark-obsidian/85 backdrop-blur-xl border-b border-white/5 shadow-2xl"
          : "py-6 bg-transparent"
      }`}
    >

      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group z-50" id="header-logo-lnk">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-lg shadow-brand/20 group-hover:rotate-12 transition-transform duration-300">
            <img src={logoImage} alt="Abdullah Yaqub logo" className="w-full h-full object-contain rounded-lg" />
          </div>
          <span className="text-white font-display font-bold tracking-widest text-lg group-hover:text-brand transition-colors">
            {AGENCY_NAME}
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6" id="desktop-nav">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="relative text-white/70 hover:text-white font-medium text-sm transition-colors py-2 group"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-brand transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Call to Actions */}
        <div className="hidden md:flex items-center gap-3" id="header-cta-group">
          <button
            onClick={onInquireClick}
            id="nav-inquire-btn"
            className="flex items-center gap-1 bg-brand text-white font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-brand-dim hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer shadow-lg shadow-brand/10 hover:shadow-brand/25 border border-brand/20"
          >
            Initiate Project
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex md:hidden items-center gap-2" id="mobile-controls">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-neutral-900/80 border border-white/5 text-white/90 hover:text-white"
            aria-label="Toggle menu"
            id="burger-btn"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 w-full bg-dark-obsidian/95 backdrop-blur-2xl border-b border-white/5 py-8 px-6 flex flex-col gap-6 md:hidden z-40 shadow-2xl"
            id="mobile-drawer"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link, idx) => (
                <motion.a
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-white/80 hover:text-white font-display font-medium text-lg tracking-wide py-1 border-b border-white/5"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            <div className="flex flex-col gap-3 mt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onInquireClick();
                }}
                className="w-full text-center bg-brand text-white font-semibold py-3.5 rounded-xl hover:bg-brand-dim transition-colors"
              >
                Initiate Project
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
