import { getMarkets, symbolOf, change24hPct, type Market } from "@/lib/risex";
import { num } from "@/lib/format";
import MarketTabs, { type MItem } from "@/components/MarketTabs";
import { SectionLabel } from "@/components/ui";

export const revalidate = 15;
export const metadata = { title: "Market — RiseScan" };

export default async function MarketPage() {
  const allMarkets = (await getMarkets()).filter((m: Market) => !/deprecated/i.test(m.config?.name ?? ""));

  // markets that are live on-chain but should be presented as upcoming
  const FORCE_UPCOMING = new Set(["ONDO", "VVV", "LIT"]);

  const listed: MItem[] = [];
  const upcoming: MItem[] = [];
  for (const m of allMarkets) {
    const symbol = symbolOf(m);
    const mark = num(m.mark_price) || num(m.last_price);
    const item: MItem = { symbol, mark, maxLev: num(m.config.max_leverage), changePct: change24hPct(m) };
    (mark > 0 && !FORCE_UPCOMING.has(symbol) ? listed : upcoming).push(item);
  }

  return (
    <div className="screen" data-page="market" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <SectionLabel right={<span className="chip">Mark price · 24h change</span>}>Markets</SectionLabel>
      <MarketTabs data={{ listed, upcoming }} />
    </div>
  );
}
