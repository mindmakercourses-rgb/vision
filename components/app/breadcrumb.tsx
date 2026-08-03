"use client"

import { usePathname } from "next/navigation"

const LABELS: Record<string, string> = {
  "/app": "Dashboard",
  "/app/contacts": "Contacts",
  "/app/companies": "Companies",
  "/app/deals": "Deals",
  "/app/insights": "AI Insights",
  "/app/settings/members": "Members & roles",
}

export function Breadcrumb({ orgName }: { orgName: string }) {
  const pathname = usePathname()
  // Longest matching prefix wins so nested routes still resolve.
  const match =
    Object.keys(LABELS)
      .sort((a, b) => b.length - a.length)
      .find((key) => pathname === key || pathname.startsWith(key + "/")) ?? "/app"
  const label = LABELS[match]

  return (
    <p className="truncate text-sm text-muted-foreground">
      {orgName} <span className="text-muted-foreground/50">/ {label}</span>
    </p>
  )
}
