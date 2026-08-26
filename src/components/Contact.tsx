import React, { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Loader2, CheckCircle2, ChevronDown, Sparkles } from "lucide-react";
import { SERVICES } from "../data";
import { motion, AnimatePresence } from "motion/react";

interface ContactProps {
  initialService?: string;
}

export default function Contact({ initialService = "" }: ContactProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    budget: "$5,000 - $10,000",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, service: initialService }));
    }
  }, [initialService]);

  const budgets = [
    "Less than $300",
    "$300 - $1000",
    "$1,000 - $3,000",
    "$3,000 - $10,000",
    "$10,000+"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          service: formData.service || 'General Inquiry',
          budget: formData.budget,
          message: formData.message,
        }),
      });

      if (!response.ok) {
        throw new Error('Unable to send inquiry');
      }

      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        service: "",
        budget: "$5,000 - $10,000",
        message: "",
      });

      setTimeout(() => {
        setSuccess(false);
      }, 6000);
    } catch (error) {
      console.error('Contact form submit failed:', error);
      alert('Something went wrong while sending your message. Please try again or email us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 bg-dark-carbon overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-[20%] left-[-15%] w-[40vw] h-[40vw] bg-brand/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[35vw] h-[35vw] bg-neutral-900 rounded-full blur-[100px] pointer-events-none" />

      {/* Connection split overlays */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase leading-[1.1]">
              Contact Us
            </h2>
            <p className="mt-4 text-white/50 text-sm font-light max-w-xl mx-auto">
              Share your project vision, and I will provide a detailed breakdown of the development and design approach, along with a clear timeline and budget estimate.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-8 rounded-3xl glass-card border border-brand/30 text-center space-y-4 max-w-2xl mx-auto"
                id="success-alert-message"
              >
                <div className="w-16 h-16 rounded-full bg-brand/20 border border-brand text-brand flex items-center justify-center mx-auto mb-2 animate-bounce">
                  <CheckCircle2 className="w-8 h-8 text-glow-light" />
                </div>
                <h3 className="font-display font-black text-2xl text-white uppercase tracking-tight">
                  BRIEF SUBMITTED SUCESSFULLY
                </h3>
                <p className="text-white/60 text-sm max-w-md mx-auto">
                  Your brief has been sent successfully. I will review your project details and get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="mt-4 text-xs font-mono text-brand font-bold uppercase tracking-widest hover:underline cursor-pointer"
                >
                  Submit Another Brief
                </button>
              </motion.div>
            ) : (
              <motion.form
                onSubmit={handleSubmit}
                className="space-y-6 max-w-2xl mx-auto"
                id="inquire-form"
              >
                {/* Name and Email side-by-side matches grid layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-white/50 uppercase tracking-widest">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      className="w-full px-5 py-4 rounded-xl bg-neutral-900 border border-white/5 focus:border-brand text-white placeholder-white/20 text-sm font-medium transition-colors outline-none focus:border-glow focus:ring-0"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono text-white/50 uppercase tracking-widest">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="johndoe@agency.com"
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      className="w-full px-5 py-4 rounded-xl bg-neutral-900 border border-white/5 focus:border-brand text-white placeholder-white/20 text-sm font-medium transition-colors outline-none focus:border-glow focus:ring-0"
                    />
                  </div>
                </div>

                {/* Service dropdown and Budget */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-white/50 uppercase tracking-widest">
                      Target Division
                    </label>
                    <div className="relative">
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData((prev) => ({ ...prev, service: e.target.value }))}
                        className="w-full px-5 py-4 rounded-xl bg-neutral-900 border border-white/5 focus:border-brand text-white text-sm font-medium transition-colors outline-none appearance-none cursor-pointer focus:ring-0"
                      >
                        <option value="">Choose a capability...</option>
                        {SERVICES.map((s) => (
                          <option key={s.id} value={s.title}>
                            {s.title} ({s.category})
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 w-4 h-4 pointer-events-none" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono text-white/50 uppercase tracking-widest">
                      Estimated Budget
                    </label>
                    <div className="relative">
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData((prev) => ({ ...prev, budget: e.target.value }))}
                        className="w-full px-5 py-4 rounded-xl bg-neutral-900 border border-white/5 focus:border-brand text-white text-sm font-medium transition-colors outline-none appearance-none cursor-pointer focus:ring-0"
                      >
                        {budgets.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 w-4 h-4 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Message Input info */}
                <div className="space-y-2">
                  <label className="text-xs font-mono text-white/50 uppercase tracking-widest">
                    Share your idea
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="I want a 5 page webiste...."
                    value={formData.message}
                    onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                    className="w-full px-5 py-4 rounded-xl bg-neutral-900 border border-white/5 focus:border-brand text-white placeholder-white/20 text-sm font-medium transition-colors outline-none focus:border-glow resize-y focus:ring-0"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4.5 bg-brand hover:bg-brand-dim text-white font-bold rounded-xl uppercase tracking-wider text-sm transition-all text-glow duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-brand/10 hover:shadow-brand/20 border border-brand/20 active:scale-98 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Loading...
                    </>
                  ) : (
                    <>
                      Submit <Sparkles className="w-4 h-4 animate-pulse" />
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>

    </section>
  );
}
