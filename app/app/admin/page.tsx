"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Globe, Users, Building2, DollarSign, BarChart3, Shield,
  Server, Activity, TrendingUp, AlertTriangle, CheckCircle2,
  Settings, Eye, ArrowRight, Zap, Bot, Clock,
} from "lucide-react"

const TENANTS = [
  { id: "1", name: "TechCorp Egypt", plan: "Enterprise", users: 48, mrr: 8500, status: "active", health: 98, joined: "Jan 2026" },
  { id: "2", name: "Gulf Trading LLC", plan: "Business", users: 12, mrr: 1200, status: "active", health: 92, joined: "Mar 2026" },
  { id: "3", name: "Smart Buildings Co", plan: "Enterprise", users: 67, mrr: 12000, status: "active", health: 74, joined: "Nov 2025" },
  { id: "4", name: "Digital Solutions", plan: "Starter", users: 5, mrr: 299, status: "trial", health: 88, joined: "Jul 2026" },
  { id: "5", name: "Nile Logistics", plan: "Business", users: 22, mrr: 2400, status: "active", health: 95, joined: "Feb 2026" },
  { id: "6", name: "Riyadh Retail", plan: "Starter", users: 8, mrr: 299, status: "past_due", health: 60, joined: "May 2026" },
]

const PLAN_COLORS: Record<string, string> = {
  Enterprise: "bg-purple-100 text-purple-700",
  Business: "bg-blue-100 text-blue-700",
  Starter: "bg-green-100 text-green-700",
}

const STATUS_COLORS: Record<string, string> = {
  active: "bg-green-100 text-green-700",
  trial: "bg-yellow-100 text-yellow-700",
  past_due: "bg-red-100 text-red-700",
  churned: "bg-gray-100 text-gray-600",
}

function HealthBar({ value }: { value: number }) {
  const color = value >= 90 ? "bg-green-500" : value >= 70 ? "bg-yellow-500" : "bg-red-400"
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-16 rounded-full bg-muted overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
      </div>
      <span className="text-xs font-medium">{value}%</span>
    </div>
  )
}

export default function AdminPage() {
  const totalMRR = TENANTS.reduce((s, t) => s + t.mrr, 0)
  const totalUsers = TENANTS.reduce((s, t) => s + t.users, 0)

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Global Admin</h1>
          <p className="mt-1 text-sm text-muted-foreground">Platform-wide administration across all tenants and infrastructure.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Settings className="size-4" />Platform Config</Button>
          <Button><Building2 className="size-4" />Add Tenant</Button>
        </div>
      </div>

      {/* Platform KPIs */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: "Total Tenants", value: TENANTS.length, icon: Building2, sub: "2 enterprise" },
          { label: "Total Users", value: totalUsers, icon: Users, sub: "Across all orgs" },
          { label: "Platform MRR", value: "$" + (totalMRR / 1000).toFixed(1) + "K", icon: DollarSign, sub: "+18% MoM" },
          { label: "Platform Health", value: "99.9%", icon: Activity, sub: "Uptime SLA" },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <s.icon className="size-4 text-muted-foreground" />
              </div>
              <p className="mt-2 text-2xl font-semibold">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{s.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* System Health */}
      <div className="grid gap-4 lg:grid-cols-4">
        {[
          { label: "API Gateway", status: "Operational", latency: "48ms", icon: Zap, color: "text-green-500" },
          { label: "AI Engine", status: "Operational", latency: "120ms", icon: Bot, color: "text-green-500" },
          { label: "Database Cluster", status: "Operational", latency: "12ms", icon: Server, color: "text-green-500" },
          { label: "WhatsApp Bridge", status: "Degraded", latency: "380ms", icon: AlertTriangle, color: "text-yellow-500" },
        ].map((svc) => (
          <Card key={svc.label}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <svc.icon className={`size-5 ${svc.color}`} />
                <Badge className={svc.status === "Operational" ? "bg-green-100 text-green-700 text-xs" : "bg-yellow-100 text-yellow-700 text-xs"}>
                  {svc.status}
                </Badge>
              </div>
              <p className="font-medium text-sm">{svc.label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">Latency: {svc.latency}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tenant Management */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-base">Tenant Management</CardTitle>
          <Badge variant="outline" className="text-xs">{TENANTS.length} tenants</Badge>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="px-4 py-3 font-medium text-muted-foreground">Organization</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">Plan</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">Users</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">MRR</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">Health</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">Status</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">Joined</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground"></th>
                </tr>
              </thead>
              <tbody>
                {TENANTS.map((tenant) => (
                  <tr key={tenant.id} className="border-b border-border hover:bg-muted/40 cursor-pointer transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-semibold text-sm">
                          {tenant.name[0]}
                        </div>
                        <span className="font-medium">{tenant.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge className={`text-xs ${PLAN_COLORS[tenant.plan]}`}>{tenant.plan}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Users className="size-3.5 text-muted-foreground" />
                        {tenant.users}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-semibold">${tenant.mrr.toLocaleString()}</td>
                    <td className="px-4 py-3"><HealthBar value={tenant.health} /></td>
                    <td className="px-4 py-3">
                      <Badge className={`text-xs ${STATUS_COLORS[tenant.status]}`}>{tenant.status.replace("_", " ")}</Badge>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{tenant.joined}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <button className="rounded p-1 hover:bg-muted"><Eye className="size-3.5 text-muted-foreground" /></button>
                        <button className="rounded p-1 hover:bg-muted"><Settings className="size-3.5 text-muted-foreground" /></button>
                        <button className="rounded p-1 hover:bg-muted"><ArrowRight className="size-3.5 text-muted-foreground" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Recent Platform Events */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Clock className="size-4 text-muted-foreground" />
            Recent Platform Events
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {[
            { text: "Digital Solutions signed up — Trial started", time: "2h ago", icon: CheckCircle2, color: "text-green-500" },
            { text: "WhatsApp Bridge latency spike detected — investigating", time: "3h ago", icon: AlertTriangle, color: "text-yellow-500" },
            { text: "Riyadh Retail payment failed — dunning initiated", time: "5h ago", icon: AlertTriangle, color: "text-red-500" },
            { text: "Platform deployed v2.4.1 — all tenants updated", time: "Yesterday", icon: CheckCircle2, color: "text-blue-500" },
            { text: "Smart Buildings Co upgraded plan — Enterprise", time: "2d ago", icon: TrendingUp, color: "text-purple-500" },
          ].map((ev, i) => (
            <div key={i} className="flex items-center gap-3 rounded-lg bg-muted/30 px-3 py-2.5">
              <ev.icon className={`size-4 shrink-0 ${ev.color}`} />
              <span className="flex-1 text-sm text-muted-foreground">{ev.text}</span>
              <span className="text-xs text-muted-foreground shrink-0">{ev.time}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
