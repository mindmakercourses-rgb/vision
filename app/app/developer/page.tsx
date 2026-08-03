"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Code2, Key, Plus, Copy, Eye, EyeOff, RefreshCw, Webhook,
  BarChart3, Globe, Book, Zap, CheckCircle2, Clock,
  Terminal, FileText, ArrowRight, Shield,
} from "lucide-react"

const API_KEYS = [
  { id: "1", name: "Production Key", key: "sk_live_xxxxxxxxxxxxxxxxxxxxxxxxxxx", created: "Jan 15, 2026", lastUsed: "2m ago", requests: "124,847", status: "active" },
  { id: "2", name: "Development Key", key: "sk_dev_yyyyyyyyyyyyyyyyyyyyyyyyy", created: "Mar 2, 2026", lastUsed: "1h ago", requests: "8,420", status: "active" },
  { id: "3", name: "Staging Key", key: "sk_stg_zzzzzzzzzzzzzzzzzzzzzzzzz", created: "Jun 10, 2026", lastUsed: "3d ago", requests: "1,240", status: "active" },
]

const WEBHOOKS = [
  { url: "https://api.company.com/webhooks/crm", events: ["lead.created", "deal.updated", "contact.enriched"], status: "active", lastDelivery: "2m ago", successRate: "99.8%" },
  { url: "https://zapier.com/hooks/vision/xxxxxxxxxx", events: ["deal.won", "invoice.paid"], status: "active", lastDelivery: "1h ago", successRate: "100%" },
  { url: "https://staging.app.io/events", events: ["*"], status: "paused", lastDelivery: "3d ago", successRate: "87.2%" },
]

const ENDPOINTS = [
  { method: "GET", path: "/v1/contacts", desc: "List all contacts with pagination and filters" },
  { method: "POST", path: "/v1/contacts", desc: "Create a new contact" },
  { method: "GET", path: "/v1/leads", desc: "Retrieve leads with AI scores" },
  { method: "POST", path: "/v1/leads/:id/qualify", desc: "Trigger AI lead qualification" },
  { method: "GET", path: "/v1/deals", desc: "Get deals and pipeline data" },
  { method: "POST", path: "/v1/messages/whatsapp", desc: "Send a WhatsApp message" },
  { method: "POST", path: "/v1/ai/complete", desc: "Run AI inference with your context" },
  { method: "GET", path: "/v1/analytics/revenue", desc: "Revenue analytics data" },
]

const METHOD_COLORS: Record<string, string> = {
  GET: "bg-green-100 text-green-700",
  POST: "bg-blue-100 text-blue-700",
  PUT: "bg-yellow-100 text-yellow-700",
  DELETE: "bg-red-100 text-red-700",
  PATCH: "bg-orange-100 text-orange-700",
}

export default function DeveloperPage() {
  const [showKey, setShowKey] = useState<string | null>(null)

  function maskKey(key: string) {
    return key.slice(0, 12) + "•".repeat(key.length - 16) + key.slice(-4)
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Developer Platform</h1>
          <p className="mt-1 text-sm text-muted-foreground">API keys, webhooks, and integration tools for building on Vision CRM.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <a href="#" target="_blank" rel="noopener noreferrer"><Book className="size-4" />API Docs</a>
          </Button>
          <Button><Terminal className="size-4" />API Playground</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: "API Calls (30d)", value: "134K", icon: Zap },
          { label: "Active Webhooks", value: WEBHOOKS.filter((w) => w.status === "active").length, icon: Webhook },
          { label: "API Keys", value: API_KEYS.length, icon: Key },
          { label: "Avg Latency", value: "48ms", icon: BarChart3 },
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

      {/* API Keys */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-base flex items-center gap-2"><Key className="size-4 text-muted-foreground" />API Keys</CardTitle>
          <Button size="sm"><Plus className="size-4" />New Key</Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {API_KEYS.map((k) => (
            <div key={k.id} className="flex flex-wrap items-center gap-3 rounded-xl border border-border p-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-medium text-sm">{k.name}</p>
                  <Badge className="bg-green-100 text-green-700 text-xs">{k.status}</Badge>
                </div>
                <p className="font-mono text-xs text-muted-foreground">
                  {showKey === k.id ? k.key : maskKey(k.key)}
                </p>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div><p className="text-xs text-muted-foreground">Requests</p><p className="font-medium text-foreground">{k.requests}</p></div>
                <div><p className="text-xs text-muted-foreground">Last used</p><p className="font-medium text-foreground">{k.lastUsed}</p></div>
                <div><p className="text-xs text-muted-foreground">Created</p><p className="font-medium text-foreground">{k.created}</p></div>
              </div>
              <div className="flex gap-1.5">
                <button onClick={() => setShowKey(showKey === k.id ? null : k.id)} className="rounded-md p-1.5 hover:bg-muted">
                  {showKey === k.id ? <EyeOff className="size-4 text-muted-foreground" /> : <Eye className="size-4 text-muted-foreground" />}
                </button>
                <button className="rounded-md p-1.5 hover:bg-muted"><Copy className="size-4 text-muted-foreground" /></button>
                <button className="rounded-md p-1.5 hover:bg-muted"><RefreshCw className="size-4 text-muted-foreground" /></button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Webhooks */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-base flex items-center gap-2"><Webhook className="size-4 text-muted-foreground" />Webhooks</CardTitle>
          <Button size="sm"><Plus className="size-4" />Add Webhook</Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {WEBHOOKS.map((wh, i) => (
            <div key={i} className="rounded-xl border border-border p-4">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <p className="font-mono text-xs font-medium">{wh.url}</p>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {wh.events.map((e) => (
                      <Badge key={e} variant="outline" className="text-xs font-mono">{e}</Badge>
                    ))}
                  </div>
                </div>
                <Badge className={wh.status === "active" ? "bg-green-100 text-green-700 text-xs shrink-0" : "bg-gray-100 text-gray-600 text-xs shrink-0"}>
                  {wh.status}
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1"><Clock className="size-3" />Last delivery: {wh.lastDelivery}</div>
                <div className="flex items-center gap-1"><CheckCircle2 className="size-3 text-green-500" />Success rate: {wh.successRate}</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* API Reference */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-base flex items-center gap-2"><Code2 className="size-4 text-muted-foreground" />API Reference</CardTitle>
          <Button variant="outline" size="sm"><FileText className="size-4" />Full Docs</Button>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="px-4 py-3 font-medium text-muted-foreground w-20">Method</th>
                <th className="px-4 py-3 font-medium text-muted-foreground">Endpoint</th>
                <th className="px-4 py-3 font-medium text-muted-foreground">Description</th>
                <th className="px-4 py-3 font-medium text-muted-foreground w-12"></th>
              </tr>
            </thead>
            <tbody>
              {ENDPOINTS.map((ep, i) => (
                <tr key={i} className="border-b border-border hover:bg-muted/40 cursor-pointer">
                  <td className="px-4 py-3">
                    <Badge className={`text-xs font-mono ${METHOD_COLORS[ep.method]}`}>{ep.method}</Badge>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">{ep.path}</td>
                  <td className="px-4 py-3 text-muted-foreground">{ep.desc}</td>
                  <td className="px-4 py-3"><ArrowRight className="size-4 text-muted-foreground" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
