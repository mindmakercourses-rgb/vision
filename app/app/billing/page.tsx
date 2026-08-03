"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  CreditCard, DollarSign, TrendingUp, Users, Download,
  CheckCircle2, AlertTriangle, Calendar, ArrowUpRight,
  Zap, RefreshCw, Receipt, Building2,
} from "lucide-react"

const PLANS = [
  {
    name: "Starter", price: 299, users: "Up to 5 users", color: "border-border",
    features: ["3 AI Agents", "WhatsApp + Email", "Basic Workflows", "1,000 AI conversations/mo", "Standard Support"],
  },
  {
    name: "Business", price: 999, users: "Up to 25 users", color: "border-primary",
    features: ["10 AI Agents", "All Channels", "Advanced Workflows", "10,000 AI conversations/mo", "Knowledge Base", "Priority Support"],
    popular: true,
  },
  {
    name: "Enterprise", price: 3499, users: "Unlimited users", color: "border-purple-400",
    features: ["Unlimited AI Agents", "All Channels + API", "Custom Workflows", "Unlimited conversations", "RAG Engine", "Custom AI Models", "Dedicated CSM"],
  },
]

const INVOICES = [
  { id: "INV-2026-0008", date: "Aug 1, 2026", amount: 8500, status: "paid", period: "Aug 2026" },
  { id: "INV-2026-0007", date: "Jul 1, 2026", amount: 8500, status: "paid", period: "Jul 2026" },
  { id: "INV-2026-0006", date: "Jun 1, 2026", amount: 7200, status: "paid", period: "Jun 2026" },
  { id: "INV-2026-0005", date: "May 1, 2026", amount: 7200, status: "paid", period: "May 2026" },
  { id: "INV-2026-0004", date: "Apr 1, 2026", amount: 4999, status: "paid", period: "Apr 2026" },
]

const USAGE_ITEMS = [
  { label: "AI Conversations", used: 8420, limit: 10000, unit: "conversations" },
  { label: "AI Agents Active", used: 4, limit: 10, unit: "agents" },
  { label: "Team Members", used: 12, limit: 25, unit: "users" },
  { label: "Workflows Active", used: 6, limit: 20, unit: "workflows" },
  { label: "Knowledge Base Articles", used: 45, limit: 500, unit: "articles" },
  { label: "WhatsApp Messages", used: 12400, limit: 50000, unit: "messages" },
]

export default function BillingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly")

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Billing & Revenue</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage your subscription, usage, and invoices.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><RefreshCw className="size-4" />Sync Usage</Button>
          <Button><CreditCard className="size-4" />Update Payment</Button>
        </div>
      </div>

      {/* Current Plan Banner */}
      <Card className="border-primary/30 bg-primary/5">
        <CardContent className="flex flex-wrap items-center justify-between gap-4 p-5">
          <div className="flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Zap className="size-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="font-semibold text-lg">Business Plan</p>
                <Badge className="bg-primary/20 text-primary text-xs">Active</Badge>
              </div>
              <p className="text-sm text-muted-foreground">$999/mo · Renews September 1, 2026</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">Cancel Plan</Button>
            <Button size="sm">Upgrade to Enterprise</Button>
          </div>
        </CardContent>
      </Card>

      {/* MRR Metrics */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: "Current MRR", value: "$999", icon: DollarSign, trend: "+0%" },
          { label: "Next Invoice", value: "$999", icon: Calendar, trend: "Sep 1" },
          { label: "Team Members", value: "12 / 25", icon: Users, trend: "52% used" },
          { label: "Total Paid", value: "$36,400", icon: Receipt, trend: "All time" },
        ].map((m) => (
          <Card key={m.label}>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-xs text-muted-foreground">{m.label}</p>
                <p className="mt-1 text-xl font-semibold">{m.value}</p>
                <p className="text-xs text-muted-foreground">{m.trend}</p>
              </div>
              <m.icon className="size-5 text-muted-foreground" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Usage */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Usage This Billing Period</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {USAGE_ITEMS.map((item) => {
            const pct = Math.round((item.used / item.limit) * 100)
            const color = pct >= 90 ? "bg-red-500" : pct >= 70 ? "bg-yellow-500" : "bg-primary"
            return (
              <div key={item.label} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{item.label}</span>
                  <span className="text-muted-foreground">{item.used.toLocaleString()} / {item.limit.toLocaleString()}</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <div className={`h-full rounded-full ${color} transition-all`} style={{ width: `${Math.min(pct, 100)}%` }} />
                </div>
                <p className="text-xs text-muted-foreground">{pct}% used · {(item.limit - item.used).toLocaleString()} {item.unit} remaining</p>
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* Plan Comparison */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold">Available Plans</h2>
          <div className="flex rounded-lg border border-border overflow-hidden">
            <button onClick={() => setBillingCycle("monthly")} className={`px-3 py-1.5 text-sm font-medium transition-colors ${billingCycle === "monthly" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`}>Monthly</button>
            <button onClick={() => setBillingCycle("annual")} className={`px-3 py-1.5 text-sm font-medium transition-colors ${billingCycle === "annual" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`}>Annual <span className="text-green-500 text-xs ml-1">-20%</span></button>
          </div>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {PLANS.map((plan) => {
            const price = billingCycle === "annual" ? Math.round(plan.price * 0.8) : plan.price
            const isCurrent = plan.name === "Business"
            return (
              <Card key={plan.name} className={`relative border-2 ${plan.color}`}>
                {plan.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2"><Badge className="bg-primary text-primary-foreground">Most Popular</Badge></div>}
                <CardContent className="p-5 space-y-4">
                  <div>
                    <p className="font-semibold text-lg">{plan.name}</p>
                    <p className="text-muted-foreground text-sm">{plan.users}</p>
                  </div>
                  <div>
                    <span className="text-3xl font-bold">${price}</span>
                    <span className="text-muted-foreground text-sm">/mo</span>
                    {billingCycle === "annual" && <p className="text-xs text-green-600 mt-0.5">Billed annually (${price * 12}/yr)</p>}
                  </div>
                  <ul className="space-y-2">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="size-4 shrink-0 text-green-500" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={isCurrent ? "outline" : "default"} disabled={isCurrent}>
                    {isCurrent ? "Current Plan" : plan.name === "Enterprise" ? "Contact Sales" : "Upgrade"}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Invoice History */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-base">Invoice History</CardTitle>
          <Button variant="outline" size="sm"><Download className="size-4" />Export All</Button>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="px-4 py-3 font-medium text-muted-foreground">Invoice ID</th>
                <th className="px-4 py-3 font-medium text-muted-foreground">Period</th>
                <th className="px-4 py-3 font-medium text-muted-foreground">Date</th>
                <th className="px-4 py-3 font-medium text-muted-foreground">Amount</th>
                <th className="px-4 py-3 font-medium text-muted-foreground">Status</th>
                <th className="px-4 py-3 font-medium text-muted-foreground"></th>
              </tr>
            </thead>
            <tbody>
              {INVOICES.map((inv) => (
                <tr key={inv.id} className="border-b border-border hover:bg-muted/40">
                  <td className="px-4 py-3 font-mono text-xs">{inv.id}</td>
                  <td className="px-4 py-3 text-muted-foreground">{inv.period}</td>
                  <td className="px-4 py-3 text-muted-foreground">{inv.date}</td>
                  <td className="px-4 py-3 font-semibold">${inv.amount.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <Badge className="bg-green-100 text-green-700 text-xs">{inv.status}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <button className="flex items-center gap-1 text-xs text-primary hover:underline">
                      <Download className="size-3.5" />PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
