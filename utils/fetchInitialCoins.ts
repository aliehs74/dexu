import { IDataDTO } from "@/types/dataType";

export async function fetchInitialCoins(): Promise<IDataDTO[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/coins?page=0&size=100`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    console.error('Failed to fetch page 0', res.status);
    return [];
  }

  const data = await res.json();
  return data.items || [];
}
