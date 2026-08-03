"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Store, Search, Star, Download, CheckCircle2, Zap,
  Bot, MessageSquare, BarChart3, CreditCard, Globe, FileText,
  Users, Phone, Code2, Mail, Plus, Filter,
} from "lucide-react"

const APPS = [
  {
    id: "1", name: "Salesforce Sync", category: "CRM", icon: Zap, color: "bg-blue-500",
    description: "Bi-directional sync between Vision CRM and Salesforce. Keep both systems in perfect alignment.",
    rating: 4.8, installs: 1240, price: "Free", installed: true,
    tags: ["sync", "enterprise"],
  },
  {
    id: "2", name: "Zapier Integration", category: "Automation", icon: Zap, color: "bg-orange-500",
    description: "Connect Vision CRM to 5,000+ apps via Zapier triggers and actions.",
    rating: 4.9, installs: 3420, price: "Free", installed: true,
    tags: ["automation", "no-code"],
  },
  {
    id: "3", name: "HubSpot Migration", category: "CRM", icon: Globe, color: "bg-red-500",
    description: "One-click migration of all contacts, deals, and activities from HubSpot.",
    rating: 4.6, installs: 480, price: "$29/mo", installed: false,
    tags: ["migration", "data"],
  },
  {
    id: "4", name: "Stripe Revenue Sync", category: "Billing", icon: CreditCard, color: "bg-purple-500",
    description: "Automatically sync payment events and revenue data from Stripe to your CRM.",
    rating: 4.9, installs: 2100, price: "Free", installed: true,
    tags: ["payments", "finance"],
  },
  {
    id: "5", name: "Google Analytics Bridge", category: "Analytics", icon: BarChart3, color: "bg-yellow-500",
    description: "Connect web analytics with CRM contacts to see full customer journey.",
    rating: 4.5, installs: 890, price: "Free", installed: false,
    tags: ["analytics", "marketing"],
  },
  {
    id: "6", name: "DocuSign eSignatures", category: "Documents", icon: FileText, color: "bg-blue-600",
    description: "Send contracts and agreements for e-signature directly from your CRM deals.",
    rating: 4.8, installs: 1580, price: "$19/mo", installed: false,
    tags: ["documents", "legal"],
  },
  {
    id: "7", name: "Twilio SMS & Voice", category: "Communication", icon: Phone, color: "bg-red-600",
    description: "Add SMS messaging and additional voice channels powered by Twilio.",
    rating: 4.7, installs: 720, price: "Usage-based", installed: false,
    tags: ["sms", "voice"],
  },
  {
    id: "8", name: "Slack Notifications", category: "Productivity", icon: MessageSquare, color: "bg-purple-600",
    description: "Get real-time deal alerts, AI insights, and lead notifications in Slack.",
    rating: 4.9, installs: 4200, price: "Free", installed: true,
    tags: ["notifications", "team"],
  },
  {
    id: "9", name: "GPT-4o Custom Prompts", category: "AI", icon: Bot, color: "bg-green-500",
    description: "Extend AI agents with custom GPT-4o prompts, personas, and response templates.",
    rating: 4.7, installs: 960, price: "$9/mo", installed: false,
    tags: ["ai", "customization"],
  },
  {
    id: "10", name: "LinkedIn Enrichment", category: "Data", icon: Users, color: "bg-blue-700",
    description: "Auto-enrich contact profiles with LinkedIn data, job titles, and company info.",
    rating: 4.6, installs: 1840, price: "$49/mo", installed: false,
    tags: ["enrichment", "data"],
  },
  {
    id: "11", name: "Notion CRM Notes", category: "Productivity", icon: FileText, color: "bg-slate-600",
    description: "Sync CRM notes and contact activity with Notion databases.",
    rating: 4.4, installs: 340, price: "Free", installed: false,
    tags: ["notes", "knowledge"],
  },
  {
    id: "12", name: "Custom API Builder", category: "Developer", icon: Code2, color: "bg-gray-700",
    description: "Build custom API integrations with a visual no-code connector builder.",
    rating: 4.5, installs: 210, price: "$29/mo", installed: false,
    tags: ["api", "developer"],
  },
]

const CATEGORIES = ["All", "CRM", "Automation", "Analytics", "Communication", "Billing", "AI", "Documents", "Productivity", "Data", "Developer"]

export default function MarketplacePage() {
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")

  const filtered = APPS.filter((a) => {
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase()) || a.description.toLowerCase().includes(search.toLowerCase())
    const matchCat = activeCategory === "All" || a.category === activeCategory
    return matchSearch && matchCat
  })

  const installed = APPS.filter((a) => a.installed).length

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">App Marketplace</h1>
          <p className="mt-1 text-sm text-muted-foreground">Extend Vision CRM with integrations, AI tools, and automation apps.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Code2 className="size-4" />Submit App</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: "Installed Apps", value: installed, icon: CheckCircle2 },
          { label: "Available Apps", value: APPS.length, icon: Store },
          { label: "Categories", value: CATEGORIES.length - 1, icon: Filter },
          { label: "Automations Active", value: 47, icon: Zap },
        ].map((s) => (
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

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-border bg-card px-3">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <Input placeholder="Search apps and integrations..." value={search} onChange={(e) => setSearch(e.target.value)} className="border-0 bg-transparent px-0 focus-visible:ring-0" />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${activeCategory === cat ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((app) => (
          <Card key={app.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`flex size-11 items-center justify-center rounded-xl ${app.color}`}>
                    <app.icon className="size-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{app.name}</p>
                    <Badge variant="outline" className="text-xs mt-0.5">{app.category}</Badge>
                  </div>
                </div>
                {app.installed && (
                  <Badge className="bg-green-100 text-green-700 text-xs shrink-0">
                    <CheckCircle2 className="size-3 mr-1" />Installed
                  </Badge>
                )}
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed">{app.description}</p>

              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Star className="size-3.5 text-yellow-500" />
                  <span className="font-medium">{app.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Download className="size-3.5" />
                  {app.installs.toLocaleString()} installs
                </div>
                <div className="ml-auto font-semibold text-foreground">{app.price}</div>
              </div>

              <div className="flex gap-2">
                {app.installed ? (
                  <>
                    <Button variant="outline" size="sm" className="flex-1 text-xs">Configure</Button>
                    <Button variant="ghost" size="sm" className="text-xs text-red-500 hover:text-red-600">Uninstall</Button>
                  </>
                ) : (
                  <Button size="sm" className="flex-1 text-xs">
                    <Plus className="size-3.5" />Install
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
