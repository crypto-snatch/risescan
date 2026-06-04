import type { CSSProperties, ReactNode } from "react";

type Tone = "long" | "short" | "accent" | undefined;

export function Panel({
  children,
  style,
  raise = true,
  pad,
  className = "",
  ...rest
}: {
  children: ReactNode;
  style?: CSSProperties;
  raise?: boolean;
  pad?: string | number;
  className?: string;
  [k: string]: unknown;
}) {
  return (
    <div
      {...rest}
      className={"glass glow-edge" + (raise ? " glass-raise" : "") + (className ? " " + className : "")}
      style={{ overflow: "hidden", ...(pad ? { padding: pad } : {}), ...style }}
    >
      {children}
    </div>
  );
}

export function Stat({
  label,
  value,
  hint,
  tone,
  big,
}: {
  label: string;
  value: ReactNode;
  hint?: string;
  tone?: Tone;
  big?: boolean;
}) {
  const color =
    tone === "long" ? "var(--long)" : tone === "short" ? "var(--short)" : tone === "accent" ? "var(--accent-ink)" : "var(--ink)";
  return (
    <div className="glass glow-edge" title={hint} style={{ padding: big ? "16px 18px" : "13px 15px" }}>
      <div style={{ fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--muted-2)" }}>{label}</div>
      <div className="tnum" style={{ fontSize: big ? 22 : 16, fontWeight: 700, marginTop: 6, color, letterSpacing: "-.01em" }}>{value}</div>
    </div>
  );
}

export function SectionLabel({ children, right }: { children: ReactNode; right?: ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
      <h2 style={{ margin: 0, fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--muted)", fontWeight: 500 }}>{children}</h2>
      {right}
    </div>
  );
}

export function LiveDot({ paused }: { paused?: boolean }) {
  return (
    <span className={"live-dot" + (paused ? " paused" : "")}>
      {!paused && <i className="ping" />}
      <i />
    </span>
  );
}

export function Empty({ children }: { children: ReactNode }) {
  return <div className="glass" style={{ padding: "32px 16px", textAlign: "center", color: "var(--muted)", fontSize: 13 }}>{children}</div>;
}
