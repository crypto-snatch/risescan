# RiseScan

A [HypurrScan](https://hypurrscan.io)-style explorer for the **RISEx** perpetuals DEX (on RISE Chain).
Paste any wallet address and see its **live positions, fills, PnL, open orders and on-chain
transactions** — everything on RISEx is on-chain and public.

> Unofficial, read-only. Not affiliated with RISE.

## What it does

- **Wallet scan** (`/address/0x…`) — open positions with live mark-price PnL, leverage,
  approximate liquidation price; full fill history (maker/taker, liquidations, realized PnL,
  tx links); open orders; recent raw transactions.
- **Home** — all RISEx markets with live marks, an "active traders" whale board discovered
  on-chain, and a live trades ticker.

## Data sources (all public, no keys)

- **RISEx public API** (`api.rise.trade`) — `InfoClient` read endpoints expose
  `positions`, `trade-history`, `cross-margin-balance`, `orders/open` etc. keyed by
  `?account=<addr>`. Called **server-side** (the API blocks browser CORS).
- **RISE Chain Blockscout** (`explorer.risechain.com`) — used to discover active wallets
  (depositors to `CollateralManager`, traders on `PerpsManager`) and to list raw txns.

Key facts are documented in [`lib/constants.ts`](lib/constants.ts).

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (what Vercel runs)
```

## Deploy (Vercel)

No env vars required. Push to a Git repo and import in Vercel, or:

```bash
npm i -g vercel
vercel            # preview
vercel --prod     # production
```

All upstream calls run in serverless functions / server components, so CORS and rate limits
are handled server-side. Responses are cached briefly (`next.revalidate`) to stay under the
RISEx rate limit.

## Notes / limitations

- PnL and liquidation prices are **estimates** (mark = orderbook mid; liq uses
  maintenance-margin factor). Treat as indicative.
- The whale board only covers wallets discovered from recent on-chain activity — it is not
  an exhaustive leaderboard. Searching any address directly always works.
