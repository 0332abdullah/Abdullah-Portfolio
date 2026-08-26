import { AGENCY_NAME } from "../data";
import { Mail, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="main-app-footer" className="bg-dark-obsidian border-t border-white/5 py-5 sm:py-16 relative overflow-hidden">
      {/* Decorative pulse blur */}
      <div className="absolute bottom-0 right-[20%] w-[15vw] h-[15vw] bg-brand/5 rounded-full blur-[70px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center justify-center gap-8 text-center">
        {/* Direct channels */}
        <div className="w-full max-w-2xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a href="mailto:abdullahyaqub0332@gmail.com" className="flex items-center gap-3 text-white/80 hover:text-brand transition-colors">
              <div className="w-9 h-9 rounded-lg bg-neutral-900 border border-white/5 flex items-center justify-center text-white flex-shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium whitespace-nowrap">abdullahyaqub0332@gmail.com</span>
            </a>

            <div className="flex items-center gap-3 text-white/80">
              <div className="w-9 h-9 rounded-lg bg-neutral-900 border border-white/5 flex items-center justify-center text-white flex-shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium whitespace-nowrap">Pakistan</span>
            </div>
          </div>
        </div>

        {/* Social vectors and up indicator */}
        <div className="flex flex-col items-center lg:items-end gap-4">
          <div className="flex gap-4">
            <a
              href="https://www.upwork.com/freelancers/~01e437644acb257aa8"
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-white/60 hover:text-brand transition-colors"
            >
              Upwork Profile
            </a>
            <span className="text-sm text-white/30" aria-hidden="true">|</span>
            <a
              href="https://calendly.com/abdullah-yaqub/new-meeting?month=2026-08"
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-white/60 hover:text-brand transition-colors"
            >
              Book your call now
            </a>
          </div>
        </div>
      </div>

      {/* Under line sub Copyright bar */}
      <div className="max-w-7xl mx-auto px-6 mt-5 pt-5 border-t border-white/2 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
        <p className="text-[10px] font-mono text-white/30 uppercase tracking-wider">
          &copy; {currentYear} {AGENCY_NAME} | All rights reserved
        </p>
      </div>
    </footer>
  );
}
