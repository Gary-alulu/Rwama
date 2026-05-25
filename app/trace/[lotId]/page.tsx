"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { MapPin, Sprout, Droplets, Package, Star, Droplet, Mountain, Quote, Navigation, CloudRain, ThermometerSun, CheckCircle2, Play, Pause, ArrowRight, Loader2 } from "lucide-react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { LuxuryButton } from "@/components/rwama/LuxuryButton";

// ============================================================================
// TYPES & MOCK DATA (Simulating Prisma Data)
// ============================================================================

interface TraceabilityData {
  id: string;
  name: string;
  factory: string;
  altitude: string;
  soil: string;
  harvestDate: string;
  farmersCount: number;
  processingMethod: string;
  fermentationTime: string;
  dryingTime: string;
  exportDate: string;
  certifications: string[];
  scaScore: number;
  grade: string;
  moisture: string;
  cultivar: string;
  status: string;
  sensoryProfile: { subject: string, A: number, fullMark: number }[];
  climate: { rainfall: string, temp: string, month: string };
  farmerQuote: {
    text: string;
    author: string;
    role: string;
    audioUrl?: string;
  };
  impact: string;
}

const getMockData = (lotId: string): TraceabilityData => ({
  id: lotId || "RWA-2024-AA-001",
  name: "Peaberry Reserve",
  factory: "Muthigi-ini",
  altitude: "1,680m",
  soil: "Red Volcanic Loam",
  harvestDate: "October 15, 2024",
  farmersCount: 124,
  processingMethod: "Fully Washed",
  fermentationTime: "48 Hours Dry Fermentation",
  dryingTime: "14 Days on Raised African Beds",
  exportDate: "December 05, 2024",
  certifications: ["Direct Trade", "Rainforest Alliance", "2024 Top Performance"],
  scaScore: 88.5,
  grade: "AA",
  moisture: "10.8%",
  cultivar: "SL28, SL34",
  status: "Ready for Shipment",
  sensoryProfile: [
    { subject: 'Acidity', A: 90, fullMark: 100 },
    { subject: 'Body', A: 85, fullMark: 100 },
    { subject: 'Sweetness', A: 95, fullMark: 100 },
    { subject: 'Aroma', A: 88, fullMark: 100 },
    { subject: 'Aftertaste', A: 85, fullMark: 100 },
  ],
  climate: { rainfall: "120mm", temp: "18°C", month: "Oct 2024" },
  farmerQuote: {
    text: "This lot represents the peak of our season. The rains came perfectly, and we picked only the deepest red cherries. You can taste the mist of Kirinyaga in every cup.",
    author: "Grace Wanjiku",
    role: "Lead Farmer, Muthigi-ini",
    audioUrl: "#" // Simulated audio
  },
  impact: "$2.40/kg premium directed to the Gichugu Primary Education Fund."
});

// ============================================================================
// ICONS
// ============================================================================

const AwardIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
);

const LeafIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
);

// ============================================================================
// COMPONENTS
// ============================================================================

