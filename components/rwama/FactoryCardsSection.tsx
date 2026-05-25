"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { LuxuryButton } from "./LuxuryButton";

interface Factory {
  name: string;
  est: number;
  altitude: string;
  farmers: number;
  capacity: string;
  slug: string;
  image: string;
}

interface FactoryCardsSectionProps {
  factories: Factory[];
}

export function FactoryCardsSection({ factories }: FactoryCardsSectionProps) {
  return (
    <section className="relative py-32 md:py-48 bg-[var(--color-forest)] overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(200,169,107,0.3) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-gradient-radial from-[rgba(200,169,107,0.08)] to-transparent -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-gradient-radial from-[rgba(18,53,36,0.5)] to-transparent translate-x-1/3 translate-y-1/3" />

      <div className="relative max-w-[1400px] mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20 md:mb-28"
        >
          <motion.span
            className="inline-block text-[11px] tracking-[0.25em] uppercase text-[var(--color-gold)] font-medium mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Our Heritage
          </motion.span>
          <h2
            className="text-[clamp(36px,5vw,64px)] text-[var(--color-cream)] leading-[1.1] mb-6"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Three Legendary Washing Stations
          </h2>
          <p className="text-[17px] text-[rgba(246,241,233,0.7)] max-w-[600px] mx-auto leading-relaxed">
            Each factory represents generations of coffee mastery, processing
            cherry from over 1,200 member farmers across Kirinyaga.
          </p>
        </motion.div>

        {/* Factory Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {factories.map((factory, index) => (
            <motion.div
              key={factory.slug}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Link href={`/factories/${factory.slug}`}>
                <motion.div
                  className="group relative h-full bg-gradient-to-b from-[rgba(255,255,255,0.08)] to-[rgba(255,255,255,0.02)] 
                           backdrop-blur-sm rounded-[28px] overflow-hidden border border-[rgba(255,255,255,0.1)]
                           hover:border-[rgba(200,169,107,0.3)] transition-all duration-700"
                  whileHover={{ y: -8 }}
                >
                  {/* Image Container */}
                  <div className="relative h-[280px] overflow-hidden">
                    {/* Placeholder gradient with pattern */}
                    <div
                      className="absolute inset-0 bg-gradient-to-br from-[var(--color-forest)] to-[#1a4a32] transition-transform duration-700 group-hover:scale-110"
                      style={{
                        backgroundImage: `radial-gradient(circle at 30% 30%, rgba(200, 169, 107, 0.1) 0%, transparent 50%)`,
                      }}
                    />

                    {/* Factory name watermark */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span
                        className="text-[80px] md:text-[100px] font-light text-white opacity-[0.05] group-hover:opacity-[0.08] transition-opacity duration-500"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        {factory.name.charAt(0)}
                      </span>
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-forest)] via-transparent to-transparent opacity-60" />

                    {/* Year badge */}
                    <div className="absolute top-6 left-6 px-4 py-2 bg-[rgba(0,0,0,0.3)] backdrop-blur-sm rounded-full border border-[rgba(255,255,255,0.1)]">
                      <span className="text-[11px] tracking-[0.15em] uppercase text-[var(--color-cream)] font-medium">
                        Est. {factory.est}
                      </span>
                    </div>

                    {/* Arrow indicator */}
                    <motion.div
                      className="absolute top-6 right-6 w-12 h-12 rounded-full bg-[rgba(255,255,255,0.1)] backdrop-blur-sm 
                               flex items-center justify-center border border-[rgba(255,255,255,0.2)]
                               group-hover:bg-[var(--color-gold)] group-hover:border-[var(--color-gold)] transition-all duration-500"
                      whileHover={{ scale: 1.1 }}
                    >
                      <ArrowUpRight className="w-5 h-5 text-[var(--color-cream)]" />
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <h3
                      className="text-[28px] text-[var(--color-cream)] mb-3 group-hover:text-[var(--color-gold)] transition-colors duration-500"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {factory.name}
                    </h3>
                    <p className="text-[14px] text-[rgba(246,241,233,0.6)] mb-6 leading-relaxed">
                      Processing coffee from {factory.farmers} member farmers at{" "}
                      {factory.altitude} altitude.
                    </p>

                    {/* Stats row */}
                    <div className="grid grid-cols-2 gap-4 pt-6 border-t border-[rgba(255,255,255,0.1)]">
                      <div>
                        <span
                          className="block text-[24px] text-[var(--color-gold)] font-light"
                          style={{ fontFamily: "var(--font-heading)" }}
                        >
                          {factory.altitude}
                        </span>
                        <span className="text-[11px] tracking-[0.1em] uppercase text-[rgba(246,241,233,0.5)]">
                          Altitude
                        </span>
                      </div>
                      <div>
                        <span
                          className="block text-[24px] text-[var(--color-gold)] font-light"
                          style={{ fontFamily: "var(--font-heading)" }}
                        >
                          {factory.capacity}
                        </span>
                        <span className="text-[11px] tracking-[0.1em] uppercase text-[rgba(246,241,233,0.5)]">
                          Capacity
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-center mt-20 md:mt-28"
        >
          <p className="text-[16px] text-[rgba(246,241,233,0.6)] mb-6">
            Discover the heritage behind each washing station
          </p>
          <LuxuryButton href="/factories" variant="outline" size="lg">
            View All Factories
          </LuxuryButton>
        </motion.div>
      </div>
    </section>
  );
}
