"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Palette,
  Globe,
  Upload,
  Eye,
  Save,
  Bot,
  Mail,
  Shield,
  Smartphone,
  Building2,
  CheckCircle2,
  Store,
  Type,
  Layers,
} from "lucide-react"

const BRANDS = [
  { id: "1", name: "Vision CRM (Default)", domain: "app.vision-crm.com", status: "live", primary: "#0066ff", clients: 0, type: "platform" },
  { id: "2", name: "TechCorp Portal", domain: "crm.techcorp.eg", status: "live", primary: "#1a73e8", clients: 1, type: "client" },
  { id: "3", name: "Gulf Consult CRM", domain: "crm.gulfconsult.ae", status: "draft", primary: "#00897b", clients: 1, type: "partner" },
]

const THEME_PRESETS = [
  { name: "Ocean Blue", primary: "#0066ff", secondary: "#e8f0ff" },
  { name: "Forest Green", primary: "#00897b", secondary: "#e0f2f1" },
  { name: "Midnight", primary: "#1a1f2e", secondary: "#2d3748" },
  { name: "Rose Gold", primary: "#e91e63", secondary: "#fce4ec" },
  { name: "Amber", primary: "#f59e0b", secondary: "#fef3c7" },
  { name: "Slate", primary: "#475569", secondary: "#f1f5f9" },
]

