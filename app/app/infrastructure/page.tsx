"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Server, Activity, Database, Cpu, HardDrive, Globe,
  Zap, CheckCircle2, AlertTriangle, BarChart3, RefreshCw,
  TrendingUp, Clock, Shield, ArrowUpRight,
} from "lucide-react"

const SERVICES = [
  { name: "API Gateway", status: "operational", uptime: "99.99%", latency: "48ms", region: "EU-West", icon: Zap },
  { name: "AI Engine (GPT-4o)", status: "operational", uptime: "99.97%", latency: "320ms", region: "US-East", icon: Cpu },
  { name: "WhatsApp Bridge", status: "degraded", uptime: "99.81%", latency: "380ms", region: "EU-Central", icon: Activity },
  { name: "Voice Engine", status: "operational", uptime: "99.95%", latency: "180ms", region: "EU-West", icon: Server },
  { name: "Primary Database", status: "operational", uptime: "100%", latency: "12ms", region: "EU-West", icon: Database },
  { name: "Search & RAG Index", status: "operational", uptime: "99.98%", latency: "28ms", region: "EU-West", icon: Globe },
  { name: "Email Relay (Resend)", status: "operational", uptime: "99.99%", latency: "92ms", region: "Global", icon: Zap },
  { name: "File Storage (S3)", status: "operational", uptime: "100%", latency: "35ms", region: "EU-West", icon: HardDrive },
]

const STATUS_STYLES: Record<string, { badge: string; dot: string }> = {
  operational: { badge: "bg-green-100 text-green-700", dot: "bg-green-500" },
  degraded: { badge: "bg-yellow-100 text-yellow-700", dot: "bg-yellow-500 animate-pulse" },
  outage: { badge: "bg-red-100 text-red-700", dot: "bg-red-500 animate-pulse" },
}

const INCIDENTS = [
  { title: "WhatsApp Bridge Latency Spike", severity: "minor", status: "investigating", time: "3h ago", desc: "Elevated response times observed on WhatsApp message delivery. Average latency increased from 82ms to 380ms. Root cause under investigation." },
  { title: "API Gateway Brief Outage", severity: "minor", status: "resolved", time: "3d ago", desc: "2-minute outage affecting 0.3% of API requests due to a configuration deploy. Fully resolved at 14:22 UTC." },
]

function MiniSparkline({ values, color = "#0066ff" }: { values: number[]; color?: string }) {
  const max = Math.max(...values)
  const pts = values.map((v, i) => `${(i / (values.length - 1)) * 100},${40 - (v / max) * 35}`).join(" ")
  return (
    <svg width="80" height="40" className="overflow-visible">
      <polyline fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" points={pts} />
    </svg>
  )
}

export default function InfrastructurePage() {
  const operational = SERVICES.filter((s) => s.status === "operational").length
  const degraded = SERVICES.filter((s) => s.status === "degraded").length

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Infrastructure & DevOps</h1>
          <p className="mt-1 text-sm text-muted-foreground">Real-time platform health, service status, and incident management.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><RefreshCw className="size-4" />Refresh</Button>
          <Button variant="outline" size="sm"><Shield className="size-4" />Run Health Check</Button>
        </div>
      </div>

      {/* Overall Status */}
      <Card className={degraded > 0 ? "border-yellow-300 bg-yellow-50/50" : "border-green-300 bg-green-50/50"}>
        <CardContent className="flex items-center justify-between p-5">
          <div className="flex items-center gap-4">
            {degraded > 0 ? (
              <AlertTriangle className="size-8 text-yellow-500" />
            ) : (
              <CheckCircle2 className="size-8 text-green-500" />
            )}
            <div>
              <p className="font-semibold text-lg">
                {degraded > 0 ? "Partial Service Disruption" : "All Systems Operational"}
              </p>
              <p className="text-sm text-muted-foreground">
                {operational}/{SERVICES.length} services healthy · {degraded > 0 ? `${degraded} degraded` : "No incidents"}
              </p>
            </div>
          </div>
          <div className="flex gap-6 text-sm">
            <div className="text-center">
              <p className="text-xs text-muted-foreground">30-day Uptime</p>
              <p className="font-semibold">99.97%</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Incidents (30d)</p>
              <p className="font-semibold">{INCIDENTS.length}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground">MTTR</p>
              <p className="font-semibold">8 min</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resource Utilization */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: "CPU Utilization", value: 42, unit: "%", icon: Cpu, sparkline: [30, 35, 28, 42, 38, 44, 40, 42] },
          { label: "Memory Usage", value: 61, unit: "%", icon: Server, sparkline: [55, 58, 60, 57, 62, 60, 63, 61] },
          { label: "Storage Used", value: 34, unit: "%", icon: HardDrive, sparkline: [28, 29, 30, 31, 31, 32, 33, 34] },
          { label: "Network I/O", value: 2.4, unit: "Gbps", icon: Activity, sparkline: [1.8, 2.1, 1.9, 2.5, 2.2, 2.8, 2.4, 2.4] },
        ].map((m) => (
          <Card key={m.label}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">{m.label}</p>
                <m.icon className="size-4 text-muted-foreground" />
              </div>
              <p className="mt-1 text-2xl font-semibold">{m.value}{m.unit}</p>
              <MiniSparkline values={m.sparkline} />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Services Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-base">Service Status</CardTitle>
          <Badge variant="outline" className="text-xs">{SERVICES.length} services</Badge>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="px-4 py-3 font-medium text-muted-foreground">Service</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">Status</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">Uptime (30d)</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">Latency (p95)</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">Region</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">Trend</th>
                </tr>
              </thead>
              <tbody>
                {SERVICES.map((svc) => {
                  const style = STATUS_STYLES[svc.status]
                  return (
                    <tr key={svc.name} className="border-b border-border hover:bg-muted/40">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <svc.icon className="size-4 text-muted-foreground" />
                          <span className="font-medium">{svc.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className={`size-2 rounded-full ${style.dot}`} />
                          <Badge className={`text-xs ${style.badge}`}>{svc.status}</Badge>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-medium">{svc.uptime}</td>
                      <td className="px-4 py-3 text-muted-foreground">{svc.latency}</td>
                      <td className="px-4 py-3 text-muted-foreground">{svc.region}</td>
                      <td className="px-4 py-3">
                        <MiniSparkline values={[40, 42, 38, 44, 41, 43, 42, 43]} color={svc.status === "degraded" ? "#eab308" : "#22c55e"} />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Incidents */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <AlertTriangle className="size-4 text-muted-foreground" />
            Incidents & Postmortems
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {INCIDENTS.map((inc, i) => (
            <div key={i} className={`rounded-xl border p-4 ${inc.status === "investigating" ? "border-yellow-300 bg-yellow-50/50" : "border-border"}`}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-sm">{inc.title}</p>
                    <Badge className={inc.status === "investigating" ? "bg-yellow-100 text-yellow-700 text-xs" : "bg-green-100 text-green-700 text-xs"}>
                      {inc.status}
                    </Badge>
                    <Badge variant="outline" className="text-xs capitalize">{inc.severity}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{inc.desc}</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
                  <Clock className="size-3" />
                  {inc.time}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
