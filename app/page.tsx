import ChartProvider from "@/components/ChartProvider";
import RangeController from "@/components/RangeController";
import { fetchInitialCoins } from "@/utils/fetchInitialCoins";
import MetricDropdown from "@/components/MetricDropdown";


export default async function HomePage() {
  const initialCoins = await fetchInitialCoins(); 

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Crypto Performance Chart</h1>
      <div className="flex gap-20">
        <MetricDropdown />
        <RangeController />
      </div>
      <ChartProvider initialData={initialCoins} />
    </main>
  );
}
