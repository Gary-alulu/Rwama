"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { 
  ArrowRight, MapPin, Phone, Mail, Clock, Shield, Globe, 
  Leaf, Users, CheckCircle2, Navigation, ChevronDown, Send
} from "lucide-react";
import { LuxuryButton } from "@/components/rwama/LuxuryButton";

// ============================================================================
// DATA CONSTANTS
// ============================================================================

const CONTACT_INFO = [
  { icon: MapPin, label: "Headquarters", value: "Kirinyaga County, Kenya" },
  { icon: Phone, label: "General Inquiries", value: "+254 (0) 700 000 000" },
  { icon: Mail, label: "Export Desk", value: "export@rwamacoffee.com" },
  { icon: Clock, label: "Operating Hours", value: "Mon-Fri: 8:00 AM - 5:00 PM (EAT)" },
];

const FAQS = [
  {
    question: "How do I request a sample of your current lots?",
    answer: "You can request samples through our Marketplace or by selecting 'Coffee Sourcing' in the contact form. Our export team will verify your details and arrange international shipping via DHL."
  },
  {
    question: "Do you facilitate direct trade partnerships?",
    answer: "Yes. Rwama Cooperative strongly advocates for direct trade. We work closely with international roasters to establish long-term, transparent relationships that benefit our farmers."
  },
  {
    question: "Can we visit the washing stations?",
    answer: "We welcome our partners to visit Muthigi-ini, Kimatu, and Muburi. Please reach out to our team at least 30 days in advance to arrange a guided origin tour."
  }
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function ContactPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [formState, setFormState] = useState({
    name: "",
    company: "",
    email: "",
    type: "Coffee Sourcing",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormState({ name: "", company: "", email: "", type: "Coffee Sourcing", message: "" });
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[var(--color-cream)]">
      
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative pt-48 pb-32 px-6 lg:px-8 overflow-hidden bg-[var(--color-forest)]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2000')] bg-cover bg-center opacity-20 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1f14]/80 via-[var(--color-forest)]/90 to-[var(--color-forest)]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-radial from-[rgba(200,169,107,0.15)] to-transparent rounded-full blur-3xl" />
        
        <div className="relative z-10 max-w-[1400px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, type: "spring", stiffness: 40, damping: 20 }}
          >
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[rgba(200,169,107,0.3)] bg-[rgba(200,169,107,0.05)] backdrop-blur-md text-[var(--color-gold)] text-[10px] tracking-[0.25em] uppercase mb-10">
              <Globe className="w-3 h-3" /> Global Partnerships
            </span>
            <h1 className="text-[clamp(48px,7vw,96px)] leading-[1.05] text-[var(--color-cream)] mb-8" style={{ fontFamily: "var(--font-heading)" }}>
              Let’s <span className="italic text-[var(--color-gold)]">Connect.</span>
            </h1>
            <p className="text-lg md:text-xl text-[rgba(246,241,233,0.7)] max-w-[600px] mx-auto font-light tracking-wide mb-12">
              Partner with Rwama and experience the future of Kenyan specialty coffee.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              {['1,200+ Farmers', '3 Factories', 'Kirinyaga, Kenya', 'Since 1968'].map((stat, i) => (
                <div key={i} className="px-4 py-2 rounded-full border border-[rgba(246,241,233,0.1)] text-[rgba(246,241,233,0.5)] text-[10px] tracking-wider uppercase">
                  {stat}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2 & 3 & 4. CONTACT EXPERIENCE SECTION (FORM + INFO) */}
      <section className="py-24 lg:py-32 px-6 lg:px-8 max-w-[1400px] mx-auto relative -mt-24 z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          
          {/* LEFT: Premium Contact Form */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="p-8 lg:p-12 rounded-[32px] bg-white shadow-[0_20px_60px_rgba(18,53,36,0.08)] border border-[rgba(18,53,36,0.05)]"
            >
              <h2 className="text-3xl text-[var(--color-forest)] mb-2" style={{ fontFamily: "var(--font-heading)" }}>Send an Inquiry</h2>
              <p className="text-[rgba(18,53,36,0.6)] mb-8">We look forward to beginning a conversation with you.</p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-[rgba(18,53,36,0.6)] font-medium ml-1">Full Name</label>
                    <input 
                      required
                      type="text" 
                      value={formState.name}
                      onChange={(e) => setFormState({...formState, name: e.target.value})}
                      className="w-full px-5 py-4 rounded-[16px] bg-[rgba(18,53,36,0.02)] border border-[rgba(18,53,36,0.1)] focus:border-[var(--color-gold)] focus:ring-1 focus:ring-[var(--color-gold)] outline-none transition-all text-[var(--color-forest)]"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-[rgba(18,53,36,0.6)] font-medium ml-1">Company</label>
                    <input 
                      required
                      type="text" 
                      value={formState.company}
                      onChange={(e) => setFormState({...formState, company: e.target.value})}
                      className="w-full px-5 py-4 rounded-[16px] bg-[rgba(18,53,36,0.02)] border border-[rgba(18,53,36,0.1)] focus:border-[var(--color-gold)] focus:ring-1 focus:ring-[var(--color-gold)] outline-none transition-all text-[var(--color-forest)]"
                      placeholder="Roastery Co."
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-[rgba(18,53,36,0.6)] font-medium ml-1">Email Address</label>
                  <input 
                    required
                    type="email" 
                    value={formState.email}
                    onChange={(e) => setFormState({...formState, email: e.target.value})}
                    className="w-full px-5 py-4 rounded-[16px] bg-[rgba(18,53,36,0.02)] border border-[rgba(18,53,36,0.1)] focus:border-[var(--color-gold)] focus:ring-1 focus:ring-[var(--color-gold)] outline-none transition-all text-[var(--color-forest)]"
                    placeholder="jane@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-[rgba(18,53,36,0.6)] font-medium ml-1">Inquiry Type</label>
                  <select 
                    value={formState.type}
                    onChange={(e) => setFormState({...formState, type: e.target.value})}
                    className="w-full px-5 py-4 rounded-[16px] bg-[rgba(18,53,36,0.02)] border border-[rgba(18,53,36,0.1)] focus:border-[var(--color-gold)] focus:ring-1 focus:ring-[var(--color-gold)] outline-none transition-all text-[var(--color-forest)] cursor-pointer"
                  >
                    <option>Coffee Sourcing</option>
                    <option>Partnerships</option>
                    <option>Farmer Membership</option>
                    <option>Export Inquiry</option>
                    <option>General Inquiry</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-[rgba(18,53,36,0.6)] font-medium ml-1">Message</label>
                  <textarea 
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({...formState, message: e.target.value})}
                    className="w-full px-5 py-4 rounded-[16px] bg-[rgba(18,53,36,0.02)] border border-[rgba(18,53,36,0.1)] focus:border-[var(--color-gold)] focus:ring-1 focus:ring-[var(--color-gold)] outline-none transition-all text-[var(--color-forest)] resize-none"
                    placeholder="How can we help you?"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting || isSuccess}
                  className="w-full py-4 rounded-full bg-[var(--color-forest)] text-[var(--color-cream)] font-medium flex items-center justify-center gap-2 hover:bg-[var(--color-coffee)] transition-colors disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <span className="animate-pulse">Sending...</span>
                  ) : isSuccess ? (
                    <><CheckCircle2 className="w-5 h-5" /> Message Sent</>
                  ) : (
                    <>Send Inquiry <Send className="w-4 h-4 ml-1" /></>
                  )}
                </button>
              </form>
            </motion.div>
          </div>

          {/* RIGHT: Info Panel & Imagery */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative h-[250px] rounded-[32px] overflow-hidden shadow-xl group"
            >
              <img 
                src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=800" 
                alt="Rwama Coffee Processing"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-forest)] to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-[var(--color-gold)] italic" style={{ fontFamily: "var(--font-heading)" }}>
                  "Every conversation begins with shared passion for exceptional coffee."
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="p-8 rounded-[32px] bg-[var(--color-forest)] text-[var(--color-cream)] relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-radial from-[rgba(200,169,107,0.1)] to-transparent rounded-full blur-2xl" />
              
              <h3 className="text-2xl mb-8 relative z-10" style={{ fontFamily: "var(--font-heading)" }}>Connect with Us</h3>
              
              <div className="space-y-6 relative z-10">
                {CONTACT_INFO.map((info, i) => (
                  <div key={i} className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-full bg-[rgba(200,169,107,0.1)] flex items-center justify-center shrink-0 group-hover:bg-[rgba(200,169,107,0.2)] transition-colors">
                      <info.icon className="w-4 h-4 text-[var(--color-gold)]" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-[rgba(246,241,233,0.5)] block mb-1">{info.label}</span>
                      <span className="text-sm">{info.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE LOCATION SECTION */}
      <section className="py-24 bg-[#0a1f14] relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[10px] tracking-[0.25em] uppercase text-[var(--color-gold)] font-medium mb-4 block">
              Origin Map
            </span>
            <h2 className="text-[clamp(32px,4vw,48px)] text-[var(--color-cream)]" style={{ fontFamily: "var(--font-heading)" }}>
              The Heart of <span className="italic text-[var(--color-gold)]">Kirinyaga</span>
            </h2>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative w-full h-[500px] rounded-[32px] overflow-hidden bg-[var(--color-forest)] border border-[rgba(200,169,107,0.15)] flex items-center justify-center group"
          >
            {/* Topographic Rings Animation */}
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <div className="absolute w-[800px] h-[800px] border border-[var(--color-gold)] rounded-full animate-[ping_8s_cubic-bezier(0,0,0.2,1)_infinite] opacity-20" />
              <div className="absolute w-[500px] h-[500px] border border-[var(--color-gold)] rounded-full animate-[ping_8s_cubic-bezier(0,0,0.2,1)_infinite_2s] opacity-30" />
            </div>
            
            {/* Grid Overlay */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(200,169,107,0.8) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="relative mb-4">
                <div className="absolute -inset-4 bg-[var(--color-gold)] rounded-full opacity-20 animate-pulse" />
                <div className="w-4 h-4 bg-[var(--color-gold)] rounded-full shadow-[0_0_20px_var(--color-gold)]" />
              </div>
              <h3 className="text-2xl text-[var(--color-cream)] mb-2" style={{ fontFamily: "var(--font-heading)" }}>Kirinyaga County</h3>
              <div className="flex items-center gap-4 text-[rgba(246,241,233,0.5)] text-sm">
                <span>Muthigi-ini</span>
                <span className="w-1 h-1 rounded-full bg-[var(--color-gold)]" />
                <span>Kimatu</span>
                <span className="w-1 h-1 rounded-full bg-[var(--color-gold)]" />
                <span>Muburi</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 6. PARTNERSHIP EXPERIENCE SECTION */}
      <section className="py-24 lg:py-32 bg-[var(--color-cream)]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-[clamp(32px,4vw,48px)] text-[var(--color-forest)] mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              Why Partner with <span className="italic text-[var(--color-coffee)]">Rwama?</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: "100% Traceable", desc: "Every lot is tracked from our farmers to the final export container." },
              { icon: Leaf, title: "High Altitude", desc: "Grown between 1,500m and 1,800m on the volcanic slopes of Mt. Kenya." },
              { icon: Users, title: "Farmer Owned", desc: "Direct trade ensures premiums go straight to our 1,200+ members." },
              { icon: CheckCircle2, title: "Quality Assured", desc: "Rigorous sorting and processing yields consistent 85+ SCA scores." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="p-8 rounded-[24px] bg-white border border-[rgba(18,53,36,0.05)] hover:shadow-[0_10px_40px_rgba(18,53,36,0.05)] transition-shadow"
              >
                <div className="w-12 h-12 rounded-full bg-[rgba(200,169,107,0.1)] flex items-center justify-center mb-6">
                  <item.icon className="w-5 h-5 text-[var(--color-gold)]" />
                </div>
                <h3 className="text-xl text-[var(--color-forest)] mb-3" style={{ fontFamily: "var(--font-heading)" }}>{item.title}</h3>
                <p className="text-sm text-[rgba(18,53,36,0.6)] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FAQ SECTION */}
      <section className="py-24 bg-white border-t border-[rgba(18,53,36,0.05)]">
        <div className="max-w-[800px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-[clamp(32px,4vw,40px)] text-[var(--color-forest)]" style={{ fontFamily: "var(--font-heading)" }}>
              Frequently Asked <span className="italic text-[var(--color-coffee)]">Questions</span>
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-[24px] border border-[rgba(18,53,36,0.1)] overflow-hidden"
              >
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-[rgba(18,53,36,0.02)] transition-colors"
                >
                  <span className="text-lg font-medium text-[var(--color-forest)] pr-8">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-[var(--color-gold)] shrink-0 transition-transform duration-300 ${activeFaq === i ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 text-[rgba(18,53,36,0.7)] leading-relaxed border-t border-[rgba(18,53,36,0.05)]">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FINAL CTA SECTION */}
      <section className="relative py-32 overflow-hidden bg-[var(--color-forest)]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1606318313647-13a843c03ad8?q=80&w=2000')] bg-cover bg-center opacity-30 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1f14] via-[#123524]/80 to-[#123524]/90" />
        
        <div className="relative max-w-[900px] mx-auto px-6 lg:px-8 text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-[clamp(36px,5vw,56px)] leading-[1.05] text-[var(--color-cream)] mb-10" style={{ fontFamily: "var(--font-heading)" }}>
              Begin your journey <br/>
              <span className="italic text-[var(--color-gold)]">with Rwama.</span>
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <LuxuryButton href="/marketplace" variant="gold" size="lg">
                Explore Marketplace <ArrowRight className="w-5 h-5 ml-2" />
              </LuxuryButton>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
