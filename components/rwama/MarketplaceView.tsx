"use client";

import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Mountain, Package, Star, Heart, ArrowUpRight, Loader2, Bell } from "lucide-react";
import { LuxuryButton } from "./LuxuryButton";
import { useRouter, useSearchParams } from "next/navigation";

// Types
import { CoffeeLot } from "@/app/api/lots/route";

const FACTORIES = ["All", "Muthigi-ini", "Kimatu", "Muburi"];
const GRADES = ["All", "AA", "AB", "PB"];
const AVAILABILITIES = ["All", "In-Stock", "Pre-order"];

const fetchLots = async (params: URLSearchParams) => {
  const res = await fetch(`/api/lots?${params.toString()}`);
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
};

export default function MarketplaceView() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize state from URL or defaults
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [debouncedSearch] = useDebounce(searchTerm, 500);
  
  const [factory, setFactory] = useState(searchParams.get("factory") || "All");
  const [grade, setGrade] = useState(searchParams.get("grade") || "All");
  const [availability, setAvailability] = useState(searchParams.get("availability") || "All");
  const [minScore, setMinScore] = useState(Number(searchParams.get("minScore")) || 0);

  // Sync state to URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedSearch) params.set("search", debouncedSearch);
    if (factory !== "All") params.set("factory", factory);
    if (grade !== "All") params.set("grade", grade);
    if (availability !== "All") params.set("availability", availability);
    if (minScore > 0) params.set("minScore", minScore.toString());

    const newUrl = params.toString() ? `?${params.toString()}` : "/marketplace";
    router.replace(newUrl, { scroll: false });
  }, [debouncedSearch, factory, grade, availability, minScore, router]);

  // Query Data
  const { data: lots, isLoading, isError } = useQuery<CoffeeLot[]>({
    queryKey: ["lots", debouncedSearch, factory, grade, availability, minScore],
    queryFn: () => {
      const params = new URLSearchParams();
      if (debouncedSearch) params.set("search", debouncedSearch);
      if (factory !== "All") params.set("factory", factory);
      if (grade !== "All") params.set("grade", grade);
      if (availability !== "All") params.set("availability", availability);
      if (minScore > 0) params.set("minScore", minScore.toString());
      return fetchLots(params);
    }
  });

  return (
    <section id="explore-lots" className="py-24 lg:py-32 bg-[var(--color-cream)] relative">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        
        {/* FILTERS TOP BAR */}
        <div className="sticky top-20 z-40 bg-[rgba(246,241,233,0.85)] backdrop-blur-md border-b border-[rgba(18,53,36,0.1)] pb-6 pt-4 mb-12">
          <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center">
            
            {/* Search */}
            <div className="relative w-full lg:w-[350px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[rgba(18,53,36,0.4)]" />
              <input
                type="text"
                placeholder="Search lots, factories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full bg-white text-[var(--color-forest)] placeholder:text-[rgba(18,53,36,0.4)] border border-[rgba(18,53,36,0.1)] focus:ring-2 focus:ring-[var(--color-gold)] outline-none transition-all"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
              {/* Factory Filter */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-widest text-[rgba(18,53,36,0.5)]">Factory</span>
                <select 
                  value={factory}
                  onChange={(e) => setFactory(e.target.value)}
                  className="bg-white border border-[rgba(18,53,36,0.1)] rounded-full px-4 py-2 text-sm text-[var(--color-forest)] outline-none focus:border-[var(--color-gold)] cursor-pointer"
                >
                  {FACTORIES.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>

              {/* Grade Filter */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-widest text-[rgba(18,53,36,0.5)]">Grade</span>
                <select 
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="bg-white border border-[rgba(18,53,36,0.1)] rounded-full px-4 py-2 text-sm text-[var(--color-forest)] outline-none focus:border-[var(--color-gold)] cursor-pointer"
                >
                  {GRADES.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>

              {/* Availability Filter */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-widest text-[rgba(18,53,36,0.5)]">Status</span>
                <select 
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                  className="bg-white border border-[rgba(18,53,36,0.1)] rounded-full px-4 py-2 text-sm text-[var(--color-forest)] outline-none focus:border-[var(--color-gold)] cursor-pointer"
                >
                  {AVAILABILITIES.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>
            </div>

          </div>
        </div>

        {/* CONTENT GRID */}
        {isError && (
          <div className="text-center py-20 text-[var(--color-forest)]">
            <p>Failed to load coffee lots. Please try again later.</p>
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[1, 2, 3, 4, 5, 6].map((n) => <LotCardSkeleton key={n} />)}
          </div>
        ) : (
          <>
            {lots && lots.length > 0 ? (
              <motion.div 
                layout 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
              >
                <AnimatePresence>
                  {lots.map((lot) => (
                    <LotCard key={lot.id} lot={lot} />
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="flex flex-col items-center justify-center py-32 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-[rgba(18,53,36,0.05)] flex items-center justify-center mb-6">
                  <Bell className="w-8 h-8 text-[var(--color-gold)]" />
                </div>
                <h3 className="text-2xl text-[var(--color-forest)] mb-2" style={{ fontFamily: "var(--font-heading)" }}>No lots currently available</h3>
                <p className="text-[rgba(18,53,36,0.6)] max-w-[400px] mb-8">
                  We couldn't find any lots matching your current filters. Adjust your search or join our harvest alerts.
                </p>
                <LuxuryButton variant="forest" size="lg">
                  Notify Me When Available
                </LuxuryButton>
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

// ============================================================================
// LOT CARD COMPONENT
// ============================================================================

function LotCard({ lot }: { lot: CoffeeLot }) {
  const router = useRouter();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ duration: 0.4, type: "spring", stiffness: 50 }}
      className="group relative bg-white rounded-[24px] border border-[rgba(18,53,36,0.08)] overflow-hidden transition-all duration-500 hover:shadow-[0_20px_60px_rgba(18,53,36,0.08)] hover:scale-[1.02] flex flex-col"
    >
      {/* Image Header */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-forest)]">
        <img 
          src={lot.image} 
          alt={lot.name}
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(18,53,36,0.9)] via-transparent to-transparent" />
        
        <div className="absolute top-4 left-4 px-3 py-1.5 bg-[rgba(255,255,255,0.95)] backdrop-blur-sm rounded-full">
          <span className="text-[10px] font-medium text-[var(--color-forest)] tracking-wider flex items-center gap-1">
            <MapPin className="w-3 h-3" /> {lot.factory}
          </span>
        </div>
        
        <div className="absolute top-4 right-4 px-3 py-1.5 bg-gradient-to-r from-[#d4b675] to-[var(--color-gold)] rounded-full shadow-lg">
          <span className="text-[10px] font-bold text-[var(--color-forest)]">
            Grade {lot.grade}
          </span>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="mb-4">
          <span className="text-[10px] tracking-[0.15em] uppercase text-[rgba(18,53,36,0.4)] font-mono block mb-1">
            {lot.id}
          </span>
          <h3 className="text-xl text-[var(--color-forest)]" style={{ fontFamily: "var(--font-heading)" }}>
            {lot.name}
          </h3>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-4 py-4 border-y border-[rgba(18,53,36,0.06)] mb-4">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[rgba(18,53,36,0.4)] block mb-1">SCA Score</span>
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-[var(--color-gold)] fill-[var(--color-gold)]" />
              <span className="text-lg font-medium text-[var(--color-forest)]">{lot.scaScore}</span>
            </div>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[rgba(18,53,36,0.4)] block mb-1">Status</span>
            <div className="flex items-center gap-1.5">
              <Package className="w-4 h-4 text-[var(--color-forest)] opacity-60" />
              <span className="text-sm font-medium text-[var(--color-forest)]">{lot.availability}</span>
            </div>
          </div>
        </div>

        {/* Flavor Tags */}
        <div className="mb-6 flex-1">
          <div className="flex flex-wrap gap-2">
            {lot.flavorNotes.map(note => (
              <span key={note} className="px-3 py-1 bg-[rgba(200,169,107,0.1)] text-[var(--color-coffee)] text-[11px] rounded-full border border-[rgba(200,169,107,0.2)]">
                {note}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[rgba(18,53,36,0.4)] block mb-0.5">FOB Price</span>
            <span className="text-xl font-light text-[var(--color-forest)]" style={{ fontFamily: "var(--font-heading)" }}>{lot.price}</span>
          </div>
          
          <button 
            onClick={() => router.push(`/trace/${lot.id}`)}
            className="flex items-center gap-2 px-6 py-3 bg-[var(--color-forest)] text-[var(--color-cream)] rounded-full text-sm font-medium hover:bg-[var(--color-coffee)] transition-colors hover:shadow-lg"
          >
            View Details <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================================
// SKELETON COMPONENT
// ============================================================================

function LotCardSkeleton() {
  return (
    <div className="bg-white rounded-[24px] border border-[rgba(18,53,36,0.08)] overflow-hidden flex flex-col h-full animate-pulse">
      <div className="relative aspect-[4/3] bg-[rgba(18,53,36,0.05)]" />
      <div className="p-6 flex-1 flex flex-col">
        <div className="h-3 w-24 bg-[rgba(18,53,36,0.05)] rounded mb-3" />
        <div className="h-6 w-3/4 bg-[rgba(18,53,36,0.08)] rounded mb-6" />
        
        <div className="grid grid-cols-2 gap-4 py-4 border-y border-[rgba(18,53,36,0.06)] mb-4">
          <div className="h-8 bg-[rgba(18,53,36,0.05)] rounded" />
          <div className="h-8 bg-[rgba(18,53,36,0.05)] rounded" />
        </div>
        
        <div className="flex gap-2 mb-6">
          <div className="h-6 w-16 bg-[rgba(18,53,36,0.05)] rounded-full" />
          <div className="h-6 w-20 bg-[rgba(18,53,36,0.05)] rounded-full" />
        </div>
        
        <div className="flex items-center justify-between mt-auto">
          <div className="h-8 w-20 bg-[rgba(18,53,36,0.05)] rounded" />
          <div className="h-10 w-32 bg-[rgba(18,53,36,0.08)] rounded-full" />
        </div>
      </div>
    </div>
  );
}
