"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  BarChart3, TrendingUp, TrendingDown, Users, DollarSign, MessageSquare,
  Phone, Mail, Bot, ArrowUpRight, ArrowDownRight, Calendar, Download,
  RefreshCw, Zap, Target, Star,
} from "lucide-react"

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"]
const REVENUE_DATA = [85, 92, 78, 105, 118, 96, 134, 142]
const LEADS_DATA = [24, 31, 19, 42, 38, 27, 55, 61]
const CONV_DATA = [340, 420, 380, 510, 490, 445, 620, 680]

function BarChart({ data, color, height = 80 }: { data: number[]; color: string; height?: number }) {
  const max = Math.max(...data)
  return (
    <div className="flex items-end gap-1" style={{ height }}>
      {data.map((v, i) => (
        <div key={i} className="flex flex-1 flex-col items-center gap-1">
          <div
            className={`w-full rounded-t-sm ${color} transition-all opacity-80 hover:opacity-100`}
            style={{ height: `${(v / max) * (height - 16)}px` }}
          />
        </div>
      ))}
    </div>
  )
}

function MiniLineChart({ data, color = "#0066ff" }: { data: number[]; color?: string }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const h = 40
  const w = 120
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w
    const y = h - ((v - min) / range) * h
    return `${x},${y}`
  }).join(" ")
  return (
    <svg width={w} height={h} className="overflow-visible">
      <polyline fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" points={pts} />
      <circle cx={(data.length - 1) / (data.length - 1) * w} cy={h - ((data[data.length - 1] - min) / range) * h} r="3" fill={color} />
    </svg>
  )
}

const KPI_CARDS = [
  { label: "Total Revenue", value: "$1.24M", change: "+18.2%", up: true, icon: DollarSign, chartData: REVENUE_DATA },
  { label: "Active Leads", value: "284", change: "+12.4%", up: true, icon: Target, chartData: LEADS_DATA },
  { label: "AI Conversations", value: "4,820", change: "+34.1%", up: true, icon: Bot, chartData: CONV_DATA },
  { label: "Churn Rate", value: "2.1%", change: "-0.4%", up: false, icon: Users, chartData: [4, 3.5, 4.2, 3.8, 3.1, 2.8, 2.4, 2.1] },
]

const CHANNEL_PERF = [
  { channel: "WhatsApp AI", conversations: 2840, resolved: "88%", satisfaction: 4.8, revenue: "$124K", icon: MessageSquare, color: "bg-green-500" },
  { channel: "Email AI", conversations: 1120, resolved: "91%", satisfaction: 4.7, revenue: "$68K", icon: Mail, color: "bg-blue-500" },
  { channel: "Voice AI", conversations: 480, resolved: "79%", satisfaction: 4.6, revenue: "$54K", icon: Phone, color: "bg-purple-500" },
  { channel: "Live Chat", conversations: 380, resolved: "95%", satisfaction: 4.9, revenue: "$22K", icon: Bot, color: "bg-orange-500" },
]

const TOP_DEALS = [
  { name: "Smart Buildings AI Platform", company: "Smart Buildings Co", value: 450000, stage: "Contract", probability: 90 },
  { name: "TechCorp Enterprise Suite", company: "TechCorp Egypt", value: 180000, stage: "Negotiation", probability: 75 },
  { name: "Nile Logistics Suite", company: "Nile Logistics", value: 220000, stage: "Closed Won", probability: 100 },
  { name: "Gulf Trading CRM", company: "Gulf Trading LLC", value: 85000, stage: "Proposal", probability: 55 },
]