const SensoryRadar = ({ data }: { data: TraceabilityData["sensoryProfile"] }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, type: "spring", stiffness: 50, damping: 20 }}
      className="p-8 rounded-[28px] bg-[rgba(246,241,233,0.03)] backdrop-blur-[12px] border border-[rgba(246,241,233,0.08)] mt-6 relative overflow-hidden"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-gold)] font-medium block mb-1">Flavor Shape</span>
          <h3 className="text-xl text-[var(--color-cream)]" style={{ fontFamily: "var(--font-heading)" }}>Sensory Profile</h3>
        </div>
      </div>
      
      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
            <PolarGrid stroke="rgba(246,241,233,0.1)" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(246,241,233,0.6)', fontSize: 10, letterSpacing: '0.1em' }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
            <Radar name="Flavor Profile" dataKey="A" stroke="var(--color-gold)" fill="var(--color-gold)" fillOpacity={0.3} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(10,31,20,0.9)', borderColor: 'rgba(200,169,107,0.3)', borderRadius: '12px', color: 'var(--color-cream)' }}
              itemStyle={{ color: 'var(--color-gold)' }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

const ClimateCard = ({ climate }: { climate: TraceabilityData["climate"] }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 50, damping: 20 }}
      className="p-6 rounded-[24px] bg-[rgba(246,241,233,0.03)] backdrop-blur-[12px] border border-[rgba(246,241,233,0.08)] mt-6 flex justify-between items-center"
    >
      <div>
        <span className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-gold)] font-medium block mb-3">Environmental Context</span>
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <CloudRain className="w-4 h-4 text-[rgba(246,241,233,0.5)]" />
            <span className="text-sm text-[var(--color-cream)]">{climate.rainfall}</span>
          </div>
          <div className="flex items-center gap-2">
            <ThermometerSun className="w-4 h-4 text-[rgba(246,241,233,0.5)]" />
            <span className="text-sm text-[var(--color-cream)]">{climate.temp}</span>
          </div>
        </div>
      </div>
      <div className="text-right">
        <span className="text-[10px] tracking-[0.1em] uppercase text-[rgba(246,241,233,0.4)] block mb-1">Harvest Month</span>
        <span className="text-sm text-[var(--color-cream)] font-medium">{climate.month}</span>
      </div>
    </motion.div>
  );
};

