# RiseScan — Design Handoff

A HypurrScan-style explorer for **RISE Chain + RISEx perps**. The skeleton is
functionally complete and wired to live data. **This pass is visual design only.**

## Ground rules for the design pass

- ✅ Restyle freely: markup, Tailwind classes, layout, spacing, fonts, colors,
  motion, empty/loading states, responsive behavior.
- ⛔ Do **not** change anything in `lib/` or `app/api/` (data fetching, formatting,
  labels, the indexer). Logic lives there.
- ⛔ Do **not** change component **props** or the data fields they read, or the
  page data flow — markup/classes only. If a component receives `rows: TopRow[]`,
  keep consuming `row.account` / `row.value`, just restyle the container.
- Every major block has a `data-component` / `data-page` / `data-table` attribute
  for easy targeting.

## Design direction

- **Brand**: RISE green. Mascot is a detective corgi (`public/rise.png`) — magnifier =
  "scan". Wordmark is stylized **`RISEeeeee scan`** (the repeated `e` run is intentional;
  make it feel fast/animated). See `components/Logo.tsx`.
- Vibe: a fast, alive on-chain explorer. The home stream should feel like a torrent
  of millisecond-fresh transactions.
- Tokens live in `tailwind.config.ts` (`bg, panel, panel2, border, accent, long,
  short, muted`) and `app/globals.css` (the `flashin` row animation). Extend these.

## Pages

| Route | File | What it is |
|---|---|---|
| `/` | `app/page.tsx` | Hero (logo + search) → chain **stats strip** → **live shred stream** (real-time tx/blocks, ms-precision) |
| `/account` | `app/account/page.tsx` | Account Tracker — one prominent address input → routes to `/address/[addr]` |
| `/address/[addr]` | `app/address/[addr]/page.tsx` | Wallet view: value/notional/uPnL cards, open **positions**, tabs: Fills / Transactions / Open orders. Live-refreshing. |
| `/traders` | `app/traders/page.tsx` | Markets (Listed / Upcoming tabs) + top-5 wallet boards (Volume / uPnL / OI) |
| `/tx/[hash]` | `app/tx/[hash]/page.tsx` | Single transaction detail |

## Components (all in `components/`, all restyleable)

- `Logo.tsx` — `RISEeeeee scan` wordmark + mascot. **High-impact target.**
- `ChainStream.tsx` — the home centerpiece. Real-time RISE **shred** WebSocket feed
  (~2ms cadence). Tabs Transactions/Blocks; `Age` column shows real ms; status dot;
  per-row flash on arrival. Make the "rain" feel great.
- `StatsStrip.tsx` — TPS, gas, block time, total txns, height, accounts, network load,
  TVL, trading fee, markets.
- `TopWallets.tsx` — a ranked top-5 list (used 3× on /traders).
- `MarketTabs.tsx` — Listed vs Upcoming market grid.
- `AddressView.tsx` — the wallet dashboard (positions table + Fills/Txns/Orders tabs).
- `TxSearch.tsx` — header search (tx hash or wallet address).
- `AccountInput.tsx` — the big centered address box on /account.
- `Nav.tsx` — top tabs (Home / Account Tracker / Traders).

## Notes / honesty for copy

- The shred stream is genuinely real-time (RISE Shred API, ms-level). Status dot:
  `connecting` / `live` / `down`.
- Traders ranking is a snapshot over **all enumerated accounts** (see footnote text
  the page renders) — refreshed by the indexer (`npm run index`), not per-request.
- Numbers like PnL / liquidation are estimates (already disclaimed in the footer).

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
# note: on a network that does TLS inspection, dev needs
# NODE_TLS_REJECT_UNAUTHORIZED=0 (local only; not used in prod)
```
