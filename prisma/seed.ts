import { PrismaClient, UserRole, CherryGrade, CoffeeGrade, ProcessingMethod } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding Rwama Coffee database...')

  // ─── Factories ──────────────────────────────────────────────────
  const muthigini = await prisma.factory.upsert({
    where:  { slug: 'muthigi-ini' },
    update: {},
    create: {
      slug:              'muthigi-ini',
      name:              'Muthigi-ini Factory',
      location:          'Kirinyaga Central, Kenya',
      altitudeMeters:    1680,
      yearEstablished:   1968,
      processingCapacity:350,
      totalFarmers:      430,
      certifications:    ['Rainforest Alliance', 'UTZ Certified', 'Fair Trade'],
      description:       'The founding washing station of the Rwama cooperative, established in 1968 on the southern slopes of Mount Kenya.',
      latitude:          -0.5500,
      longitude:         37.3500,
    },
  })

  const kimatu = await prisma.factory.upsert({
    where:  { slug: 'kimatu' },
    update: {},
    create: {
      slug:              'kimatu',
      name:              'Kimatu Factory',
      location:          'Kirinyaga East, Kenya',
      altitudeMeters:    1720,
      yearEstablished:   1974,
      processingCapacity:310,
      totalFarmers:      390,
      certifications:    ['UTZ Certified', 'Fair Trade'],
      description:       'Renowned for complex AB-grade lots with exceptional body and sweetness.',
      latitude:          -0.5300,
      longitude:         37.3800,
    },
  })

  const muburi = await prisma.factory.upsert({
    where:  { slug: 'muburi' },
    update: {},
    create: {
      slug:              'muburi',
      name:              'Muburi Factory',
      location:          'Kirinyaga West, Kenya',
      altitudeMeters:    1750,
      yearEstablished:   1979,
      processingCapacity:290,
      totalFarmers:      380,
      certifications:    ['Rainforest Alliance', 'Organic (Transitional)'],
      description:       'The highest-altitude factory, producing Kirinyaga\'s most sought-after peaberry lots.',
      latitude:          -0.5700,
      longitude:         37.3200,
    },
  })

  console.log('✓ Factories seeded')

  // ─── Users ──────────────────────────────────────────────────────
  const pw = (p: string) => bcrypt.hashSync(p, 10)

  const adminUser = await prisma.user.upsert({
    where:  { email: 'admin@rwama.co.ke' },
    update: {},
    create: {
      email:         'admin@rwama.co.ke',
      name:          'Rwama Admin',
      role:          UserRole.ADMIN,
      emailVerified: new Date(),
    },
  })

  const managerUser = await prisma.user.upsert({
    where:  { email: 'manager@muthigini.rwama.co.ke' },
    update: {},
    create: {
      email:         'manager@muthigini.rwama.co.ke',
      name:          'David Muriuki',
      role:          UserRole.FACTORY_MANAGER,
      emailVerified: new Date(),
    },
  })

  await prisma.factoryManagerProfile.upsert({
    where:  { userId: managerUser.id },
    update: {},
    create: {
      userId:     managerUser.id,
      employeeId: 'RW-EMP-0012',
      factoryId:  muthigini.id,
    },
  })

  const farmerUser = await prisma.user.upsert({
    where:  { email: 'james.kamau@rwama.co.ke' },
    update: {},
    create: {
      email:         'james.kamau@rwama.co.ke',
      name:          'James Kamau',
      role:          UserRole.FARMER,
      emailVerified: new Date(),
    },
  })

  const farmerProfile = await prisma.farmerProfile.upsert({
    where:  { userId: farmerUser.id },
    update: {},
    create: {
      userId:        farmerUser.id,
      farmerId:      'RW-FMR-04821',
      nationalId:    'KE-2847120',
      phoneNumber:   '+254712000001',
      locationZone:  'Kirinyaga Central',
      farmSizeAcres: 1.8,
      joinedYear:    2011,
      factoryId:     muthigini.id,
    },
  })

  const buyerUser = await prisma.user.upsert({
    where:  { email: 'buyer@nishicoffee.jp' },
    update: {},
    create: {
      email:         'buyer@nishicoffee.jp',
      name:          'Yuki Tanaka',
      role:          UserRole.BUYER,
      emailVerified: new Date(),
    },
  })

  await prisma.buyerProfile.upsert({
    where:  { userId: buyerUser.id },
    update: {},
    create: {
      userId:      buyerUser.id,
      companyName: 'Nishi Coffee Import Co.',
      country:     'Japan',
      licenseNo:   'JP-ICL-2024-4821',
      isVerified:  true,
    },
  })

  console.log('✓ Users seeded')

  // ─── Processing batch ────────────────────────────────────────────
  const batch01 = await prisma.processingBatch.upsert({
    where:  { batchCode: 'MUT-B-2026-042' },
    update: {},
    create: {
      batchCode:         'MUT-B-2026-042',
      method:            ProcessingMethod.WASHED,
      totalWeightKg:     2880,
      processingDate:    new Date('2026-02-10'),
      dryingDays:        24,
      fermentationHours: 40,
      factoryId:         muthigini.id,
    },
  })

  const batch02 = await prisma.processingBatch.upsert({
    where:  { batchCode: 'KIM-B-2026-018' },
    update: {},
    create: {
      batchCode:         'KIM-B-2026-018',
      method:            ProcessingMethod.WASHED,
      totalWeightKg:     3720,
      processingDate:    new Date('2026-02-18'),
      dryingDays:        23,
      fermentationHours: 48,
      factoryId:         kimatu.id,
    },
  })

  const batch03 = await prisma.processingBatch.upsert({
    where:  { batchCode: 'MUB-B-2026-009' },
    update: {},
    create: {
      batchCode:         'MUB-B-2026-009',
      method:            ProcessingMethod.WASHED,
      totalWeightKg:     2100,
      processingDate:    new Date('2026-02-22'),
      dryingDays:        20,
      fermentationHours: 36,
      factoryId:         muburi.id,
    },
  })

  // ─── Delivery logs ───────────────────────────────────────────────
  await prisma.deliveryLog.createMany({
    skipDuplicates: true,
    data: [
      { weightKg: 145, cherryGrade: CherryGrade.A, deliveryDate: new Date('2026-05-08'), farmerId: farmerProfile.id, factoryId: muthigini.id },
      { weightKg: 210, cherryGrade: CherryGrade.A, deliveryDate: new Date('2026-05-01'), farmerId: farmerProfile.id, factoryId: muthigini.id },
      { weightKg: 185, cherryGrade: CherryGrade.B, deliveryDate: new Date('2026-04-24'), farmerId: farmerProfile.id, factoryId: muthigini.id },
      { weightKg: 307, cherryGrade: CherryGrade.A, deliveryDate: new Date('2026-04-17'), farmerId: farmerProfile.id, factoryId: muthigini.id },
    ],
  })

  // ─── Coffee lots ─────────────────────────────────────────────────
  const lotAA = await prisma.coffeeLot.upsert({
    where:  { traceabilityId: 'RW-MUT-2026-AA-001' },
    update: {},
    create: {
      traceabilityId:  'RW-MUT-2026-AA-001',
      grade:           CoffeeGrade.AA,
      scaScore:        87.5,
      moisturePercent: 11.2,
      screenSize:      '18+',
      weightKg:        2880,
      numberOfBags:    48,
      flavorProfile:   ['Blackcurrant', 'Citrus Zest', 'Dark Chocolate', 'Jasmine', 'Brown Sugar'],
      cuppingNotes: {
        aroma: 9.0, flavor: 8.75, aftertaste: 8.5,
        acidity: 9.25, body: 8.0, balance: 8.5,
        sweetness: 10.0, clean_cup: 10.0, uniformity: 10.0,
      },
      priceUsdKg:   8.40,
      cropYear:     2026,
      isAvailable:  true,
    },
  })

  await prisma.coffeeLot.upsert({
    where:  { traceabilityId: 'RW-KIM-2026-AB-042' },
    update: {},
    create: {
      traceabilityId:  'RW-KIM-2026-AB-042',
      grade:           CoffeeGrade.AB,
      scaScore:        85.0,
      moisturePercent: 11.8,
      screenSize:      '15-17',
      weightKg:        3720,
      numberOfBags:    62,
      flavorProfile:   ['Stone Fruit', 'Caramel', 'Honey', 'Bergamot', 'Cedar'],
      priceUsdKg:      6.80,
      cropYear:        2026,
      isAvailable:     true,
    },
  })

  await prisma.coffeeLot.upsert({
    where:  { traceabilityId: 'RW-MUB-2026-PB-018' },
    update: {},
    create: {
      traceabilityId:  'RW-MUB-2026-PB-018',
      grade:           CoffeeGrade.PB,
      scaScore:        83.5,
      moisturePercent: 12.1,
      screenSize:      'PB',
      weightKg:        2100,
      numberOfBags:    35,
      flavorProfile:   ['Red Berry', 'Toffee', 'Nutmeg', 'Vanilla', 'Dried Rose'],
      priceUsdKg:      9.20,
      cropYear:        2026,
      isAvailable:     true,
    },
  })

  // ─── Traceability link ───────────────────────────────────────────
  await prisma.traceabilityLink.upsert({
    where: { coffeeLotId_processingBatchId: { coffeeLotId: lotAA.id, processingBatchId: batch01.id } },
    update: {},
    create: {
      coffeeLotId:       lotAA.id,
      processingBatchId: batch01.id,
      contributionPct:   100.00,
    },
  })

  console.log('✓ Lots and traceability links seeded')
  console.log('\n🎉 Seed complete. Rwama Coffee platform is ready.\n')
  console.log('  Admin:   admin@rwama.co.ke')
  console.log('  Manager: manager@muthigini.rwama.co.ke')
  console.log('  Farmer:  james.kamau@rwama.co.ke')
  console.log('  Buyer:   buyer@nishicoffee.jp\n')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