export default function WhiteLabelPage() {
  const [activeBrand, setActiveBrand] = useState("1")
  const [primaryColor, setPrimaryColor] = useState("#0066ff")
  const [platformName, setPlatformName] = useState("Vision CRM")
  const [aiName, setAiName] = useState("Sara AI")
  const [activeTab, setActiveTab] = useState<"branding" | "domains" | "ai" | "partners">("branding")
  const [showPreview, setShowPreview] = useState(false)

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">White Label Builder</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Fully rebrand Vision CRM for agencies, partners, and enterprise clients.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowPreview(!showPreview)}><Eye className="size-4" />Live Preview</Button>
          <Button><Save className="size-4" />Publish Brand</Button>
        </div>
      </div>

      {/* Brand selector */}
      <div className="flex flex-wrap gap-3">
        {BRANDS.map((b) => (
          <button
            key={b.id}
            onClick={() => setActiveBrand(b.id)}
            className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors ${activeBrand === b.id ? "border-primary bg-primary/5" : "border-border hover:bg-muted/40"}`}
          >
            <div className="size-8 rounded-lg border border-border" style={{ backgroundColor: b.primary }} />
            <div>
              <p className="text-sm font-semibold">{b.name}</p>
              <p className="text-xs text-muted-foreground">{b.domain}</p>
            </div>
            <Badge className={b.status === "live" ? "bg-green-100 text-green-700 border-0 ml-2" : "bg-yellow-100 text-yellow-700 border-0 ml-2"}>{b.status}</Badge>
          </button>
        ))}
        <Button variant="outline" className="rounded-xl border-dashed px-4 py-3 h-auto text-muted-foreground">
          + New Brand
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 rounded-lg border border-border bg-muted/40 p-1 w-fit">
        {(["branding", "domains", "ai", "partners"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-md px-4 py-1.5 text-sm font-medium capitalize transition-colors ${activeTab === tab ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
          >
            {tab === "ai" ? "AI Identity" : tab === "partners" ? "Partner Ecosystem" : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === "branding" && (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {/* Platform Identity */}
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">Platform Identity</CardTitle></CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Platform Name</label>
                  <Input value={platformName} onChange={(e) => setPlatformName(e.target.value)} className="h-9" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Company Name</label>
                  <Input defaultValue="Vision Technologies" className="h-9" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Logo (Light)</label>
                  <Button variant="outline" className="w-full h-9 gap-2 text-sm text-muted-foreground"><Upload className="size-4" />Upload Logo</Button>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Logo (Dark)</label>
                  <Button variant="outline" className="w-full h-9 gap-2 text-sm text-muted-foreground"><Upload className="size-4" />Upload Logo</Button>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Favicon</label>
                  <Button variant="outline" className="w-full h-9 gap-2 text-sm text-muted-foreground"><Upload className="size-4" />Upload Favicon</Button>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Login Background</label>
                  <Button variant="outline" className="w-full h-9 gap-2 text-sm text-muted-foreground"><Upload className="size-4" />Upload Image</Button>
                </div>
              </CardContent>
            </Card>

            {/* Theme Builder */}
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold flex items-center gap-2"><Palette className="size-4" />Theme Builder</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                  {THEME_PRESETS.map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => setPrimaryColor(preset.primary)}
                      className={`flex flex-col items-center gap-2 rounded-xl border p-3 transition-colors ${primaryColor === preset.primary ? "border-primary bg-primary/5" : "border-border hover:bg-muted/40"}`}
                    >
                      <div className="size-8 rounded-full border border-border shadow-sm" style={{ backgroundColor: preset.primary }} />
                      <span className="text-[10px] text-muted-foreground text-center leading-tight">{preset.name}</span>
                    </button>
                  ))}
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    { label: "Primary Color", color: primaryColor },
                    { label: "Secondary Color", color: "#e8f0ff" },
                    { label: "Accent Color", color: "#4f90ff" },
                  ].map((c) => (
                    <div key={c.label} className="space-y-1.5">
                      <label className="text-xs font-medium text-muted-foreground">{c.label}</label>
                      <div className="flex items-center gap-2 rounded-lg border border-border p-2">
                        <div className="size-6 rounded border border-border shrink-0" style={{ backgroundColor: c.color }} />
                        <span className="font-mono text-xs">{c.color}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {["Typography", "Spacing", "Borders", "Shadows", "Cards", "Dark Mode"].map((opt) => (
                    <Button key={opt} variant="outline" size="sm" className="gap-1.5 text-xs">
                      <Type className="size-3.5" />{opt}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* White Label Toggle */}
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">White Label Settings</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                {[
                  { label: 'Hide "Powered by Vision CRM"', enabled: true },
                  { label: "Hide Footer Credits", enabled: true },
                  { label: "Custom Help Links", enabled: false },
                  { label: "Custom Documentation", enabled: false },
                  { label: "Custom Support Links", enabled: true },
                  { label: "Hide Marketplace Access", enabled: false },
                  { label: "Hide Developer Platform", enabled: false },
                ].map((s) => (
                  <div key={s.label} className="flex items-center justify-between rounded-lg border border-border px-4 py-3 text-sm">
                    <span>{s.label}</span>
                    <div className={`relative inline-flex h-5 w-9 cursor-pointer items-center rounded-full transition-colors ${s.enabled ? "bg-primary" : "bg-muted"}`}>
                      <div className={`size-3.5 rounded-full bg-white shadow transition-transform ${s.enabled ? "translate-x-4" : "translate-x-0.5"}`} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right: Live Preview */}
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold flex items-center gap-2"><Eye className="size-4" />Live Preview</CardTitle></CardHeader>
              <CardContent>
                <div className="rounded-xl border border-border overflow-hidden">
                  {/* Mock header */}
                  <div className="flex items-center gap-2 px-4 py-3" style={{ backgroundColor: primaryColor }}>
                    <div className="size-6 rounded bg-white/20" />
                    <span className="text-sm font-bold text-white">{platformName}</span>
                  </div>
                  {/* Mock sidebar */}
                  <div className="flex" style={{ height: 180 }}>
                    <div className="w-24 bg-muted/60 p-2 space-y-1">
                      {["Dashboard", "Contacts", "Deals", "AI Agents"].map((item) => (
                        <div key={item} className="rounded px-2 py-1 text-[9px] text-muted-foreground hover:bg-muted">{item}</div>
                      ))}
                    </div>
                    <div className="flex-1 bg-background p-3 space-y-2">
                      <div className="grid grid-cols-2 gap-1.5">
                        {[0, 1, 2, 3].map((i) => (
                          <div key={i} className="rounded-lg border border-border p-2">
                            <div className="h-1.5 w-10 rounded bg-muted mb-1" />
                            <div className="h-3 w-8 rounded" style={{ backgroundColor: primaryColor + "40" }} />
                          </div>
                        ))}
                      </div>
                      <div className="rounded-lg border border-border p-2">
                        <div className="h-1.5 w-16 rounded bg-muted mb-1.5" />
                        <div className="space-y-1">
                          {[0, 1, 2].map((i) => <div key={i} className="h-1.5 rounded bg-muted/60" />)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Document branding */}
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">Document Branding</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                {["Invoices", "Quotations", "Contracts", "Reports", "Certificates", "PDF Exports"].map((doc) => (
                  <div key={doc} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{doc}</span>
                    <div className="flex items-center gap-1.5 text-green-600 text-xs"><CheckCircle2 className="size-3.5" />Branded</div>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full mt-2 text-xs gap-1.5"><Upload className="size-3.5" />Upload Document Template</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeTab === "domains" && (
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold flex items-center gap-2"><Globe className="size-4" />Custom Domains</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { domain: "app.vision-crm.com", type: "Primary", ssl: "valid", status: "live" },
                { domain: "portal.techcorp.eg", type: "Client", ssl: "valid", status: "live" },
                { domain: "crm.gulfconsult.ae", type: "Partner", ssl: "provisioning", status: "pending" },
              ].map((d) => (
                <div key={d.domain} className="rounded-xl border border-border p-4 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-mono text-sm font-semibold">{d.domain}</p>
                      <p className="text-xs text-muted-foreground">{d.type} Domain</p>
                    </div>
                    <Badge className={d.status === "live" ? "bg-green-100 text-green-700 border-0" : "bg-yellow-100 text-yellow-700 border-0"}>{d.status}</Badge>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Shield className="size-3.5 text-green-500" />
                    SSL: {d.ssl}
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="gap-2"><Globe className="size-4" />Add Custom Domain</Button>
          </CardContent>
        </Card>
      )}

      {activeTab === "ai" && (
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold flex items-center gap-2"><Bot className="size-4" />AI Identity Configuration</CardTitle></CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">AI Assistant Name</label>
              <Input value={aiName} onChange={(e) => setAiName(e.target.value)} className="h-9" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">AI Avatar</label>
              <Button variant="outline" className="w-full h-9 gap-2 text-sm text-muted-foreground"><Upload className="size-4" />Upload Avatar</Button>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">AI Tone</label>
              <div className="flex flex-wrap gap-1.5">
                {["Professional", "Friendly", "Formal", "Concise"].map((t) => (
                  <button key={t} className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${t === "Professional" ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:bg-muted"}`}>{t}</button>
                ))}
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">AI Language</label>
              <div className="flex gap-1.5">
                {["English", "Arabic", "Both"].map((l) => (
                  <button key={l} className={`flex-1 rounded-md border py-1.5 text-xs font-medium transition-colors ${l === "Both" ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:bg-muted"}`}>{l}</button>
                ))}
              </div>
            </div>
            <div className="sm:col-span-2 space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">AI Welcome Message</label>
              <textarea className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring" rows={3} defaultValue={`Hello! I'm ${aiName}, your AI business assistant. How can I help you today?`} />
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "partners" && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { type: "Resellers", count: 12, icon: Store, color: "bg-blue-500" },
            { type: "Agencies", count: 8, icon: Building2, color: "bg-teal-500" },
            { type: "Implementation Partners", count: 5, icon: Layers, color: "bg-purple-500" },
            { type: "Training Partners", count: 3, icon: Type, color: "bg-orange-500" },
            { type: "Technology Partners", count: 7, icon: Bot, color: "bg-green-500" },
            { type: "Certified Developers", count: 24, icon: CheckCircle2, color: "bg-indigo-500" },
          ].map((p) => (
            <Card key={p.type}>
              <CardContent className="flex items-center gap-4 p-4">
                <div className={`flex size-10 items-center justify-center rounded-lg ${p.color}`}>
                  <p.icon className="size-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-sm">{p.type}</p>
                  <p className="text-xs text-muted-foreground">{p.count} registered</p>
                </div>
                <Button variant="outline" size="sm" className="ml-auto text-xs">Manage</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
