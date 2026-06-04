import type { Metadata } from "next";
import "./globals.css";
import Logo from "@/components/Logo";
import Nav from "@/components/Nav";
import TxSearch from "@/components/TxSearch";

export const metadata: Metadata = {
  title: "RiseScan — RISE Chain & RISEx explorer",
  description:
    "A HypurrScan-style explorer for RISE Chain & the RISEx perps DEX. Live blocks, transactions, positions and PnL — all on-chain, all public.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500;700&family=Martian+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body data-dir="terminal">
        <div className="bg-atmos" />
        <div className="shell">
          <header className="sticky-head">
            <div className="glass" style={{ borderRadius: 0, borderLeft: "none", borderRight: "none", borderTop: "none" }}>
              <div style={{ maxWidth: 1140, margin: "0 auto", padding: "12px 22px", display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
                <Logo />
                <Nav />
                <div style={{ flex: 1, minWidth: 200, maxWidth: 440, marginLeft: "auto" }}>
                  <TxSearch />
                </div>
                <a
                  href="https://www.rise.trade/invite/snatch"
                  target="_blank"
                  rel="noreferrer"
                  className="chip tag-accent"
                  style={{ padding: "9px 13px", fontSize: 12, fontWeight: 600, whiteSpace: "nowrap", flexShrink: 0 }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/risex.png" alt="" width={16} height={16} style={{ display: "block", borderRadius: 4 }} />
                  Trade on RISEx ↗
                </a>
              </div>
            </div>
          </header>

          <main style={{ maxWidth: 1140, margin: "0 auto", padding: "26px 22px 60px" }}>{children}</main>

          <footer style={{ maxWidth: 1140, margin: "0 auto", padding: "10px 22px 40px", fontSize: 11, color: "var(--muted-2)", lineHeight: 1.6 }}>
            Data from RISEx public API + RISE Chain (RPC / Blockscout). Unofficial, read-only. Not
            affiliated with RISE. PnL &amp; liquidation figures are estimates.
          </footer>
        </div>
      </body>
    </html>
  );
}
