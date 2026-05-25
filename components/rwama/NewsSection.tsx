'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowUpRight, Calendar } from 'lucide-react'
import { LuxuryButton } from './LuxuryButton'

const NEWS_ITEMS = [
  {
    id: 1,
    category: 'Harvest Report',
    title: '2024/25 Season Opens with Exceptional Quality',
    excerpt: 'Early cupping scores show remarkable consistency across all three washing stations, with average SCA scores exceeding 87 points.',
    date: 'Nov 15, 2024',
    readTime: '4 min read',
    featured: true,
  },
  {
    id: 2,
    category: 'Community',
    title: 'Farmer Training Program Expands to 500+ Members',
    excerpt: 'New sustainability initiative focuses on regenerative agriculture practices and climate resilience.',
    date: 'Nov 8, 2024',
    readTime: '3 min read',
    featured: false,
  },
  {
    id: 3,
    category: 'Awards',
    title: 'Rwama Recognized at African Coffee Excellence Awards',
    excerpt: 'Our Kimatu AA lot awarded Gold Medal in the East African Specialty Coffee competition.',
    date: 'Oct 28, 2024',
    readTime: '2 min read',
    featured: false,
  },
]

export function NewsSection() {
  return (
    <section className="relative py-32 md:py-48 bg-[var(--color-cream)] overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full bg-gradient-radial from-[var(--color-gold-20)] to-transparent opacity-40 translate-x-1/3 -translate-y-1/3" />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 md:mb-20"
        >
          <div>
            <motion.span 
              className="inline-block text-[11px] tracking-[0.25em] uppercase text-[var(--color-gold)] font-medium mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Latest Updates
            </motion.span>
            <h2 
              className="text-[clamp(36px,5vw,56px)] text-[var(--color-forest)] leading-[1.1]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              News & Insights
            </h2>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-6 md:mt-0"
          >
            <Link 
              href="/news"
              className="inline-flex items-center gap-2 text-[var(--color-forest)] hover:text-[var(--color-gold)] transition-colors duration-300 group"
            >
              <span className="text-[14px] tracking-[0.1em] uppercase font-medium">View All News</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </motion.div>
        </motion.div>

        {/* News Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Featured Article */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:row-span-2"
          >
            <Link href={`/news/${NEWS_ITEMS[0].id}`}>
              <motion.article
                className="group relative h-full bg-white rounded-[28px] overflow-hidden border border-[rgba(18,53,36,0.08)]
                         shadow-[0_2px_12px_rgba(0,0,0,0.05)]
                         hover:shadow-[0_20px_60px_rgba(18,53,36,0.15)] transition-all duration-700"
                whileHover={{ y: -6 }}
              >
                {/* Image */}
                <div className="relative h-[300px] lg:h-[400px] overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-gradient-to-br from-[var(--color-forest)] to-[#1a4a32] transition-transform duration-700 group-hover:scale-110"
                    style={{
                      backgroundImage: `radial-gradient(circle at 30% 30%, rgba(200, 169, 107, 0.15) 0%, transparent 50%)`,
                    }}
                  />
                  
                  {/* Category Badge */}
                  <div className="absolute top-6 left-6 px-4 py-2 bg-[var(--color-gold)] rounded-full">
                    <span className="text-[11px] tracking-[0.1em] uppercase text-[var(--color-forest)] font-semibold">
                      {NEWS_ITEMS[0].category}
                    </span>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-forest)] via-transparent to-transparent opacity-60" />
                </div>

                {/* Content */}
                <div className="p-8 lg:p-10">
                  <div className="flex items-center gap-3 text-[13px] text-[rgba(18,53,36,0.5)] mb-4">
                    <Calendar className="w-4 h-4" />
                    <span>{NEWS_ITEMS[0].date}</span>
                    <span>·</span>
                    <span>{NEWS_ITEMS[0].readTime}</span>
                  </div>
                  
                  <h3 
                    className="text-[28px] lg:text-[32px] text-[var(--color-forest)] mb-4 group-hover:text-[var(--color-gold)] transition-colors duration-500 leading-tight"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {NEWS_ITEMS[0].title}
                  </h3>
                  
                  <p className="text-[15px] text-[rgba(18,53,36,0.7)] leading-relaxed mb-6">
                    {NEWS_ITEMS[0].excerpt}
                  </p>

                  <div className="flex items-center gap-2 text-[var(--color-gold)] font-medium">
                    <span className="text-[14px]">Read Article</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </div>
              </motion.article>
            </Link>
          </motion.div>

          {/* Secondary Articles */}
          <div className="space-y-8">
            {NEWS_ITEMS.slice(1).map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ 
                  duration: 0.7, 
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1] 
                }}
              >
                <Link href={`/news/${article.id}`}>
                  <motion.article
                    className="group flex flex-col sm:flex-row gap-6 bg-white rounded-[24px] overflow-hidden border border-[rgba(18,53,36,0.08)]
                             shadow-[0_2px_12px_rgba(0,0,0,0.05)] p-6
                             hover:shadow-[0_16px_48px_rgba(18,53,36,0.12)] transition-all duration-500"
                    whileHover={{ x: 6 }}
                  >
                    {/* Image */}
                    <div className="relative w-full sm:w-[160px] h-[140px] sm:h-[140px] rounded-[16px] overflow-hidden flex-shrink-0">
                      <div 
                        className="absolute inset-0 bg-gradient-to-br from-[var(--color-forest)] to-[#1a4a32] transition-transform duration-500 group-hover:scale-110"
                        style={{
                          backgroundImage: `radial-gradient(circle at 30% 30%, rgba(200, 169, 107, 0.15) 0%, transparent 50%)`,
                        }}
                      />
                      
                      {/* Category Badge */}
                      <div className="absolute top-3 left-3 px-2.5 py-1 bg-[var(--color-gold)] rounded-full">
                        <span className="text-[9px] tracking-[0.1em] uppercase text-[var(--color-forest)] font-semibold">
                          {article.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col justify-center flex-1 min-w-0">
                      <div className="flex items-center gap-2 text-[12px] text-[rgba(18,53,36,0.5)] mb-2">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{article.date}</span>
                      </div>
                      
                      <h3 
                        className="text-[18px] text-[var(--color-forest)] mb-2 group-hover:text-[var(--color-gold)] transition-colors duration-500 leading-tight line-clamp-2"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {article.title}
                      </h3>
                      
                      <p className="text-[13px] text-[rgba(18,53,36,0.6)] leading-relaxed line-clamp-2">
                        {article.excerpt}
                      </p>

                      <div className="flex items-center gap-1.5 text-[var(--color-gold)] mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-[12px] font-medium">Read more</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </motion.article>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-center mt-20 md:mt-28"
        >
          <p className="text-[16px] text-[rgba(18,53,36,0.6)] mb-6">
            Stay updated with the latest from Rwama
          </p>
          <LuxuryButton href="/news" variant="outline" size="lg">
            View All Articles
          </LuxuryButton>
        </motion.div>
      </div>
    </section>
  )
}
