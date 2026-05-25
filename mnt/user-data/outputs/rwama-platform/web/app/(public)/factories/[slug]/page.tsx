import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { FactoryPageClient } from './FactoryPageClient'

const FACTORIES = {
  'muthigi-ini': {
    name:         'Muthigi-ini',
    est:          1968,
    altitude:     1680,
    farmers:      430,
    capacity:     350,
    location:     'Kirinyaga Central',
    coordinates:  '-0.5500, 37.3500',
    certs:        ['Rainforest Alliance', 'UTZ Certified', 'Fair Trade'],
    tagline:      'Where Rwama Coffee was born.',
    description:  `Established in 1968, Muthigi-ini is the founding washing station of the Rwama cooperative — 
      the first factory built on the southern slopes of Mount Kenya. For over five decades, its farmers 
      have perfected a washed processing tradition that consistently delivers the region's most sought-after 
      AA grade lots.`,
    heroImage:    '/images/factories/muthigi-ini-hero.jpg',
    accentColor:  '#123524',
    stats: [
      { label: 'Year Established', value: 1968, suffix: '' },
      { label: 'Member Farmers',   value: 430,  suffix: '+' },
      { label: 'Altitude',         value: 1680, suffix: 'm' },
      { label: 'Capacity (MT)',     value: 350,  suffix: '' },
    ],
    process: [
      { title: 'Cherry Reception', body: 'Farmers deliver freshly picked cherries daily between 3pm–7pm. Each delivery is weighed, graded by a registered clerk, and logged by Farmer ID.' },
      { title: 'Pulping',          body: 'Cherries are pulped within 4 hours of delivery using disc pulpers. The parchment is fermented in clean water for 36–48 hours.' },
      { title: 'Washing & Grading', body: 'Parchment passes through a three-channel washing system, separating by density. Grade P1 and P2 go to separate drying tables.' },
      { title: 'Sun Drying',       body: 'Parchment is spread thinly on raised wire beds, turned every 2 hours, and dried for 21–28 days to reach 11–12% moisture.' },
    ],
  },
  'kimatu': {
    name:         'Kimatu',
    est:          1974,
    altitude:     1720,
    farmers:      390,
    capacity:     310,
    location:     'Kirinyaga East',
    coordinates:  '-0.5300, 37.3800',
    certs:        ['UTZ Certified', 'Fair Trade'],
    tagline:      'High altitude, exceptional body.',
    description:  `At 1,720m, Kimatu benefits from the highest diurnal temperature variation among the three 
      factories — producing cherries with particularly complex body and sweetness. 
      Established in 1974, it has become renowned for its AB-grade lots favored by specialty 
      roasters in Japan and Northern Europe.`,
    heroImage:    '/images/factories/kimatu-hero.jpg',
    accentColor:  '#4E342E',
    stats: [
      { label: 'Year Established', value: 1974, suffix: '' },
      { label: 'Member Farmers',   value: 390,  suffix: '+' },
      { label: 'Altitude',         value: 1720, suffix: 'm' },
      { label: 'Capacity (MT)',     value: 310,  suffix: '' },
    ],
    process: [
      { title: 'Cherry Reception',  body: 'Kimatu operates two intake points to service its spread-out farm members. Cherries are sorted by flotation before weighing.' },
      { title: 'Mechanical Pulping', body: 'Three-disc pulper units process up to 4,000 kg per hour. All pulp is composted and returned to member farms as organic fertiliser.' },
      { title: 'Fermentation',      body: 'Extended fermentation of 40–52 hours (longer than regional average) contributes to Kimatu\'s characteristic complex sweetness.' },
      { title: 'Drying & Storage',  body: '23-day average drying period. Parchment is stored in raised, ventilated stores before milling.' },
    ],
  },
  'muburi': {
    name:         'Muburi',
    est:          1979,
    altitude:     1750,
    farmers:      380,
    capacity:     290,
    location:     'Kirinyaga West',
    coordinates:  '-0.5700, 37.3200',
    certs:        ['Rainforest Alliance', 'Organic (Transitional)'],
    tagline:      'The highest. The sweetest.',
    description:  `Muburi sits at the highest elevation of the three factories at 1,750m — and this altitude 
      shows in its cup. Famous for peaberry lots with exceptional sweetness and a clean, lingering 
      finish, Muburi coffees are the most limited in volume and highest in demand among specialty importers.`,
    heroImage:    '/images/factories/muburi-hero.jpg',
    accentColor:  '#7DA27D',
    stats: [
      { label: 'Year Established', value: 1979, suffix: '' },
      { label: 'Member Farmers',   value: 380,  suffix: '+' },
      { label: 'Altitude',         value: 1750, suffix: 'm' },
      { label: 'Capacity (MT)',     value: 290,  suffix: '' },
    ],
    process: [
      { title: 'Selective Picking', body: 'Muburi\'s farmers practice the most rigorous selective picking protocol — only fully red cherries accepted. No floaters.' },
      { title: 'Peaberry Sorting',  body: 'A dedicated peaberry screen sorts the single-bean cherries pre-pulping, enabling lot separation from the outset.' },
      { title: 'Fermentation',      body: '36-hour clean-water fermentation followed by soaking channel for maximum mucilage removal and clean cup character.' },
      { title: 'Raised Bed Drying', body: 'All parchment dried on African raised beds. Muburi\'s high altitude and consistent wind accelerates drying to 18–22 days.' },
    ],
  },
}

type Params = { slug: string }

export async function generateStaticParams() {
  return Object.keys(FACTORIES).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const factory = FACTORIES[params.slug as keyof typeof FACTORIES]
  if (!factory) return { title: 'Not Found' }
  return {
    title: `${factory.name} Factory | Rwama Coffee`,
    description: factory.description.slice(0, 160),
  }
}

export default function FactoryPage({ params }: { params: Params }) {
  const factory = FACTORIES[params.slug as keyof typeof FACTORIES]
  if (!factory) notFound()
  return <FactoryPageClient factory={factory} />
}