const SpecGrid = ({ data }: { data: TraceabilityData }) => {
  const specs = [
    { label: "SCA Score", value: data.scaScore, icon: Star },
    { label: "Grade", value: data.grade, icon: AwardIcon },
    { label: "Moisture", value: data.moisture, icon: Droplet },
    { label: "Cultivar", value: data.cultivar, icon: LeafIcon }
  ];

  return (
    <div className="grid grid-cols-2 gap-6">
      {specs.map((spec, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: i * 0.1, type: "spring", stiffness: 50, damping: 20 }}
          className="p-8 rounded-[28px] bg-[rgba(246,241,233,0.03)] backdrop-blur-[12px] border border-[rgba(246,241,233,0.08)] hover:bg-[rgba(246,241,233,0.06)] hover:border-[rgba(200,169,107,0.3)] transition-all duration-500 group"
        >
          <spec.icon className="w-6 h-6 text-[var(--color-gold)] mb-6 opacity-80 group-hover:opacity-100 transition-opacity" />
          <span className="text-[36px] font-light text-[var(--color-cream)] block leading-none mb-2" style={{ fontFamily: "var(--font-heading)" }}>
            {spec.value}
          </span>
          <span className="text-[11px] tracking-[0.2em] uppercase text-[rgba(246,241,233,0.5)] font-medium font-sans">
            {spec.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
};

const OriginMap = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 50, damping: 20 }}
      className="relative w-full h-[240px] rounded-[28px] overflow-hidden bg-[#0a1f14] border border-[rgba(200,169,107,0.15)] mt-6 flex items-center justify-center group"
    >
      {/* Topographic Rings Animation */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-50 transition-opacity duration-1000">
        <div className="absolute w-[400px] h-[400px] border border-[var(--color-gold)] rounded-full animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite] opacity-20" />
        <div className="absolute w-[250px] h-[250px] border border-[var(--color-gold)] rounded-full animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite_1s] opacity-30" />
        <div className="absolute w-[100px] h-[100px] border border-[var(--color-gold)] rounded-full opacity-40" />
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(200,169,107,0.8) 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
      
      {/* Pin */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative">
          <div className="absolute -inset-2 bg-[var(--color-gold)] rounded-full opacity-20 animate-pulse" />
          <div className="w-3 h-3 bg-[var(--color-gold)] rounded-full shadow-[0_0_15px_var(--color-gold)] mb-3" />
        </div>
        <span className="text-[var(--color-gold)] text-[11px] tracking-[0.2em] uppercase font-medium mb-1">
          Gichugu, Kirinyaga
        </span>
        <div className="flex items-center gap-1.5 text-[rgba(246,241,233,0.4)]">
          <Navigation className="w-3 h-3" />
          <span className="text-[10px] tracking-widest font-mono">0°30'0"S 37°18'0"E</span>
        </div>
      </div>
    </motion.div>
  );
};

const JourneyTimeline = ({ data }: { data: TraceabilityData }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const steps = [
    {
      icon: Mountain,
      title: "Origin",
      subtitle: "Gichugu, Kirinyaga",
      details: [
        { label: "Altitude", value: data.altitude },
        { label: "Soil", value: data.soil }
      ]
    },
    {
      icon: Sprout,
      title: "Harvest",
      subtitle: "Selective Picking",
      details: [
        { label: "Date", value: data.harvestDate },
        { label: "Contributors", value: `${data.farmersCount} Farmers` }
      ]
    },
    {
      icon: Droplets,
      title: "Processing",
      subtitle: `${data.factory} Factory`,
      details: [
        { label: "Method", value: data.processingMethod },
        { label: "Fermentation", value: data.fermentationTime },
        { label: "Drying", value: data.dryingTime }
      ]
    },
    {
      icon: Package,
      title: "Export",
      subtitle: "Quality Assurance",
      details: [
        { label: "Ready Date", value: data.exportDate },
        { label: "Status", value: data.status }
      ]
    }
  ];

  return (
    <div ref={containerRef} className="relative py-12">
      {/* Animated Timeline Line */}
      <div className="absolute left-8 md:left-[50px] top-0 bottom-0 w-[1px] bg-[rgba(200,169,107,0.15)]" />
      <motion.div 
        className="absolute left-8 md:left-[50px] top-0 bottom-0 w-[1px] bg-gradient-to-b from-[var(--color-gold)] to-transparent origin-top"
        style={{ scaleY: scrollYProgress }}
      />

      <div className="space-y-24">
        {steps.map((step, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: i * 0.1, type: "spring", stiffness: 50, damping: 20 }}
            className="relative flex flex-col md:flex-row gap-8 md:gap-16 items-start"
          >
            {/* Center Node */}
            <div className="absolute left-8 md:left-[50px] w-10 h-10 rounded-full bg-[var(--color-forest)] border border-[var(--color-gold)] flex items-center justify-center -translate-x-1/2 z-10 shadow-[0_0_15px_rgba(200,169,107,0.2)]">
              <step.icon className="w-4 h-4 text-[var(--color-gold)]" />
            </div>

            {/* Empty space for alignment on desktop */}
            <div className="hidden md:block w-[100px] shrink-0" />

            {/* Content */}
            <div className="pl-20 md:pl-0 pt-1 md:pt-0 w-full max-w-[480px]">
              <span className="text-[10px] tracking-[0.25em] uppercase text-[var(--color-gold)] font-medium mb-3 block">
                Step 0{i + 1}
              </span>
              <h3 className="text-[32px] text-[var(--color-cream)] mb-2 leading-none" style={{ fontFamily: "var(--font-heading)" }}>
                {step.title}
              </h3>
              <p className="text-[15px] text-[rgba(246,241,233,0.6)] mb-8 font-sans">
                {step.subtitle}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                {step.details.map((detail, j) => (
                  <div key={j} className="px-5 py-3 rounded-[16px] bg-[rgba(246,241,233,0.03)] backdrop-blur-[12px] border border-[rgba(246,241,233,0.08)] flex-1 relative overflow-hidden group">
                    {/* Live Pulse effect for Status */}
                    {detail.label === "Status" && (
                      <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-[var(--color-gold)] animate-pulse shadow-[0_0_8px_var(--color-gold)]" />
                    )}
                    <span className="text-[9px] uppercase tracking-[0.15em] text-[rgba(246,241,233,0.4)] block mb-1.5 font-medium">{detail.label}</span>
                    <span className={`text-[14px] font-sans ${detail.label === "Status" ? "text-[var(--color-gold)]" : "text-[var(--color-cream)]"}`}>{detail.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// LOADING SKELETON
// ============================================================================

const TraceabilitySkeleton = () => (
  <div className="min-h-screen bg-[var(--color-forest)] flex items-center justify-center">
    <div className="flex flex-col items-center">
      <Loader2 className="w-8 h-8 text-[var(--color-gold)] animate-spin mb-4" />
      <span className="text-[10px] tracking-[0.25em] uppercase text-[var(--color-gold)]">Verifying Origin Data</span>
    </div>
  </div>
);

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function TraceabilityPage({ params }: { params: { lotId: string } }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<TraceabilityData | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Simulate auth state

  useEffect(() => {
    // Simulate 1-second transition delay fetch
    const timer = setTimeout(() => {
      setData(getMockData(params.lotId));
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [params.lotId]);

  if (loading || !data) return <TraceabilitySkeleton />;

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-[var(--color-forest)] text-[var(--color-cream)] font-sans selection:bg-[var(--color-gold)] selection:text-[var(--color-forest)]"
    >
      
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative pt-48 pb-32 px-6 lg:px-8 overflow-hidden border-b border-[rgba(200,169,107,0.1)]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2000')] bg-cover bg-center opacity-10 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1f14] via-transparent to-[var(--color-forest)]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-radial from-[rgba(200,169,107,0.08)] to-transparent rounded-full blur-3xl" />
        
        <div className="relative z-10 max-w-[1400px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, type: "spring", stiffness: 40, damping: 20 }}
          >
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[rgba(200,169,107,0.3)] bg-[rgba(200,169,107,0.05)] backdrop-blur-md text-[var(--color-gold)] text-[10px] tracking-[0.25em] uppercase mb-10">
              <MapPin className="w-3 h-3" /> Trace Lot: {data.id}
            </span>
            <h1 className="text-[clamp(40px,7vw,96px)] leading-[1.05] text-[var(--color-cream)] mb-8" style={{ fontFamily: "var(--font-heading)" }}>
              Kenyan Excellence <br/>
              <span className="italic text-[var(--color-gold)]">at Origin</span>
            </h1>
            <p className="text-[clamp(16px,2vw,20px)] text-[rgba(246,241,233,0.6)] max-w-[600px] mx-auto font-light tracking-wide mb-8">
              Complete transparency for <strong className="text-[var(--color-cream)] font-normal">{data.name}</strong> from the <strong className="text-[var(--color-cream)] font-normal">{data.factory}</strong> factory.
            </p>

            {/* Certification Badge Stack */}
            <div className="flex flex-wrap justify-center gap-4">
              {data.certifications.map((cert, i) => (
                <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(246,241,233,0.1)] text-[rgba(246,241,233,0.5)] hover:text-[var(--color-gold)] hover:border-[var(--color-gold)] transition-colors duration-300 cursor-default">
                  <CheckCircle2 className="w-3 h-3" />
                  <span className="text-[10px] tracking-wider uppercase">{cert}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* MAIN CONTENT AREA */}
      <section className="py-32 px-6 lg:px-8 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 lg:gap-32">
          
          {/* Left Column: The Journey */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-16"
            >
              <h2 className="text-[clamp(32px,4vw,40px)] text-[var(--color-cream)] mb-4 leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
                The Coffee <span className="italic text-[var(--color-gold)]">Journey</span>
              </h2>
              <p className="text-[rgba(246,241,233,0.5)] text-lg max-w-[500px]">
                Trace every step from the volcanic soils of Kirinyaga to final export preparation.
              </p>
            </motion.div>
            
            <JourneyTimeline data={data} />
          </div>

          {/* Right Column: The "Buyer's Eye" Data Panel */}
          <div className="lg:col-span-5">
            <div className="sticky top-40">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mb-10"
              >
                <h2 className="text-[clamp(32px,4vw,40px)] text-[var(--color-cream)] mb-4 leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
                  Lot <span className="italic text-[var(--color-gold)]">Specifications</span>
                </h2>
                <p className="text-[rgba(246,241,233,0.5)] text-lg">
                  Rigorous quality metrics verified by independent Q-Graders.
                </p>
              </motion.div>
              
              <SpecGrid data={data} />
              <SensoryRadar data={data.sensoryProfile} />
              <ClimateCard climate={data.climate} />
              <OriginMap />

              {/* Dynamic Next Steps CTA */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-12"
              >
                {isAuthenticated ? (
                  <LuxuryButton variant="gold" size="lg" className="w-full justify-center">
                    Request Sample <ArrowRight className="w-4 h-4 ml-2" />
                  </LuxuryButton>
                ) : (
                  <LuxuryButton variant="outline" size="lg" className="w-full justify-center">
                    Join Waitlist for this Lot
                  </LuxuryButton>
                )}
              </motion.div>
            </div>
          </div>

        </div>
      </section>

      {/* HUMAN CONNECTION FOOTER SECTION */}
      <section className="py-40 bg-[#0a1f14] relative overflow-hidden border-t border-[rgba(200,169,107,0.1)]">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-radial from-[rgba(200,169,107,0.06)] to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-radial from-[rgba(18,53,36,0.4)] to-transparent rounded-full blur-3xl" />
        
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Image & Quote */}
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, type: "spring", stiffness: 40, damping: 20 }}
            >
              <div className="relative aspect-square lg:aspect-[4/5] rounded-[32px] overflow-hidden mb-8 shadow-[0_20px_60px_rgba(0,0,0,0.4)] border border-[rgba(255,255,255,0.05)] group">
                <img 
                  src="https://images.unsplash.com/photo-1606318313647-13a843c03ad8?q=80&w=800" 
                  alt={data.farmerQuote.author}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1f14] via-[rgba(10,31,20,0.4)] to-transparent" />
                
                {/* Audio Embed Overlay */}
                <div className="absolute top-6 right-6">
                  <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="flex items-center gap-3 px-4 py-2 rounded-full bg-[rgba(10,31,20,0.6)] backdrop-blur-md border border-[rgba(200,169,107,0.3)] text-[var(--color-gold)] hover:bg-[rgba(10,31,20,0.8)] transition-colors"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    <span className="text-[10px] uppercase tracking-widest">Listen to Story</span>
                  </button>
                </div>

                <div className="absolute bottom-10 left-10 right-10">
                  <h3 className="text-[clamp(24px,3vw,32px)] text-[var(--color-cream)] mb-2" style={{ fontFamily: "var(--font-heading)" }}>{data.farmerQuote.author}</h3>
                  <p className="text-xs tracking-[0.2em] uppercase text-[var(--color-gold)] font-medium">{data.farmerQuote.role}</p>
                </div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.2, type: "spring", stiffness: 40, damping: 20 }}
              className="lg:pl-10"
            >
              <Quote className="w-16 h-16 text-[var(--color-gold)] mb-10 opacity-30" />
              <p className="text-[clamp(24px,3vw,36px)] text-[var(--color-cream)] leading-[1.4] italic mb-16" style={{ fontFamily: "var(--font-heading)" }}>
                "{data.farmerQuote.text}"
              </p>
              
              <div className="p-8 rounded-[28px] bg-[rgba(200,169,107,0.05)] backdrop-blur-[12px] border border-[rgba(200,169,107,0.15)] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-[var(--color-gold)]" />
                <span className="text-[10px] tracking-[0.2em] uppercase text-[rgba(246,241,233,0.5)] mb-3 block font-medium">Direct Impact</span>
                <p className="text-lg text-[var(--color-gold)] leading-relaxed">{data.impact}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
