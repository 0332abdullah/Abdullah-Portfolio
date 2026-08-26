import { useState, useEffect } from "react";
import { ContactInquiry } from "../types";
import { X, Trash2, Mail, BadgeCheck, Clock, ShieldAlert, FileText, CalendarCheck } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface LeadTrackerProps {
  onClose: () => void;
  onRefreshTriggered: number;
  onLeadChange: () => void;
}

export default function LeadTrackerModal({ onClose, onRefreshTriggered, onLeadChange }: LeadTrackerProps) {
  const [leads, setLeads] = useState<ContactInquiry[]>([]);

  const fetchLeads = () => {
    const raw = localStorage.getItem("aether_leads_log") || "[]";
    try {
      setLeads(JSON.parse(raw));
    } catch {
      setLeads([]);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [onRefreshTriggered]);

  const handleDelete = (id: string) => {
    const raw = localStorage.getItem("aether_leads_log") || "[]";
    try {
      const parsed: ContactInquiry[] = JSON.parse(raw);
      const filtered = parsed.filter((item) => item.id !== id);
      localStorage.setItem("aether_leads_log", JSON.stringify(filtered));
      setLeads(filtered);
      onLeadChange();
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateStatus = (id: string, newStatus: "new" | "reviewed" | "scheduled") => {
    const raw = localStorage.getItem("aether_leads_log") || "[]";
    try {
      const parsed: ContactInquiry[] = JSON.parse(raw);
      const updated = parsed.map((item) => {
        if (item.id === id) {
          return { ...item, status: newStatus };
        }
        return item;
      });
      localStorage.setItem("aether_leads_log", JSON.stringify(updated));
      setLeads(updated);
      onLeadChange();
    } catch (e) {
      console.error(e);
    }
  };

  const getStatusBadge = (status: "new" | "reviewed" | "scheduled") => {
    switch (status) {
      case "new":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand/10 border border-brand/20 text-brand text-[10px] font-mono uppercase font-bold tracking-widest leading-none">
            <Clock className="w-3.5 h-3.5 animate-pulse" /> NEW BRIEF
          </span>
        );
      case "reviewed":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-mono uppercase font-bold tracking-widest leading-none">
            <FileText className="w-3.5 h-3.5" /> UNDER AUDIT
          </span>
        );
      case "scheduled":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono uppercase font-bold tracking-widest leading-none">
            <CalendarCheck className="w-3.5 h-3.5" /> SECURED
          </span>
        );
    }
  };

  return (
    <div
      className="fixed inset-0 bg-dark-obsidian/95 backdrop-blur-3xl z-55 flex items-center justify-center p-4 sm:p-6"
      id="leads-manager-plate"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="w-full max-w-4xl bg-dark-carbon border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-dark-obsidian">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-brand/10 border border-brand/35 flex items-center justify-center text-brand">
              <ShieldAlert className="w-5 h-5 text-glow-light" />
            </div>
            <div>
              <h2 className="font-display font-black text-white text-lg tracking-wider uppercase flex items-center gap-2">
                PROJECT COMMISSION BOARD
              </h2>
              <p className="text-[10px] font-mono text-white/40 uppercase">
                Offline client database node (localStorage sandbox)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/5 border border-white/10 text-white flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Lead Table / List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4" id="leads-board-rows">
          <AnimatePresence mode="popLayout">
            {leads.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-16 text-center space-y-4"
              >
                <BadgeCheck className="w-12 h-12 text-white/10 mx-auto" />
                <p className="text-white/40 font-mono text-xs uppercase tracking-widest">
                  NO BRIEFS SUBMITTED YET
                </p>
                <p className="text-white/60 text-sm max-w-sm mx-auto font-light leading-relaxed">
                  Go to the contact form below, fill out some specifications, and hit submit to see them appear on this dynamic admin dashboard instantly.
                </p>
              </motion.div>
            ) : (
              leads.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="p-6 rounded-xl glass-card border border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
                >
                  <div className="space-y-3 flex-1">
                    {/* ID and date row */}
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest bg-white/3 px-2 py-0.5 rounded">
                        ID: {item.id}
                      </span>
                      <span className="text-[10px] font-mono text-white/30">
                        TIMELOG: {item.timestamp}
                      </span>
                      {getStatusBadge(item.status)}
                    </div>

                    {/* Bio metadata */}
                    <div>
                      <h4 className="font-display font-extrabold text-white text-base">
                        {item.name}
                      </h4>
                      <p className="text-xs text-white/50 flex items-center gap-1 mt-1 font-mono">
                        <Mail className="w-3 px-0.2" /> {item.email}
                      </p>
                    </div>

                    {/* Selection criteria details */}
                    <div className="grid grid-cols-2 gap-4 max-w-md bg-white/2 p-3 rounded-lg border border-white/5 text-[11px] font-mono">
                      <div>
                        <span className="text-white/30 block uppercase">Selected division</span>
                        <span className="text-white font-medium">{item.service}</span>
                      </div>
                      <div>
                        <span className="text-white/30 block uppercase">Allocated investment</span>
                        <span className="text-brand font-semibold">{item.budget}</span>
                      </div>
                    </div>

                    {/* Message paragraph */}
                    <div>
                      <p className="text-xs font-mono text-white/30 uppercase tracking-wider mb-1">
                        Specification summary:
                      </p>
                      <p className="text-xs text-white/70 bg-black/30 p-3 rounded border border-white/2 max-w-2xl leading-relaxed whitespace-pre-wrap font-light">
                        {item.message}
                      </p>
                    </div>
                  </div>

                  {/* Actions Column */}
                  <div className="flex flex-wrap md:flex-col gap-2 justify-end w-full md:w-auto border-t md:border-t-0 border-white/5 pt-4 md:pt-0">
                    <button
                      onClick={() => handleUpdateStatus(item.id, "reviewed")}
                      className="px-3.5 py-1.5 rounded-lg bg-white/2 hover:bg-cyan-500/10 border border-white/5 hover:border-cyan-500/30 text-[10px] font-mono uppercase text-white/70 hover:text-cyan-400 transition-colors cursor-pointer"
                    >
                      Audit Specs
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(item.id, "scheduled")}
                      className="px-3.5 py-1.5 rounded-lg bg-white/2 hover:bg-emerald-500/10 border border-white/5 hover:border-emerald-500/30 text-[10px] font-mono uppercase text-white/70 hover:text-emerald-400 transition-colors cursor-pointer"
                    >
                      Secure Brief
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/20 flex items-center justify-center transition-colors cursor-pointer"
                      title="Decommission briefing"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
