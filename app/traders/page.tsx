import { getLeaderboard, type TraderRow } from "@/lib/account";
import { getSnapshot, type SnapshotRow } from "@/lib/snapshot";
import { usd } from "@/lib/format";
import TopWallets, { type TopRow } from "@/components/TopWallets";
import { SectionLabel } from "@/components/ui";

export const revalidate = 20;
export const metadata = { title: "TOP Traders — RiseScan" };

export default async function TradersPage() {
  const snapshot = await getSnapshot();

  let byVolume: TopRow[];
  let byUpnl: TopRow[];
  let byOI: TopRow[];
  let coverage: string;

  if (snapshot) {
    const sub = (r: SnapshotRow) =>
      r.top ? `${r.top.side === "long" ? "LONG" : "SHORT"} ${r.top.symbol} ${r.top.lev.toFixed(0)}×` : `${r.positionCount} positions`;
    byVolume = snapshot.byVolume.slice(0, 6).map((r) => ({ account: r.account, value: usd(r.volume), sub: sub(r) }));
    byUpnl = snapshot.byUpnl.slice(0, 6).map((r) => ({ account: r.account, value: usd(r.uPnl, { sign: true }), sub: sub(r), tone: r.uPnl >= 0 ? "long" : "short" }));
    byOI = snapshot.byOI.slice(0, 6).map((r) => ({ account: r.account, value: usd(r.oi), sub: sub(r) }));
    coverage = `Ranked across all ${snapshot.totalAccounts.toLocaleString()} accounts (${snapshot.accountsWithPositions.toLocaleString()} with open positions) · indexed ${new Date(snapshot.generatedAt).toLocaleString("en-GB", { hour12: false, timeZone: "UTC" })} UTC. Volume = trailing-24h turnover, OI = current open notional.`;
  } else {
    const board = await getLeaderboard(36);
    const sub = (r: TraderRow) =>
      r.top ? `${r.top.side === "long" ? "LONG" : "SHORT"} ${r.top.symbol} ${r.top.leverage.toFixed(0)}×` : `${r.positionCount} positions`;
    byVolume = [...board].filter((r) => r.volume > 0).sort((a, b) => b.volume - a.volume).slice(0, 6).map((r) => ({ account: r.account, value: usd(r.volume), sub: sub(r) }));
    byUpnl = [...board].filter((r) => r.positionCount > 0).sort((a, b) => b.uPnl - a.uPnl).slice(0, 6).map((r) => ({ account: r.account, value: usd(r.uPnl, { sign: true }), sub: sub(r), tone: r.uPnl >= 0 ? "long" : "short" }));
    byOI = [...board].filter((r) => r.notional > 0).sort((a, b) => b.notional - a.notional).slice(0, 6).map((r) => ({ account: r.account, value: usd(r.notional), sub: sub(r) }));
    coverage = "Live sample of recently-active wallets — run `npm run index` for full-universe ranking.";
  }

  return (
    <div className="screen" data-page="traders" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <SectionLabel>Top active traders</SectionLabel>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14 }}>
        <TopWallets title="24h volume" metric="24h turnover" rows={byVolume} />
        <TopWallets title="Unrealized PnL" metric="uPnL" rows={byUpnl} />
        <TopWallets title="Open interest" metric="OI" rows={byOI} />
      </div>
      <p style={{ fontSize: 11, color: "var(--muted-2)", marginTop: 2, lineHeight: 1.5, maxWidth: 760 }}>{coverage}</p>
    </div>
  );
}
