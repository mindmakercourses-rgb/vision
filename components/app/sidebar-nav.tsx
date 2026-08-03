"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  Building2,
  Handshake,
  Sparkles,
  Settings,
  MessageSquare,
  Mail,
  Phone,
  Bot,
  BookOpen,
  Workflow,
  BarChart3,
  Shield,
  Server,
  CreditCard,
  Store,
  Code2,
  Inbox,
  Video,
  Brain,
  Zap,
  Target,
  ChevronDown,
  ChevronRight,
  Globe,
  TrendingUp,
  FileText,
  Clock,
  UserCheck,
  Layers,
} from "lucide-react"

type NavItem = {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  exact?: boolean
  children?: NavItem[]
}

const NAV_SECTIONS: { label: string; items: NavItem[] }[] = [
  {
    label: "Workspace",
    items: [
      { href: "/app", label: "Dashboard", icon: LayoutDashboard, exact: true },
    ],
  },
  {
    label: "CRM",
    items: [
      { href: "/app/contacts", label: "Contacts", icon: Users },
      { href: "/app/companies", label: "Companies", icon: Building2 },
      { href: "/app/leads", label: "Leads", icon: Target },
      { href: "/app/deals", label: "Deals & Pipeline", icon: Handshake },
    ],
  },
  {
    label: "Communication",
    items: [
      { href: "/app/inbox", label: "Unified Inbox", icon: Inbox },
      { href: "/app/whatsapp", label: "WhatsApp AI", icon: MessageSquare },
      { href: "/app/email", label: "Email AI", icon: Mail },
      { href: "/app/voice", label: "Voice AI", icon: Phone },
      { href: "/app/call-center", label: "Call Center", icon: UserCheck },
    ],
  },
  {
    label: "AI Platform",
    items: [
      { href: "/app/ai-agents", label: "AI Agents Studio", icon: Bot },
      { href: "/app/knowledge-base", label: "Knowledge Base", icon: BookOpen },
      { href: "/app/ai-insights", label: "AI Insights", icon: Sparkles },
      { href: "/app/ai-os", label: "AI Command Center", icon: Brain },
    ],
  },
  {
    label: "Automation",
    items: [
      { href: "/app/workflows", label: "Workflow Builder", icon: Workflow },
      { href: "/app/video-workflows", label: "Video Generator", icon: Video },
      { href: "/app/marketplace", label: "Marketplace", icon: Store },
      { href: "/app/autonomous", label: "Autonomous Mode", icon: Zap },
    ],
  },
  {
    label: "Analytics",
    items: [
      { href: "/app/analytics", label: "Analytics", icon: BarChart3 },
      { href: "/app/reports", label: "Reports", icon: FileText },
      { href: "/app/bi", label: "Business Intelligence", icon: TrendingUp },
    ],
  },
  {
    label: "Developer",
    items: [
      { href: "/app/developer", label: "Developer Platform", icon: Code2 },
    ],
  },
  {
    label: "Platform Admin",
    items: [
      { href: "/app/admin", label: "Global Admin", icon: Globe },
      { href: "/app/billing", label: "Billing & Revenue", icon: CreditCard },
      { href: "/app/security", label: "Security & Compliance", icon: Shield },
      { href: "/app/infrastructure", label: "Infrastructure", icon: Server },
    ],
  },
  {
    label: "Manage",
    items: [
      { href: "/app/settings/members", label: "Members", icon: Settings },
      { href: "/app/onboarding-wizard", label: "Setup Wizard", icon: Layers },
    ],
  },
]

export function SidebarNav() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})

  function isActive(href: string, exact?: boolean) {
    return exact ? pathname === href : pathname === href || pathname.startsWith(href + "/")
  }

  function toggleSection(label: string) {
    setCollapsed((prev) => ({ ...prev, [label]: !prev[label] }))
  }

  return (
    <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-3 py-2">
      {NAV_SECTIONS.map((section) => {
        const isCollapsed = collapsed[section.label]
        return (
          <div key={section.label} className="mb-1">
            <button
              onClick={() => toggleSection(section.label)}
              className="flex w-full items-center justify-between px-2.5 py-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
            >
              <span>{section.label}</span>
              {isCollapsed ? (
                <ChevronRight className="size-3" />
              ) : (
                <ChevronDown className="size-3" />
              )}
            </button>
            {!isCollapsed && (
              <div className="space-y-0.5">
                {section.items.map((item) => (
                  <NavLink
                    key={item.href}
                    {...item}
                    active={isActive(item.href, item.exact)}
                  />
                ))}
              </div>
            )}
          </div>
        )
      })}
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
      <span className="truncate">{label}</span>
    </Link>
  )
}
