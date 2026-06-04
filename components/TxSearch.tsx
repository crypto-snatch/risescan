"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

// a known real wallet (top OI at index time) for the "try a wallet" shortcut
const SAMPLE_WALLET = "0x7c6bf9003ae3ba366883f63a28c4f3fd6a5958a0";

export default function TxSearch({ big }: { big?: boolean }) {
  const router = useRouter();
  const [v, setV] = useState("");
  const q = v.trim();
  const isTx = /^0x[0-9a-fA-F]{64}$/.test(q);
  const isAddr = /^0x[0-9a-fA-F]{40}$/.test(q);
  const valid = isTx || isAddr;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (isTx) router.push(`/tx/${q}`);
    else if (isAddr) router.push(`/address/${q}`);
  }

  return (
    <form onSubmit={submit} data-component="tx-search" style={{ position: "relative", width: "100%" }}>
      <input
        value={v}
        onChange={(e) => setV(e.target.value)}
        spellCheck={false}
        placeholder={big ? "Search any tx hash or wallet address  ·  0x…" : "Search tx / address 0x…"}
        className="field"
        style={big ? { padding: "16px 130px 16px 20px", fontSize: 14, borderRadius: "var(--r-pill)" } : { padding: "11px 92px 11px 16px", fontSize: 12.5 }}
      />
      <div style={{ position: "absolute", right: 6, top: "50%", transform: "translateY(-50%)", display: "flex", gap: 6 }}>
        {!q && big && (
          <button type="button" onClick={() => setV(SAMPLE_WALLET)} className="chip" style={{ cursor: "pointer" }}>
            try a wallet ↺
          </button>
        )}
        <button type="submit" disabled={!valid} className="chip tag-accent" style={{ opacity: valid ? 1 : 0.32, fontWeight: 600, padding: big ? "8px 14px" : "5px 10px" }}>
          {isTx ? "tx ↵" : isAddr ? "open ↵" : "search ↵"}
        </button>
      </div>
    </form>
  );
}
