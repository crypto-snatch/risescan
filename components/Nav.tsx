"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs: [string, string][] = [
  ["/", "Home"],
  ["/market", "Market"],
  ["/traders", "TOP Traders"],
  ["/account", "Account Explorer"],
];

export default function Nav() {
  const path = usePathname();
  const isActive = (href: string) => (href === "/" ? path === "/" : path.startsWith(href));
  return (
    <nav data-component="nav" style={{ display: "flex", gap: 4 }}>
      {tabs.map(([href, label]) => (
        <Link key={href} href={href} className="pill" data-active={isActive(href)}>
          {label}
        </Link>
      ))}
    </nav>
  );
}
