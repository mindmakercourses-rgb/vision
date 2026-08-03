"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Building2,
  Plus,
  Search,
  Globe,
  Users,
  DollarSign,
  MapPin,
  Phone,
  Mail,
  MoreHorizontal,
  TrendingUp,
  Briefcase,
} from "lucide-react"

const MOCK_COMPANIES = [
  { id: "1", name: "TechCorp Egypt", industry: "Technology", size: "201-500", location: "Cairo, Egypt", website: "techcorp.eg", phone: "+20 2 1234 5678", email: "info@techcorp.eg", contacts: 12, deals: 3, revenue: 450000, status: "customer" },
  { id: "2", name: "Gulf Trading LLC", industry: "Trading", size: "51-200", location: "Dubai, UAE", website: "gulftrade.ae", phone: "+971 4 123 4567", email: "info@gulftrade.ae", contacts: 7, deals: 1, revenue: 120000, status: "prospect" },
  { id: "3", name: "Smart Buildings Co", industry: "Construction", size: "501-1000", location: "Riyadh, KSA", website: "smart.sa", phone: "+966 11 111 2222", email: "contact@smart.sa", contacts: 18, deals: 2, revenue: 750000, status: "customer" },
  { id: "4", name: "Digital Solutions", industry: "IT Services", size: "11-50", location: "Alexandria, Egypt", website: "digital.co", phone: "+20 3 987 6543", email: "hello@digital.co", contacts: 4, deals: 1, revenue: 62000, status: "lead" },
  { id: "5", name: "Nile Logistics", industry: "Logistics", size: "201-500", location: "Cairo, Egypt", website: "nilelogix.com", phone: "+20 2 555 7788", email: "ops@nilelogix.com", contacts: 9, deals: 2, revenue: 275000, status: "customer" },
  { id: "6", name: "Riyadh Retail", industry: "Retail", size: "51-200", location: "Riyadh, KSA", website: "retail.sa", phone: "+966 55 111 2233", email: "retail@retail.sa", contacts: 5, deals: 1, revenue: 35000, status: "prospect" },
]

const STATUS_COLORS: Record<string, string> = {
  customer: "bg-green-100 text-green-700",
  prospect: "bg-blue-100 text-blue-700",
  lead: "bg-yellow-100 text-yellow-700",
  inactive: "bg-gray-100 text-gray-600",
}

export default function CompaniesPage() {
  const [search, setSearch] = useState("")

  const filtered = MOCK_COMPANIES.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.industry.toLowerCase().includes(search.toLowerCase())
  )

  const stats = [
    { label: "Total Companies", value: MOCK_COMPANIES.length, icon: Building2 },
    { label: "Total Contacts", value: MOCK_COMPANIES.reduce((s, c) => s + c.contacts, 0), icon: Users },
    { label: "Pipeline Value", value: "$" + (MOCK_COMPANIES.reduce((s, c) => s + c.revenue, 0) / 1000).toFixed(0) + "K", icon: DollarSign },
    { label: "Industries", value: new Set(MOCK_COMPANIES.map((c) => c.industry)).size, icon: Briefcase },
  ]

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Companies</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage your business accounts and organizations.</p>
        </div>
        <Button><Plus className="size-4" />New Company</Button>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="mt-1 text-2xl font-semibold">{s.value}</p>
              </div>
              <s.icon className="size-5 text-muted-foreground" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-border bg-card px-3">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <Input placeholder="Search companies..." value={search} onChange={(e) => setSearch(e.target.value)} className="border-0 bg-transparent px-0 focus-visible:ring-0" />
        </div>
        <Button variant="outline" size="sm"><TrendingUp className="size-4" />Filter</Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((company) => (
          <Card key={company.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-4 space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold text-lg">
                    {company.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold">{company.name}</p>
                    <p className="text-xs text-muted-foreground">{company.industry}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Badge className={STATUS_COLORS[company.status]}>{company.status}</Badge>
                  <button className="rounded p-1 hover:bg-muted"><MoreHorizontal className="size-4 text-muted-foreground" /></button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 rounded-lg bg-muted/40 p-3">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Contacts</p>
                  <p className="font-semibold">{company.contacts}</p>
                </div>
                <div className="text-center border-x border-border">
                  <p className="text-xs text-muted-foreground">Deals</p>
                  <p className="font-semibold">{company.deals}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Value</p>
                  <p className="font-semibold">${(company.revenue / 1000).toFixed(0)}K</p>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-muted-foreground">
                <div className="flex items-center gap-2"><MapPin className="size-3.5 shrink-0" /><span className="truncate">{company.location}</span></div>
                <div className="flex items-center gap-2"><Users className="size-3.5 shrink-0" /><span>{company.size} employees</span></div>
                <div className="flex items-center gap-2"><Globe className="size-3.5 shrink-0" /><span className="truncate">{company.website}</span></div>
              </div>

              <div className="flex gap-2 pt-1">
                <button className="flex flex-1 items-center justify-center gap-1.5 rounded-md border border-border py-1.5 text-xs font-medium hover:bg-muted transition-colors">
                  <Phone className="size-3.5" />Call
                </button>
                <button className="flex flex-1 items-center justify-center gap-1.5 rounded-md border border-border py-1.5 text-xs font-medium hover:bg-muted transition-colors">
                  <Mail className="size-3.5" />Email
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