export default function AnalyticsPage() {
  const [period, setPeriod] = useState("30d")

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Analytics Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">Real-time performance across all channels and pipelines.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-lg border border-border overflow-hidden">
            {["7d", "30d", "90d", "1y"].map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1.5 text-sm font-medium transition-colors ${period === p ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`}
              >
                {p}
              </button>
            ))}
          </div>
          <Button variant="outline" size="sm"><Download className="size-4" />Export</Button>
          <Button variant="outline" size="sm"><RefreshCw className="size-4" /></Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {KPI_CARDS.map((kpi) => (
          <Card key={kpi.label}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">{kpi.label}</p>
                  <p className="mt-1 text-2xl font-semibold tabular-nums">{kpi.value}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {kpi.up ? <ArrowUpRight className="size-3.5 text-green-500" /> : <ArrowDownRight className="size-3.5 text-green-500" />}
                    <span className="text-xs font-medium text-green-600">{kpi.change}</span>
                    <span className="text-xs text-muted-foreground">vs last {period}</span>
                  </div>
                </div>
                <kpi.icon className="size-5 text-muted-foreground mt-1" />
              </div>
              <div className="mt-3">
                <MiniLineChart data={kpi.chartData} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue Chart + Funnel */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base">Revenue & Leads Trend</CardTitle>
            <Badge variant="outline" className="text-xs">Last 8 months</Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-6 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5"><div className="size-2.5 rounded-sm bg-primary" />Revenue ($K)</div>
                <div className="flex items-center gap-1.5"><div className="size-2.5 rounded-sm bg-primary/30" />Leads</div>
              </div>
              <div className="relative h-48">
                <div className="flex h-40 items-end gap-2 mt-4">
                  {REVENUE_DATA.map((v, i) => {
                    const maxR = Math.max(...REVENUE_DATA)
                    const maxL = Math.max(...LEADS_DATA)
                    return (
                      <div key={i} className="flex flex-1 flex-col items-center gap-0.5">
                        <div className="flex w-full items-end gap-0.5" style={{ height: "128px" }}>
                          <div className="flex-1 rounded-t-sm bg-primary transition-all" style={{ height: `${(v / maxR) * 128}px` }} />
                          <div className="flex-1 rounded-t-sm bg-primary/30 transition-all" style={{ height: `${(LEADS_DATA[i] / maxL) * 128}px` }} />
                        </div>
                        <span className="text-xs text-muted-foreground">{MONTHS[i]}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-muted/40 p-3">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Total Revenue</p>
                  <p className="font-semibold">$850K</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Best Month</p>
                  <p className="font-semibold">Aug ($142K)</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Growth</p>
                  <p className="font-semibold text-green-600">+67%</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Total Leads</p>
                  <p className="font-semibold">297</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sales Funnel */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Sales Funnel</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              { stage: "New Leads", count: 284, pct: 100, color: "bg-primary" },
              { stage: "Contacted", count: 218, pct: 77, color: "bg-primary/80" },
              { stage: "Qualified", count: 142, pct: 50, color: "bg-primary/60" },
              { stage: "Proposal", count: 87, pct: 31, color: "bg-primary/45" },
              { stage: "Negotiation", count: 34, pct: 12, color: "bg-primary/30" },
              { stage: "Closed Won", count: 21, pct: 7, color: "bg-green-500" },
            ].map((s) => (
              <div key={s.stage} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">{s.stage}</span>
                  <span className="font-medium">{s.count}</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <div className={`h-full rounded-full ${s.color}`} style={{ width: `${s.pct}%` }} />
                </div>
              </div>
            ))}
            <div className="pt-2 text-center">
              <p className="text-xs text-muted-foreground">Conversion Rate</p>
              <p className="text-xl font-semibold text-green-600">7.4%</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Channel Performance */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-base">Channel Performance</CardTitle>
          <Badge variant="outline" className="text-xs">All Channels</Badge>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="px-4 py-3 font-medium text-muted-foreground">Channel</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">Conversations</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">Resolution Rate</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">Satisfaction</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">Revenue Attribution</th>
                </tr>
              </thead>
              <tbody>
                {CHANNEL_PERF.map((ch) => (
                  <tr key={ch.channel} className="border-b border-border hover:bg-muted/40">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className={`flex size-7 items-center justify-center rounded-lg ${ch.color}`}>
                          <ch.icon className="size-4 text-white" />
                        </div>
                        <span className="font-medium">{ch.channel}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium">{ch.conversations.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-20 rounded-full bg-muted overflow-hidden">
                          <div className="h-full rounded-full bg-green-500" style={{ width: ch.resolved }} />
                        </div>
                        <span className="text-sm font-medium">{ch.resolved}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Star className="size-3.5 text-yellow-500" />
                        <span className="font-medium">{ch.satisfaction}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-semibold text-green-600">{ch.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Top Deals + Activity Feed */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Top Open Deals</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {TOP_DEALS.map((deal) => (
              <div key={deal.name} className="flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{deal.name}</p>
                  <p className="text-xs text-muted-foreground">{deal.company} · {deal.stage}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-semibold text-sm">${(deal.value / 1000).toFixed(0)}K</p>
                  <p className="text-xs text-muted-foreground">{deal.probability}% prob</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Live Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { text: "Sara AI closed deal with TechCorp — $180K", time: "2m ago", icon: DollarSign, color: "text-green-500" },
              { text: "47 new WhatsApp conversations started", time: "5m ago", icon: MessageSquare, color: "text-green-600" },
              { text: "Lead qualification workflow executed × 12", time: "8m ago", icon: Zap, color: "text-yellow-500" },
              { text: "Omar Support resolved 8 tickets", time: "15m ago", icon: Bot, color: "text-primary" },
              { text: "Smart Buildings contract uploaded", time: "22m ago", icon: TrendingUp, color: "text-blue-500" },
              { text: "3 leads escalated to human agents", time: "31m ago", icon: Users, color: "text-orange-500" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <item.icon className={`size-4 shrink-0 ${item.color}`} />
                <span className="flex-1 text-muted-foreground">{item.text}</span>
                <span className="text-xs text-muted-foreground shrink-0">{item.time}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
