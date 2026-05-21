import { PrismaClient } from '../src/generated/prisma/client.js'
import { PrismaPg } from '@prisma/adapter-pg'
import * as dotenv from 'dotenv'
import { resolve } from 'path'

dotenv.config({ path: resolve(process.cwd(), '../../.env') })

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
})

const FLEXOFFERS_API_KEY = process.env.FLEXOFFERS_API_KEY ?? ''

const feedUrl = (programId: number, feedId: string): string => {
  const url = new URL('https://content.flexlinks.com/ftp/downloadFeed')
  url.searchParams.set('programId', String(programId))
  url.searchParams.set('feedId', feedId)
  url.searchParams.set('filetype', 'CSV')
  url.searchParams.set('apikey', FLEXOFFERS_API_KEY)
  return url.toString()
}

const FEED_DATA = [
  // North America — US
  { id: 280,    name: 'Famous Footwear',        country: 'US', region: 'na',   sourceCount: 184696,  feedId: '1.966B' },
  { id: 462,    name: 'Florsheim',               country: 'US', region: 'na',   sourceCount: 10034,   feedId: '1.D36' },
  { id: 619,    name: "Bloomingdale's",          country: 'US', region: 'na',   sourceCount: 571377,  feedId: '1.362B' },
  { id: 157064, name: 'Nunn Bush',               country: 'US', region: 'na',   sourceCount: 5079,    feedId: '1.8937' },
  { id: 157129, name: 'e.l.f. Cosmetics',        country: 'US', region: 'na',   sourceCount: 915,     feedId: '1.9B2C' },
  { id: 158350, name: 'UGG',                     country: 'US', region: 'na',   sourceCount: 6080,    feedId: '1.AAD0' },
  { id: 158405, name: 'New Balance',             country: 'US', region: 'na',   sourceCount: 33832,   feedId: '156074.16980605F8ED38F1' },
  { id: 158794, name: 'Finish Line',             country: 'US', region: 'na',   sourceCount: 152473,  feedId: '1.9363' },
  { id: 158953, name: 'Naturalizer',             country: 'US', region: 'na',   sourceCount: 6121,    feedId: '1.9669' },
  { id: 158958, name: 'LifeStride',              country: 'US', region: 'na',   sourceCount: 12797,   feedId: '1.9668' },
  { id: 159550, name: 'Shoemall',                country: 'US', region: 'na',   sourceCount: 255422,  feedId: '1.93D7' },
  { id: 160396, name: 'Keds',                    country: 'US', region: 'na',   sourceCount: 6444,    feedId: '156085.A809D0' },
  { id: 161992, name: 'Nautica',                 country: 'US', region: 'na',   sourceCount: 11417,   feedId: '156052.14F1' },
  { id: 162750, name: 'Banana Republic',         country: 'US', region: 'na',   sourceCount: 19339,   feedId: '156074.63235322F430017' },
  { id: 163728, name: 'Steve Madden',            country: 'US', region: 'na',   sourceCount: 13556,   feedId: '1.926F' },
  { id: 172460, name: 'L.L. Bean',               country: 'US', region: 'na',   sourceCount: 71922,   feedId: '1.9716' },
  { id: 178509, name: 'Shopbop',                 country: 'US', region: 'na',   sourceCount: 121987,  feedId: '1.A570' },
  { id: 179233, name: 'FitFlop',                 country: 'US', region: 'na',   sourceCount: 3449,    feedId: '1.A107' },
  { id: 180034, name: 'ASICS',                   country: 'US', region: 'na',   sourceCount: 24139,   feedId: '1.A024' },
  { id: 180375, name: 'ECCO',                    country: 'US', region: 'na',   sourceCount: 5073,    feedId: '1.9A86' },
  { id: 180392, name: "Savannah's",              country: 'US', region: 'na',   sourceCount: 1375,    feedId: '1.8F0B' },
  { id: 182964, name: 'Sam Edelman',             country: 'US', region: 'na',   sourceCount: 7399,    feedId: '156052.1CA6' },
  { id: 186487, name: 'Estee Lauder',            country: 'US', region: 'na',   sourceCount: 879,     feedId: '1.8DDA' },
  { id: 188219, name: 'Calvin Klein',            country: 'US', region: 'na',   sourceCount: 54819,   feedId: '1.A935' },
  { id: 190243, name: 'SHIEKH',                  country: 'US', region: 'na',   sourceCount: 46474,   feedId: '156052.2082' },
  { id: 193368, name: 'Clothing Shop Online',    country: 'US', region: 'na',   sourceCount: 92296,   feedId: '156052.2197' },
  { id: 196493, name: 'Sperry',                  country: 'US', region: 'na',   sourceCount: 8239,    feedId: '156085.9A5006' },
  { id: 196522, name: 'Cole Haan',               country: 'US', region: 'na',   sourceCount: 6898,    feedId: '1.B2CA' },
  { id: 200092, name: 'FootJoy',                 country: 'US', region: 'na',   sourceCount: 8444,    feedId: '2.D3F0627B84BE09CB' },
  { id: 202021, name: 'Dansko',                  country: 'US', region: 'na',   sourceCount: 1982,    feedId: '156052.243E' },
  { id: 203305, name: 'Hoka One',                country: 'US', region: 'na',   sourceCount: 11916,   feedId: '1.AAD1' },
  { id: 205419, name: 'Marc Jacobs',             country: 'US', region: 'na',   sourceCount: 2128,    feedId: '156052.2092' },
  { id: 206852, name: 'Teva',                    country: 'US', region: 'na',   sourceCount: 3908,    feedId: '1.AAD2' },
  { id: 214564, name: 'Circus NY',               country: 'US', region: 'na',   sourceCount: 1562,    feedId: '156052.2514' },
  { id: 214878, name: 'Fenty Beauty',            country: 'US', region: 'na',   sourceCount: 770,     feedId: '1.A752' },
  { id: 225532, name: 'Shop Simon',              country: 'US', region: 'na',   sourceCount: 1534420, feedId: '1.C639' },
  { id: 227940, name: 'K-Swiss',                 country: 'US', region: 'na',   sourceCount: 2045,    feedId: '156052.26E4' },
  { id: 228012, name: 'Stuart Weitzman Outlet',  country: 'US', region: 'na',   sourceCount: 1405,    feedId: '1.BC12' },
  { id: 230436, name: 'Palladium Boots',         country: 'US', region: 'na',   sourceCount: 1468,    feedId: '156052.26E5' },
  // North America — Canada
  { id: 163464, name: 'Gap Canada',              country: 'CA', region: 'na',   sourceCount: 27684,   feedId: '156074.7021E08D28AEFD8A' },
  { id: 215755, name: 'Little Burgundy',         country: 'CA', region: 'na',   sourceCount: 12385,   feedId: '2.2F4451133E1F9950' },
  // Europe
  { id: 208234, name: 'Foot Locker UK',          country: 'GB', region: 'eu',   sourceCount: 29881,   feedId: '156178.134C9' },
  { id: 229298, name: 'Safety Brands UK',        country: 'GB', region: 'eu',   sourceCount: 157,     feedId: '156155.2416CE' },
  { id: 212455, name: 'UGG DE',                  country: 'DE', region: 'eu',   sourceCount: 2758,    feedId: '156178.BB13' },
  { id: 230089, name: 'Palladium DE',            country: 'DE', region: 'eu',   sourceCount: 5427,    feedId: '156244.20FFFC' },
  // Middle East
  { id: 233135, name: 'Adidas UAE',              country: 'AE', region: 'me',   sourceCount: 64312,   feedId: '156173.C60E' },
  // Asia Pacific
  { id: 190557, name: 'Florsheim AU',            country: 'AU', region: 'apac', sourceCount: 321,     feedId: '156124.9968' },
  { id: 215707, name: 'UGG Express AU',          country: 'AU', region: 'apac', sourceCount: 4977,    feedId: '156182.298125E4' },
]

const main = async () => {
  console.log('Seeding feeds...')
  let upserted = 0

  for (const feed of FEED_DATA) {
    await prisma.feed.upsert({
      where: { programId: feed.id },
      create: {
        programId: feed.id,
        programName: feed.name,
        country: feed.country,
        region: feed.region,
        httpsLink: feedUrl(feed.id, feed.feedId),
        totalProducts: feed.sourceCount,
        status: 'ready',
        isActive: true,
      },
      update: {
        programName: feed.name,
        country: feed.country,
        region: feed.region,
        httpsLink: feedUrl(feed.id, feed.feedId),
        totalProducts: feed.sourceCount,
      },
    })
    upserted++
  }

  console.log(`Done: ${upserted} feeds seeded.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
