"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Store,
  Search,
  Download,
  Star,
  CheckCircle2,
  Bot,
  FileText,
  Zap,
  BarChart3,
  Users,
  Building2,
  Stethoscope,
  GraduationCap,
  ShoppingBag,
  Utensils,
  Hotel,
  Home,
  Truck,
  Scale,
  Heart,
  Dumbbell,
  Briefcase,
  ArrowRight,
} from "lucide-react"

const INDUSTRIES = [
  { id: "healthcare", name: "Healthcare", icon: Stethoscope, color: "bg-red-500", packages: 3, installs: 847 },
  { id: "education", name: "Education", icon: GraduationCap, color: "bg-blue-500", packages: 2, installs: 634 },
  { id: "retail", name: "Retail & E-Commerce", icon: ShoppingBag, color: "bg-orange-500", packages: 4, installs: 1204 },
  { id: "restaurant", name: "Restaurants & F&B", icon: Utensils, color: "bg-yellow-500", packages: 2, installs: 521 },
  { id: "hotel", name: "Hospitality & Hotels", icon: Hotel, color: "bg-teal-500", packages: 2, installs: 389 },
  { id: "realestate", name: "Real Estate", icon: Home, color: "bg-green-500", packages: 3, installs: 762 },
  { id: "logistics", name: "Logistics & Shipping", icon: Truck, color: "bg-indigo-500", packages: 2, installs: 418 },
  { id: "legal", name: "Legal & Consulting", icon: Scale, color: "bg-purple-500", packages: 2, installs: 293 },
  { id: "hr", name: "HR & Recruitment", icon: Users, color: "bg-pink-500", packages: 2, installs: 376 },
  { id: "fitness", name: "Fitness & Wellness", icon: Dumbbell, color: "bg-emerald-500", packages: 1, installs: 214 },
  { id: "beauty", name: "Beauty Clinics", icon: Heart, color: "bg-rose-500", packages: 1, installs: 187 },
  { id: "corporate", name: "Corporate & Enterprise", icon: Building2, color: "bg-slate-500", packages: 3, installs: 942 },
]

const FEATURED_PACKAGES = [
  {
    id: "hc-pro",
    name: "Healthcare Pro Pack",
    industry: "Healthcare",
    icon: Stethoscope,
    color: "bg-red-500",
    rating: 4.9,
    installs: 847,
    version: "2.1.0",
    price: "Free",
    includes: ["Patient CRM Pipeline", "Appointment Workflows", "Medical AI Agent", "HIPAA-ready Templates", "Lab Report Dashboard", "Patient Communication Hub"],
    badges: ["Featured", "HIPAA Ready"],
  },
  {
    id: "re-pro",
    name: "Real Estate Suite",
    industry: "Real Estate",
    icon: Home,
    color: "bg-green-500",
    rating: 4.8,
    installs: 762,
    version: "1.4.2",
    price: "Free",
    includes: ["Property Pipeline", "Buyer/Seller Workflows", "Real Estate AI Agent", "Contract Templates", "Property Dashboard", "Client Follow-up Automation"],
    badges: ["Top Rated"],
  },
  {
    id: "ret-pro",
    name: "Retail Omnichannel Pack",
    industry: "Retail",
    icon: ShoppingBag,
    color: "bg-orange-500",
    rating: 4.7,
    installs: 1204,
    version: "3.0.1",
    price: "Free",
    includes: ["Customer 360 CRM", "Order Management Workflows", "WhatsApp Commerce AI", "POS Integration Templates", "Sales Analytics", "Loyalty Program Automation"],
    badges: ["Most Installed"],
  },
  {
    id: "corp-pro",
    name: "Corporate Enterprise Pack",
    industry: "Corporate",
    icon: Briefcase,
    color: "bg-slate-500",
    rating: 4.9,
    installs: 942,
    version: "2.3.0",
    price: "Free",
    includes: ["Enterprise CRM Setup", "Approval Workflows", "Executive AI Agent", "Board Report Templates", "KPI Dashboard", "Compliance Automation"],
    badges: ["Enterprise", "Featured"],
  },
]

