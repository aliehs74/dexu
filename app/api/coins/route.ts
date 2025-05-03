import { faker } from '@faker-js/faker';
import { NextResponse } from 'next/server';
import { EApiConfig } from '@/types/dataEnum';

const generateCoin = (i: number) => ({
  cryptocurrency: `Coin ${i}`,
  perf_24h: faker.number.float({ min: -20, max: 20, fractionDigits: 3 }),
  perf_7d: faker.number.float({ min: -40, max: 40, fractionDigits: 3 }),
  perf_30d: faker.number.float({ min: -60, max: 60, fractionDigits: 3 }),
  perf_90d: faker.number.float({ min: -80, max: 80, fractionDigits: 3 }),
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get('page') || '0');
  const size = parseInt(searchParams.get('size') || EApiConfig.PAGE_SIZE.toString());
  const start = page * size;

  const items = Array.from({ length: size }, (_, i) => generateCoin(start + i));

  return NextResponse.json({
    items,
    TOTAL: EApiConfig.TOTAL,
    page,
    size,
    pages: Math.ceil(EApiConfig.TOTAL / size),
    links: {
      first: '/api/coins?page=0',
      last: `/api/coins?page=${Math.ceil(EApiConfig.TOTAL / size) - 1}`,
      self: `/api/coins?page=${page}`,
      next: page < EApiConfig.TOTAL / size - 1 ? `/api/coins?page=${page + 1}` : null,
      prev: page > 0 ? `/api/coins?page=${page - 1}` : null,
    },
  });
}
