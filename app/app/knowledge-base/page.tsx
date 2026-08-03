"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  BookOpen, Plus, Search, Upload, FileText, Globe, File,
  CheckCircle2, Clock, AlertCircle, Bot, Sparkles, BarChart3,
  Folder, Tag, Eye, Edit, Trash2, MoreHorizontal, TrendingUp,
  Database,
} from "lucide-react"

const ARTICLES = [
  { id: "1", title: "Vision CRM Pricing Guide 2026", category: "Sales", status: "approved", type: "doc", views: 324, aiUsage: 87, updatedAt: "2d ago", author: "Sara M." },
  { id: "2", title: "Product Features & Capabilities Overview", category: "Sales", status: "approved", type: "doc", views: 512, aiUsage: 234, updatedAt: "1w ago", author: "AI Assistant" },
  { id: "3", title: "Customer Onboarding SOP", category: "Support", status: "approved", type: "sop", views: 198, aiUsage: 145, updatedAt: "3d ago", author: "Omar K." },
  { id: "4", title: "Refund & Cancellation Policy", category: "Billing", status: "approved", type: "policy", views: 89, aiUsage: 63, updatedAt: "2w ago", author: "Admin" },
  { id: "5", title: "WhatsApp Integration Setup Guide", category: "Technical", status: "review", type: "guide", views: 45, aiUsage: 12, updatedAt: "5h ago", author: "Karim H." },
  { id: "6", title: "Q3 2026 Product Roadmap", category: "Product", status: "draft", type: "doc", views: 0, aiUsage: 0, updatedAt: "1h ago", author: "Sara M." },
  { id: "7", title: "Common Objection Handling Scripts", category: "Sales", status: "approved", type: "script", views: 276, aiUsage: 192, updatedAt: "5d ago", author: "AI Assistant" },
]

const STATUS_STYLES: Record<string, { badge: string; icon: React.ReactNode }> = {
  approved: { badge: "bg-green-100 text-green-700", icon: <CheckCircle2 className="size-3.5 text-green-500" /> },
  review: { badge: "bg-yellow-100 text-yellow-700", icon: <Clock className="size-3.5 text-yellow-500" /> },
  draft: { badge: "bg-gray-100 text-gray-600", icon: <AlertCircle className="size-3.5 text-gray-400" /> },
  expired: { badge: "bg-red-100 text-red-700", icon: <AlertCircle className="size-3.5 text-red-500" /> },
}

const TYPE_ICONS: Record<string, React.ReactNode> = {
  doc: <FileText className="size-4 text-blue-500" />,
  sop: <File className="size-4 text-purple-500" />,
  policy: <CheckCircle2 className="size-4 text-green-500" />,
  guide: <Globe className="size-4 text-orange-500" />,
  script: <Sparkles className="size-4 text-primary" />,
}

const CATEGORIES = ["All", "Sales", "Support", "Billing", "Technical", "Product", "HR"]

export default function KnowledgeBasePage() {
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")

  const filtered = ARTICLES.filter((a) => {
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase())
    const matchCat = activeCategory === "All" || a.category === activeCategory
    return matchSearch && matchCat
  })

  const stats = [
    { label: "Total Articles", value: ARTICLES.length, icon: BookOpen },
    { label: "Approved", value: ARTICLES.filter((a) => a.status === "approved").length, icon: CheckCircle2 },
    { label: "AI Retrievals", value: "1,247", icon: Bot },
    { label: "Search Success", value: "92%", icon: TrendingUp },
  ]

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Knowledge Base & RAG Engine</h1>
          <p className="mt-1 text-sm text-muted-foreground">Centralized knowledge powering every AI response in Vision CRM.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Upload className="size-4" />Import</Button>
          <Button variant="outline" size="sm"><Bot className="size-4" />AI Generate</Button>
          <Button><Plus className="size-4" />New Article</Button>
        </div>
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

      {/* RAG Pipeline Status */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="flex items-center gap-6 p-4 overflow-x-auto">
          <div className="flex items-center gap-2 shrink-0">
            <Database className="size-5 text-primary" />
            <span className="font-semibold text-sm">RAG Pipeline</span>
            <Badge className="bg-green-100 text-green-700 text-xs">Active</Badge>
          </div>
          {["Query Received", "Knowledge Retrieved", "Context Ranked", "Permissions Filtered", "AI Response Generated", "Sources Returned"].map((step, i) => (
            <div key={step} className="flex items-center gap-2 shrink-0">
              {i > 0 && <div className="h-px w-6 bg-primary/30" />}
              <div className="flex items-center gap-1.5">
                <div className="size-2 rounded-full bg-green-500" />
                <span className="text-xs text-muted-foreground">{step}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Search + filter */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-border bg-card px-3">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <Input placeholder="Search knowledge base..." value={search} onChange={(e) => setSearch(e.target.value)} className="border-0 bg-transparent px-0 focus-visible:ring-0" />
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

      <div className="grid gap-4 lg:grid-cols-4">
        {/* Folder Tree */}
        <Card className="hidden lg:block lg:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Collections</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 p-3">
            {["All Knowledge", "Sales", "Support", "Billing", "Technical", "Product", "HR", "Legal"].map((folder, i) => (
              <button key={folder} className={`flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-sm transition-colors ${i === 0 ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}>
                <Folder className="size-4 shrink-0" />
                <span className="truncate">{folder}</span>
                {i === 0 && <Badge variant="outline" className="ml-auto text-xs">{ARTICLES.length}</Badge>}
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Article List */}
        <Card className="lg:col-span-3">
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="px-4 py-3 font-medium text-muted-foreground">Article</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground hidden sm:table-cell">Category</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">Status</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">AI Usage</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground hidden lg:table-cell">Updated</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((article) => {
                  const statusStyle = STATUS_STYLES[article.status]
                  return (
                    <tr key={article.id} className="border-b border-border hover:bg-muted/40 cursor-pointer transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          {TYPE_ICONS[article.type] ?? <FileText className="size-4 text-muted-foreground" />}
                          <div>
                            <p className="font-medium text-sm">{article.title}</p>
                            <p className="text-xs text-muted-foreground">{article.author} · {article.views} views</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <Badge variant="outline" className="text-xs">{article.category}</Badge>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          {statusStyle.icon}
                          <Badge className={`text-xs ${statusStyle.badge}`}>{article.status}</Badge>
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Bot className="size-3.5 text-primary" />
                          {article.aiUsage} retrievals
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell text-xs text-muted-foreground">{article.updatedAt}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          <button className="rounded p-1 hover:bg-muted"><Eye className="size-3.5 text-muted-foreground" /></button>
                          <button className="rounded p-1 hover:bg-muted"><Edit className="size-3.5 text-muted-foreground" /></button>
                          <button className="rounded p-1 hover:bg-muted"><MoreHorizontal className="size-3.5 text-muted-foreground" /></button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
