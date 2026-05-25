"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { LuxuryButton } from "@/components/rwama/LuxuryButton";
import {
  ArrowDown,
  MapPin,
  Mountain,
  Users,
  Droplets,
  Sun,
  Coffee,
  Globe,
  Quote,
  ArrowRight,
  Sprout,
  Leaf,
  Activity,
  Heart,
  Network,
  Package
} from "lucide-react";

export default function StoryPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const journeyRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const { scrollYProgress: journeyProgress } = useScroll({
    target: journeyRef,
    offset: ["start center", "end center"],
  });

  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(heroProgress, [0, 0.5], [1, 1.1]);

  return (
    <div className="min-h-screen bg-[var(--color-forest)] text-[var(--color-cream)] selection:bg-[var(--color-gold)] selection:text-[var(--color-forest)]">
      
      {/* 1. CINEMATIC HERO STORY SECTION */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-0" style={{ scale: heroScale }}>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1f14] via-[#0d261a] to-[#123524]" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2000')] bg-cover bg-center opacity-20 mix-blend-overlay" />
          <div className="absolute top-0 left-1/4 w-[1000px] h-[800px] bg-gradient-radial from-[rgba(200,169,107,0.15)] to-transparent rounded-full blur-3xl" />
        </motion.div>

        <motion.div 
          className="relative z-10 flex flex-col items-center px-6 text-center max-w-[1000px]"
          style={{ opacity: heroOpacity }}
        >
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <span className="text-xs tracking-[0.35em] uppercase text-[var(--color-gold)] font-medium mb-8 block">
              A Documentary Experience
            </span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.2 }}
            className="text-[clamp(48px,8vw,110px)] leading-[0.9] mb-8" style={{ fontFamily: "var(--font-heading)" }}
          >
            Our <span className="italic text-[var(--color-gold)]">Story</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5 }}
            className="text-lg md:text-2xl text-[rgba(246,241,233,0.8)] max-w-[700px] leading-relaxed mb-16"
          >
            From the misty highlands of Kirinyaga to the world — a journey of soil, people, and passion.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1 }} className="flex flex-col items-center gap-4">
            <span className="text-[10px] tracking-[0.25em] uppercase text-[rgba(246,241,233,0.5)]">Scroll to begin</span>
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
              <ArrowDown className="w-5 h-5 text-[var(--color-gold)]" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* 2. ORIGIN OF RWAMA SECTION */}
      <section className="py-32 bg-[var(--color-cream)] text-[var(--color-forest)] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1 }}>
              <span className="text-xs tracking-[0.25em] uppercase text-[var(--color-gold)] font-medium mb-4 block">1968 • The Genesis</span>
              <h2 className="text-[clamp(36px,5vw,56px)] leading-[1.05] mb-8" style={{ fontFamily: "var(--font-heading)" }}>
                The Foundation of <br/><span className="italic text-[var(--color-coffee)]">Rwama Heritage</span>
              </h2>
              <div className="space-y-6 text-lg text-[rgba(18,53,36,0.75)] leading-relaxed">
                <p>
                  Before the global specialty coffee movement, there were the farmers of Kirinyaga. In 1968, 
                  driven by a shared devotion to the land and a vision for community empowerment, local farmers 
                  united to form the Rwama Farmers Cooperative Society.
                </p>
                <p>
                  It wasn't merely an economic union; it was a cultural pact. A promise that every cherry picked 
                  would represent the collective spirit of the community, honoring the deep red volcanic soil that 
                  sustained them.
                </p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1.2 }} className="relative aspect-[4/5] rounded-[24px] overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-forest)] to-transparent opacity-60 z-10" />
              <img src="https://images.unsplash.com/photo-1511556820780-d912e42b4980?q=80&w=1000" alt="Vintage Coffee Farming" className="w-full h-full object-cover filter sepia-[0.3] contrast-125" />
              <div className="absolute bottom-8 left-8 right-8 z-20">
                <Quote className="w-8 h-8 text-[var(--color-gold)] mb-4 opacity-80" />
                <p className="text-[var(--color-cream)] text-lg italic leading-relaxed">"We planted seeds not just for coffee, but for the future of our children."</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. LAND & HERITAGE SECTION */}
      <section className="relative py-40 overflow-hidden">
        <div className="absolute inset-0 bg-[#0d261a]">
          <div className="absolute top-1/2 right-0 w-[800px] h-[800px] bg-gradient-radial from-[rgba(200,169,107,0.05)] to-transparent rounded-full blur-3xl -translate-y-1/2" />
        </div>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="text-center mb-24">
            <h2 className="text-[clamp(40px,6vw,72px)] leading-[1]" style={{ fontFamily: "var(--font-heading)" }}>
              The Sacred <span className="italic text-[var(--color-gold)]">Terroir</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Mountain, title: "1,500 - 1,800m", desc: "High altitude slows maturation, creating dense beans with complex, bright acidity." },
              { icon: Sun, title: "Volcanic Soil", desc: "Deep, red volcanic loam rich in phosphorus, giving our coffee its signature robust body." },
              { icon: Droplets, title: "1,400mm Rainfall", desc: "Perfectly timed bi-modal rainfall nourishes the trees through crucial flowering stages." }
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.2 }} className="p-10 rounded-[24px] bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] backdrop-blur-sm hover:bg-[rgba(255,255,255,0.05)] transition-colors">
                <item.icon className="w-8 h-8 text-[var(--color-gold)] mb-6" />
                <h3 className="text-2xl text-[var(--color-cream)] mb-4" style={{ fontFamily: "var(--font-heading)" }}>{item.title}</h3>
                <p className="text-[rgba(246,241,233,0.6)] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FARMERS HUMAN STORY SECTION */}
      <section className="py-32 bg-[var(--color-cream)] text-[var(--color-forest)]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="text-center max-w-[800px] mx-auto mb-24">
            <span className="text-xs tracking-[0.25em] uppercase text-[var(--color-gold)] font-medium mb-4 block">The Hands That Craft</span>
            <h2 className="text-[clamp(36px,5vw,60px)] leading-[1.05]" style={{ fontFamily: "var(--font-heading)" }}>
              The Soul of <span className="italic text-[var(--color-coffee)]">Our Coffee</span>
            </h2>
          </div>
          
          <div className="space-y-32">
            {[
              { 
                title: "Generational Wisdom", 
                text: "Farming in Kirinyaga is passed down like an heirloom. Elders teach the youth not just how to prune or pick, but how to listen to the trees and read the shifting mists.",
                img: "https://images.unsplash.com/photo-1606318313647-13a843c03ad8?q=80&w=1000",
                quote: "My grandfather planted these trees. I tend to them so my daughter can harvest them."
              },
              { 
                title: "The Youth Renaissance", 
                text: "A new generation is returning to the farms, blending ancestral intuition with modern agricultural science. They are the future of Kenyan specialty coffee.",
                img: "https://images.unsplash.com/photo-1595085375545-21d3f524e9cb?q=80&w=1000",
                quote: "We use data to track the soil, but we use our hearts to pick the cherry."
              }
            ].map((story, i) => (
              <div key={i} className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 items-center`}>
                <motion.div initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="lg:w-1/2">
                  <div className="relative aspect-square md:aspect-[4/3] rounded-[24px] overflow-hidden">
                    <img src={story.img} alt={story.title} className="w-full h-full object-cover" />
                  </div>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: i % 2 === 0 ? 40 : -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="lg:w-1/2">
                  <h3 className="text-4xl mb-6" style={{ fontFamily: "var(--font-heading)" }}>{story.title}</h3>
                  <p className="text-lg text-[rgba(18,53,36,0.7)] leading-relaxed mb-8">{story.text}</p>
                  <div className="pl-6 border-l-2 border-[var(--color-gold)]">
                    <p className="text-xl italic font-serif text-[var(--color-forest)]">"{story.quote}"</p>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. THE COFFEE JOURNEY STORY SECTION */}
      <section ref={journeyRef} className="py-40 bg-[#0a1f14] relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="text-[clamp(36px,5vw,60px)] leading-[1.05] text-[var(--color-cream)]" style={{ fontFamily: "var(--font-heading)" }}>
              The Ritual of <span className="italic text-[var(--color-gold)]">Processing</span>
            </h2>
          </div>
          
          <div className="relative border-l border-[rgba(200,169,107,0.2)] ml-4 md:ml-8 space-y-24 pb-12">
            <motion.div 
              className="absolute top-0 bottom-0 left-0 w-[2px] bg-gradient-to-b from-[var(--color-gold)] to-transparent origin-top"
              style={{ scaleY: journeyProgress }}
            />
            
            {[
              { icon: Sprout, title: "Selective Harvest", desc: "Only the deepest red cherries are hand-picked at peak ripeness." },
              { icon: Droplets, title: "Washing & Fermentation", desc: "Pure mountain water and 48 hours of slow fermentation unlock the vibrant acidity." },
              { icon: Sun, title: "Sun Drying", desc: "Resting on raised African beds for up to 21 days, turned constantly by hand." },
              { icon: Package, title: "Rest & Export", desc: "Conditioning in parchment before being carefully milled and shipped globally." }
            ].map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, delay: i * 0.1 }} className="relative pl-12 md:pl-20">
                <div className="absolute left-[-20px] top-0 w-10 h-10 rounded-full bg-[#0a1f14] border-2 border-[var(--color-gold)] flex items-center justify-center">
                  <step.icon className="w-4 h-4 text-[var(--color-gold)]" />
                </div>
                <h3 className="text-3xl text-[var(--color-cream)] mb-4" style={{ fontFamily: "var(--font-heading)" }}>{step.title}</h3>
                <p className="text-lg text-[rgba(246,241,233,0.6)] max-w-[600px] leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FACTORIES & CRAFTSMANSHIP SECTION */}
      <section className="py-32 bg-[var(--color-cream)] text-[var(--color-forest)]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-[clamp(36px,5vw,56px)] leading-[1.05] mb-6" style={{ fontFamily: "var(--font-heading)" }}>
              Temples of <span className="italic text-[var(--color-coffee)]">Craftsmanship</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Muthigi-ini", role: "The Historic Heart", est: "1968" },
              { name: "Kimatu", role: "The Innovation Hub", est: "1974" },
              { name: "Muburi", role: "The Altitude Peak", est: "1979" }
            ].map((factory, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.2 }} className="group relative rounded-[24px] overflow-hidden bg-white shadow-xl hover:shadow-2xl transition-all duration-500 border border-[rgba(18,53,36,0.05)]">
                <div className="aspect-[4/3] bg-gradient-to-br from-[var(--color-forest)] to-[#1a4a32] relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1611162458324-aae1eb4129a4?q=80&w=800')] bg-cover mix-blend-overlay opacity-40 group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="p-8">
                  <span className="text-xs tracking-[0.15em] text-[var(--color-gold)] font-medium mb-2 block">Est. {factory.est}</span>
                  <h3 className="text-3xl mb-2" style={{ fontFamily: "var(--font-heading)" }}>{factory.name}</h3>
                  <p className="text-[rgba(18,53,36,0.6)]">{factory.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. IMPACT & COMMUNITY SECTION */}
      <section className="py-32 bg-[var(--color-forest)] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-[rgba(200,169,107,0.05)] to-transparent" />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}>
              <h2 className="text-[clamp(36px,5vw,56px)] leading-[1.05] text-[var(--color-cream)] mb-8" style={{ fontFamily: "var(--font-heading)" }}>
                Beyond the <span className="italic text-[var(--color-gold)]">Cup</span>
              </h2>
              <p className="text-lg text-[rgba(246,241,233,0.7)] leading-relaxed mb-12">
                Rwama is an ecosystem of empowerment. By securing premium prices in the global market, 
                we ensure our farmers receive the highest possible returns, funding education, healthcare, 
                and infrastructure in Kirinyaga.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <span className="text-5xl text-[var(--color-gold)] block mb-2" style={{ fontFamily: "var(--font-heading)" }}>1,200+</span>
                  <span className="text-sm text-[rgba(246,241,233,0.5)] uppercase tracking-wider">Active Farmers</span>
                </div>
                <div>
                  <span className="text-5xl text-[var(--color-gold)] block mb-2" style={{ fontFamily: "var(--font-heading)" }}>85%</span>
                  <span className="text-sm text-[rgba(246,241,233,0.5)] uppercase tracking-wider">Revenue to Farmers</span>
                </div>
                <div>
                  <span className="text-5xl text-[var(--color-gold)] block mb-2" style={{ fontFamily: "var(--font-heading)" }}>40%</span>
                  <span className="text-sm text-[rgba(246,241,233,0.5)] uppercase tracking-wider">Women Ownership</span>
                </div>
                <div>
                  <span className="text-5xl text-[var(--color-gold)] block mb-2" style={{ fontFamily: "var(--font-heading)" }}>100%</span>
                  <span className="text-sm text-[rgba(246,241,233,0.5)] uppercase tracking-wider">Traceable</span>
                </div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} className="relative h-[600px] rounded-[32px] overflow-hidden">
              <img src="https://images.unsplash.com/photo-1542627088-6603b66e5c54?q=80&w=1000" alt="Community Impact" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1f14] to-transparent opacity-80" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 8. GLOBAL SIGNIFICANCE SECTION */}
      <section className="py-32 bg-[#0a1f14] overflow-hidden relative">
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <Globe className="w-[800px] h-[800px] text-[var(--color-gold)] animate-[spin_120s_linear_infinite]" />
        </div>
        <div className="max-w-[1000px] mx-auto px-6 lg:px-8 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}>
            <Globe className="w-12 h-12 text-[var(--color-gold)] mx-auto mb-8" />
            <h2 className="text-[clamp(36px,5vw,56px)] leading-[1.05] text-[var(--color-cream)] mb-8" style={{ fontFamily: "var(--font-heading)" }}>
              Kirinyaga to the <span className="italic text-[var(--color-gold)]">World</span>
            </h2>
            <p className="text-xl text-[rgba(246,241,233,0.7)] leading-relaxed mb-12">
              Our coffees grace the menus of the world's most prestigious roasteries. Recognized globally 
              for their vibrant blackberry acidity and syrupy body, Rwama lots are highly sought after 
              in international specialty coffee auctions.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {['Europe', 'North America', 'Asia', 'Middle East', 'Australia'].map((region, i) => (
                <span key={i} className="px-6 py-2 rounded-full border border-[rgba(200,169,107,0.3)] text-[var(--color-gold)] text-sm tracking-widest uppercase">
                  {region}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 9. MODERN FUTURE SECTION */}
      <section className="py-32 bg-[var(--color-cream)] text-[var(--color-forest)]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}>
            <span className="text-xs tracking-[0.25em] uppercase text-[var(--color-gold)] font-medium mb-4 block">Looking Ahead</span>
            <h2 className="text-[clamp(36px,5vw,56px)] leading-[1.05] mb-16" style={{ fontFamily: "var(--font-heading)" }}>
              The Future is <span className="italic text-[var(--color-coffee)]">Sustainable</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Activity, title: "Digital Traceability", desc: "Blockchain-backed transparency from farm to cup, ensuring complete trust and equity." },
              { icon: Leaf, title: "Climate Resilience", desc: "Implementing shade-grown practices and drought-resistant varietals to combat climate change." },
              { icon: Network, title: "Next-Gen Farmers", desc: "Agri-tech education programs designed to empower the youth and modernize farm management." }
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.2 }} className="p-10 rounded-[24px] bg-white shadow-xl border border-[rgba(18,53,36,0.05)] text-left">
                <div className="w-12 h-12 rounded-xl bg-[rgba(200,169,107,0.1)] flex items-center justify-center mb-6">
                  <item.icon className="w-6 h-6 text-[var(--color-gold)]" />
                </div>
                <h3 className="text-2xl mb-4" style={{ fontFamily: "var(--font-heading)" }}>{item.title}</h3>
                <p className="text-[rgba(18,53,36,0.6)] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FINAL EMOTIONAL CTA SECTION */}
      <section className="relative py-48 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1501747315-124a0eaca060?q=80&w=2000" alt="Golden Hour Farm" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1f14] via-[rgba(10,31,20,0.8)] to-[rgba(10,31,20,0.4)]" />
        </div>
        <div className="relative z-10 max-w-[1000px] mx-auto px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}>
            <h2 className="text-[clamp(40px,6vw,80px)] leading-[1.05] text-[var(--color-cream)] mb-8" style={{ fontFamily: "var(--font-heading)" }}>
              Rwama is more than coffee. <br/>
              It is a legacy of <span className="italic text-[var(--color-gold)]">land, people,</span> and <span className="italic text-[var(--color-gold)]">purpose.</span>
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-12">
              <LuxuryButton href="/marketplace" variant="gold" size="lg">
                Explore Marketplace <ArrowRight className="w-5 h-5 ml-2" />
              </LuxuryButton>
              <LuxuryButton href="/factories" variant="outline" size="lg">
                View Factories
              </LuxuryButton>
            </div>
          </motion.div>
        </div>
      </section>
      
    </div>
  );
}