export default function IndustryMarketplacePage() {
  const [search, setSearch] = useState("")
  const [activeIndustry, setActiveIndustry] = useState<string | null>(null)
  const [installedPackages, setInstalledPackages] = useState<Set<string>>(new Set(["corp-pro"]))

  const filteredPackages = FEATURED_PACKAGES.filter((p) =>
    (!activeIndustry || p.industry.toLowerCase().includes(activeIndustry)) &&
    (p.name.toLowerCase().includes(search.toLowerCase()) || p.industry.toLowerCase().includes(search.toLowerCase()))
  )

  function handleInstall(id: string) {
    setInstalledPackages((prev) => new Set([...prev, id]))
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Industry Solutions Marketplace</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Install complete industry-specific business solutions in one click — pipelines, workflows, AI agents, dashboards, and templates included.
          </p>
        </div>
        <Badge className="bg-primary/10 text-primary border-0 gap-1.5 text-sm px-3 py-1.5">
          <Store className="size-4" />
          {INDUSTRIES.reduce((s, i) => s + i.packages, 0)} Solution Packages Available
        </Badge>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: "Industries Covered", value: INDUSTRIES.length },
          { label: "Total Packages", value: INDUSTRIES.reduce((s, i) => s + i.packages, 0) },
          { label: "Total Installs", value: "8,400+" },
          { label: "Installed in Workspace", value: installedPackages.size },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="mt-1 text-2xl font-semibold">{s.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search */}
      <div className="flex items-center gap-3">
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-border bg-card px-3">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <Input placeholder="Search industry solutions..." value={search} onChange={(e) => setSearch(e.target.value)} className="border-0 bg-transparent px-0 focus-visible:ring-0" />
        </div>
      </div>

      {/* Industry grid */}
      <div>
        <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">Browse by Industry</h2>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {INDUSTRIES.map((ind) => (
            <button
              key={ind.id}
              onClick={() => setActiveIndustry(activeIndustry === ind.id ? null : ind.id)}
              className={`flex flex-col items-center gap-2 rounded-xl border p-3 text-center transition-colors ${activeIndustry === ind.id ? "border-primary bg-primary/5" : "border-border hover:bg-muted/40"}`}
            >
              <div className={`flex size-10 items-center justify-center rounded-lg ${ind.color}`}>
                <ind.icon className="size-5 text-white" />
              </div>
              <span className="text-[11px] font-medium leading-tight">{ind.name}</span>
              <span className="text-[10px] text-muted-foreground">{ind.packages} packs</span>
            </button>
          ))}
        </div>
      </div>

      {/* Featured packages */}
      <div>
        <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
          {activeIndustry ? `${INDUSTRIES.find(i => i.id === activeIndustry)?.name} Packages` : "Featured Solution Packages"}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {filteredPackages.map((pkg) => (
            <Card key={pkg.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-5 space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`flex size-12 items-center justify-center rounded-xl ${pkg.color}`}>
                      <pkg.icon className="size-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">{pkg.name}</p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <Star className="size-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-medium">{pkg.rating}</span>
                        <span className="text-xs text-muted-foreground">({pkg.installs.toLocaleString()} installs)</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    {pkg.badges.map((b) => (
                      <Badge key={b} className="text-[10px] bg-primary/10 text-primary border-0">{b}</Badge>
                    ))}
                  </div>
                </div>

                {/* Includes */}
                <div className="grid grid-cols-2 gap-1.5">
                  {pkg.includes.map((item) => (
                    <div key={item} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <CheckCircle2 className="size-3 shrink-0 text-green-500" />
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>

                {/* What's included icons */}
                <div className="flex items-center gap-2 text-xs text-muted-foreground border-t border-border pt-3">
                  <Bot className="size-3.5" /><span>AI Agent</span>
                  <span className="text-border">·</span>
                  <Zap className="size-3.5" /><span>Workflows</span>
                  <span className="text-border">·</span>
                  <BarChart3 className="size-3.5" /><span>Dashboards</span>
                  <span className="text-border">·</span>
                  <FileText className="size-3.5" /><span>Templates</span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="text-xs text-muted-foreground">v{pkg.version} · {pkg.price}</div>
                  {installedPackages.has(pkg.id) ? (
                    <Button size="sm" variant="outline" disabled className="gap-1.5">
                      <CheckCircle2 className="size-4 text-green-500" />Installed
                    </Button>
                  ) : (
                    <Button size="sm" className="gap-1.5" onClick={() => handleInstall(pkg.id)}>
                      <Download className="size-4" />Install
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
