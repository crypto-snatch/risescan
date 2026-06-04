import HomeHero from "@/components/HomeHero";
import ChainStream from "@/components/ChainStream";
import { getMarkets } from "@/lib/risex";

export const revalidate = 30;

export default async function Home() {
  const markets = await getMarkets().catch(() => []);
  const marketsCount = markets.filter((m) => m.available && !/deprecated/i.test(m.config?.name ?? "")).length;

  return (
    <div className="screen" data-page="home" style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <HomeHero marketsCount={marketsCount} />
      <ChainStream />
    </div>
  );
}
