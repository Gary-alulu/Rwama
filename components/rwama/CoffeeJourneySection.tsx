"use client";

import { motion } from "framer-motion";
import { Cherry, ClipboardCheck, Droplets, Sprout } from "lucide-react";
import { LuxuryButton } from "./LuxuryButton";

const JOURNEY_STEPS = [
  {
    number: "01",
    title: "Cultivation",
    description:
      "Arabica trees flourish between 1,650m and 1,800m on the mineral-rich volcanic soils of Mount Kenya's southern slopes.",
    icon: Sprout,
    image: "/images/journey/cultivation.jpg",
  },
  {
    number: "02",
    title: "Selective Harvest",
    description:
      "Each cherry is hand-picked at peak ripeness between October and January — never strip-picked. Quality over speed.",
    icon: Cherry,
    image: "/images/journey/harvest.jpg",
  },
  {
    number: "03",
    title: "Wet Processing",
    description:
      "Cherries are pulped, fermented for 36–48 hours, washed in clean mountain water, and sun-dried on raised beds.",
    icon: Droplets,
    image: "/images/journey/processing.jpg",
  },
  {
    number: "04",
    title: "Traceability",
    description:
      "Every lot is assigned a Traceability ID linking it to the farmer, factory, processing batch, and sensory profile.",
    icon: ClipboardCheck,
    image: "/images/journey/traceability.jpg",
  },
];

export function CoffeeJourneySection() {
  return (
    <section className="relative py-32 md:py-48 bg-[var(--color-cream)] overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-gradient-radial from-[var(--color-gold-20)] to-transparent opacity-30 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] rounded-full bg-gradient-radial from-[var(--color-forest-10)] to-transparent opacity-50 translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20 md:mb-32"
        >
          <motion.span
            className="inline-block text-[11px] tracking-[0.25em] uppercase text-[var(--color-gold)] font-medium mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            From Soil to Cup
          </motion.span>
          <h2
            className="text-[clamp(36px,5vw,64px)] text-[var(--color-forest)] leading-[1.1] mb-6"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            The Rwama Coffee Journey
          </h2>
          <p className="text-[17px] text-[rgba(18,53,36,0.7)] max-w-[580px] mx-auto leading-relaxed">
            Every cup tells a story of meticulous care, from the volcanic soils
            of Kirinyaga to your morning ritual.
          </p>
        </motion.div>

        {/* Journey Steps - Alternating Layout */}
        <div className="space-y-24 md:space-y-32">
          {JOURNEY_STEPS.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.9,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                index % 2 === 1 ? "lg:grid-flow-dense" : ""
              }`}
            >
              {/* Content */}
              <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                <div className="flex items-center gap-4 mb-6">
                  <span
                    className="text-[48px] md:text-[64px] font-light text-[var(--color-gold)] opacity-30"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {step.number}
                  </span>
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-[var(--color-gold)] to-transparent opacity-30" />
                </div>
                <h3
                  className="text-[28px] md:text-[36px] text-[var(--color-forest)] mb-4"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {step.title}
                </h3>
                <p className="text-[16px] md:text-[17px] text-[rgba(18,53,36,0.7)] leading-[1.8] mb-6">
                  {step.description}
                </p>
                {index === JOURNEY_STEPS.length - 1 && (
                  <LuxuryButton
                    href="/traceability"
                    variant="outline"
                    size="sm"
                  >
                    Explore Traceability
                  </LuxuryButton>
                )}
              </div>

              {/* Image/Visual */}
              <div
                className={`relative ${index % 2 === 1 ? "lg:col-start-1" : ""}`}
              >
                <motion.div
                  className="relative aspect-[4/3] rounded-[28px] overflow-hidden group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Placeholder gradient with pattern */}
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-[var(--color-forest)] to-[#1a4a32]"
                    style={{
                      backgroundImage: `radial-gradient(circle at 30% 30%, rgba(200, 169, 107, 0.1) 0%, transparent 50%)`,
                    }}
                  />

                  {/* Step number watermark */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span
                      className="text-[120px] md:text-[180px] font-light text-white opacity-[0.03]"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {step.number}
                    </span>
                  </div>

                  {/* Icon overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      className="text-[var(--color-gold)]"
                    >
                      <step.icon
                        className="w-16 h-16 md:w-20 md:h-20"
                        strokeWidth={1.5}
                      />
                    </motion.div>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-[var(--color-forest)] opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                </motion.div>

                {/* Decorative elements */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 border border-[var(--color-gold)] opacity-20 rounded-[20px]" />
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-[var(--color-gold)] opacity-10 rounded-full blur-xl" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-center mt-24 md:mt-32"
        >
          <p className="text-[16px] text-[rgba(18,53,36,0.6)] mb-6">
            Want to see where your coffee comes from?
          </p>
          <LuxuryButton href="/factories" variant="outline" size="lg">
            Explore Our Factories
          </LuxuryButton>
        </motion.div>
      </div>
    </section>
  );
}
