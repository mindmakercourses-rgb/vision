"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Users, Building2, Handshake, Settings, Sparkles } from "lucide-react"

const NAV = [
  { href: "/app", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/app/contacts", label: "Contacts", icon: Users },
  { href: "/app/companies", label: "Companies", icon: Building2 },
  { href: "/app/deals", label: "Deals", icon: Handshake },
  { href: "/app/insights", label: "AI Insights", icon: Sparkles },
]

export function SidebarNav() {
  const pathname = usePathname()

  function isActive(href: string, exact?: boolean) {
    return exact ? pathname === href : pathname === href || pathname.startsWith(href + "/")
  }

  return (
    <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
      <p className="px-2.5 pb-1 text-xs font-medium text-muted-foreground">Workspace</p>
      {NAV.map((item) => (
        <NavLink key={item.href} {...item} active={isActive(item.href, item.exact)} />
      ))}

      <p className="mt-4 px-2.5 pb-1 text-xs font-medium text-muted-foreground">Manage</p>
      <NavLink
        href="/app/settings/members"
        label="Members"
        icon={Settings}
        active={isActive("/app/settings")}
      />
    </nav>
  )
}

function NavLink({
  href,
  label,
  icon: Icon,
  active,
}: {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  active: boolean
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm font-medium transition-colors",
        active
          ? "bg-sidebar-accent text-sidebar-accent-foreground"
          : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
      )}
    >
      <Icon className="size-4 shrink-0" />
      {label}
    </Link>
  )
}
