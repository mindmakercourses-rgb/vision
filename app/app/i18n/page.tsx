"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Globe,
  Languages,
  Search,
  CheckCircle2,
  AlertTriangle,
  Upload,
  Download,
  RefreshCw,
  Eye,
  Type,
  AlignLeft,
  AlignRight,
  Calendar,
  DollarSign,
  Hash,
  Settings2,
} from "lucide-react"

const LANGUAGES = [
  { code: "en", name: "English", native: "English", dir: "ltr", flag: "🇺🇸", coverage: 100, status: "live" },
  { code: "ar", name: "Arabic", native: "العربية", dir: "rtl", flag: "🇸🇦", coverage: 96, status: "live" },
]

const NAMESPACES = [
  { name: "common", keys: 248, translated_en: 248, translated_ar: 241, missing_ar: 7 },
  { name: "crm", keys: 312, translated_en: 312, translated_ar: 308, missing_ar: 4 },
  { name: "communication", keys: 186, translated_en: 186, translated_ar: 186, missing_ar: 0 },
  { name: "ai", keys: 204, translated_en: 204, translated_ar: 199, missing_ar: 5 },
  { name: "analytics", keys: 143, translated_en: 143, translated_ar: 142, missing_ar: 1 },
  { name: "billing", keys: 98, translated_en: 98, translated_ar: 96, missing_ar: 2 },
  { name: "admin", keys: 167, translated_en: 167, translated_ar: 165, missing_ar: 2 },
  { name: "automation", keys: 122, translated_en: 122, translated_ar: 118, missing_ar: 4 },
]

const SAMPLE_TRANSLATIONS: Record<string, { en: string; ar: string }> = {
  "customer": { en: "Customer", ar: "العميل" },
  "lead": { en: "Lead", ar: "عميل محتمل" },
  "opportunity": { en: "Opportunity", ar: "فرصة بيع" },
  "deal": { en: "Deal", ar: "صفقة" },
  "pipeline": { en: "Pipeline", ar: "مسار المبيعات" },
  "workflow": { en: "Workflow", ar: "سير العمل" },
  "dashboard": { en: "Dashboard", ar: "لوحة التحكم" },
  "settings": { en: "Settings", ar: "الإعدادات" },
  "knowledge_base": { en: "Knowledge Base", ar: "قاعدة المعرفة" },
  "automation": { en: "Automation", ar: "الأتمتة" },
  "reports": { en: "Reports", ar: "التقارير" },
  "analytics": { en: "Analytics", ar: "التحليلات" },
}

const RTL_ADAPTATIONS = [
  { element: "Sidebar", ltr: "Left side", rtl: "Right side" },
  { element: "Text Alignment", ltr: "Left-aligned", rtl: "Right-aligned" },
  { element: "Breadcrumbs", ltr: "Left to right", rtl: "Right to left" },
  { element: "Back Arrow", ltr: "← Points left", rtl: "→ Points right" },
  { element: "Form Fields", ltr: "Labels left", rtl: "Labels right" },
  { element: "Table Columns", ltr: "First col left", rtl: "First col right" },
  { element: "Notifications", ltr: "Slide from right", rtl: "Slide from left" },
  { element: "Dropdown Menus", ltr: "Expand right", rtl: "Expand left" },
]

export default function I18nPage() {
  const [activeLang, setActiveLang] = useState<"en" | "ar">("ar")
  const [searchKey, setSearchKey] = useState("")
  const [activeTab, setActiveTab] = useState<"overview" | "translations" | "rtl" | "formats">("overview")

  const filteredKeys = Object.entries(SAMPLE_TRANSLATIONS).filter(
    ([k]) => k.toLowerCase().includes(searchKey.toLowerCase())
  )

  const totalKeys = NAMESPACES.reduce((s, n) => s + n.keys, 0)
  const totalMissing = NAMESPACES.reduce((s, n) => s + n.missing_ar, 0)
  const coverage = Math.round(((totalKeys - totalMissing) / totalKeys) * 100)

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Internationalization & Language Engine</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage translations, RTL/LTR layouts, locale formats, and multilingual AI responses.
          </p>
        </div>
        <div className="flex gap-2">
          <div className="flex rounded-lg border border-border overflow-hidden">
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                onClick={() => setActiveLang(l.code as "en" | "ar")}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${activeLang === l.code ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`}
              >
                <Globe className="size-4" />
                <span>{l.native}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: "Total Keys", value: totalKeys.toLocaleString(), icon: Hash },
          { label: "Languages", value: LANGUAGES.length, icon: Languages },
          { label: "AR Coverage", value: `${coverage}%`, icon: CheckCircle2 },
          { label: "Missing (AR)", value: totalMissing, icon: AlertTriangle },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="mt-1 text-2xl font-semibold tabular-nums">{s.value}</p>
              </div>
              <s.icon className="size-5 text-muted-foreground" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 rounded-lg border border-border bg-muted/40 p-1 w-fit">
        {(["overview", "translations", "rtl", "formats"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-md px-4 py-1.5 text-sm font-medium capitalize transition-colors ${activeTab === tab ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
          >
            {tab === "rtl" ? "RTL / LTR Engine" : tab === "formats" ? "Locale Formats" : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold">Translation Namespaces</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="h-7 gap-1 text-xs"><Upload className="size-3.5" />Import</Button>
                    <Button variant="outline" size="sm" className="h-7 gap-1 text-xs"><Download className="size-3.5" />Export</Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {NAMESPACES.map((ns) => {
                  const pct = Math.round(((ns.keys - ns.missing_ar) / ns.keys) * 100)
                  return (
                    <div key={ns.name} className="rounded-lg border border-border p-3">
                      <div className="flex items-center justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-semibold text-primary">{ns.name}</span>
                          <span className="text-xs text-muted-foreground">{ns.keys} keys</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {ns.missing_ar > 0
                            ? <Badge className="bg-yellow-100 text-yellow-700 border-0 text-xs">{ns.missing_ar} missing AR</Badge>
                            : <Badge className="bg-green-100 text-green-700 border-0 text-xs">Complete</Badge>
                          }
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 flex-1 rounded-full bg-muted overflow-hidden">
                          <div className={`h-full rounded-full transition-all ${pct === 100 ? "bg-green-500" : "bg-primary"}`} style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-xs font-medium tabular-nums w-8 text-right">{pct}%</span>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </div>

          {/* Language cards */}
          <div className="space-y-4">
            {LANGUAGES.map((lang) => (
              <Card key={lang.code}>
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-2xl">{lang.flag}</div>
                      <div>
                        <p className="font-semibold">{lang.native}</p>
                        <p className="text-xs text-muted-foreground">{lang.name} · {lang.dir.toUpperCase()}</p>
                      </div>
                    </div>
                    <Badge className={lang.status === "live" ? "bg-green-100 text-green-700 border-0" : "bg-yellow-100 text-yellow-700 border-0"}>{lang.status}</Badge>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Coverage</span>
                      <span className="font-medium">{lang.coverage}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full rounded-full bg-green-500" style={{ width: `${lang.coverage}%` }} />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    {lang.dir === "rtl" ? <AlignRight className="size-3.5" /> : <AlignLeft className="size-3.5" />}
                    <span>Text direction: {lang.dir.toUpperCase()}</span>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Card>
              <CardContent className="p-4 space-y-3">
                <p className="text-sm font-semibold">Font Configuration</p>
                {[
                  { lang: "English", font: "Geist / Inter", preview: "The quick brown fox" },
                  { lang: "Arabic", font: "IBM Plex Sans Arabic", preview: "منصة إدارة العملاء" },
                ].map((f) => (
                  <div key={f.lang} className="rounded-lg bg-muted/40 p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium">{f.lang}</span>
                      <span className="font-mono text-[10px] text-muted-foreground">{f.font}</span>
                    </div>
                    <p className="text-sm" dir={f.lang === "Arabic" ? "rtl" : "ltr"}>{f.preview}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeTab === "translations" && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex flex-1 items-center gap-2 rounded-lg border border-border bg-card px-3">
              <Search className="size-4 text-muted-foreground shrink-0" />
              <Input placeholder="Search translation keys..." value={searchKey} onChange={(e) => setSearchKey(e.target.value)} className="border-0 bg-transparent px-0 focus-visible:ring-0" />
            </div>
            <Button variant="outline" size="sm"><RefreshCw className="size-4" />Sync</Button>
          </div>
          <Card>
            <CardContent className="p-0">
              <div className="grid grid-cols-3 border-b border-border px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                <span>Key</span><span>English</span><span>العربية</span>
              </div>
              {filteredKeys.map(([key, val]) => (
                <div key={key} className="grid grid-cols-3 items-center border-b border-border px-4 py-3 last:border-0 hover:bg-muted/20 transition-colors">
                  <span className="font-mono text-xs text-primary">{key}</span>
                  <span className="text-sm">{val.en}</span>
                  <span className="text-sm" dir="rtl">{val.ar}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "rtl" && (
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">RTL / LTR Adaptation Matrix</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {RTL_ADAPTATIONS.map((a) => (
                <div key={a.element} className="grid grid-cols-3 gap-3 rounded-lg border border-border p-3 text-sm">
                  <span className="font-medium text-xs">{a.element}</span>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><AlignLeft className="size-3.5 shrink-0" />{a.ltr}</div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><AlignRight className="size-3.5 shrink-0" />{a.rtl}</div>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">Live Preview</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {(["ltr", "rtl"] as const).map((dir) => (
                <div key={dir} className="rounded-xl border border-border p-4" dir={dir}>
                  <div className={`flex items-center justify-between mb-3`}>
                    <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{dir.toUpperCase()} Layout</span>
                    <Badge variant="outline" className="text-[10px]">{dir === "ltr" ? "English" : "Arabic"}</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 rounded-md bg-muted/40 p-2">
                      <div className="size-6 rounded bg-primary/20" />
                      <span className="text-sm">{dir === "ltr" ? "Customer Name" : "اسم العميل"}</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-md bg-muted/40 p-2">
                      <div className="size-6 rounded bg-green-500/20" />
                      <span className="text-sm">{dir === "ltr" ? "Deal Pipeline" : "مسار الصفقات"}</span>
                    </div>
                    <div className={`flex items-center gap-2 text-xs text-muted-foreground`}>
                      <Type className="size-3.5 shrink-0" />
                      {dir === "ltr" ? "IBM Plex Sans (LTR)" : "IBM Plex Sans Arabic (RTL)"}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "formats" && (
        <div className="grid gap-4 lg:grid-cols-2">
          {[
            {
              title: "Date & Time Formats",
              icon: Calendar,
              rows: [
                ["English Date", "August 3, 2026"],
                ["Arabic Date", "٣ أغسطس ٢٠٢٦"],
                ["English Time", "2:30 PM"],
                ["Arabic Time", "٢:٣٠ م"],
                ["Week Start (EN)", "Sunday"],
                ["Week Start (AR)", "الأحد"],
              ],
            },
            {
              title: "Number & Currency Formats",
              icon: DollarSign,
              rows: [
                ["English Number", "1,234,567.89"],
                ["Arabic Number", "١٬٢٣٤٬٥٦٧٫٨٩"],
                ["USD Currency", "$1,234.56"],
                ["SAR Currency", "١٬٢٣٤٫٥٦ ر.س"],
                ["EGP Currency", "١٬٢٣٤٫٥٦ ج.م"],
                ["AED Currency", "١٬٢٣٤٫٥٦ د.إ"],
              ],
            },
          ].map((section) => (
            <Card key={section.title}>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                  <section.icon className="size-4 text-muted-foreground" />
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {section.rows.map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between rounded-lg bg-muted/40 px-3 py-2.5 text-sm">
                    <span className="text-muted-foreground text-xs">{label}</span>
                    <span className="font-mono text-xs font-semibold">{value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
          <Card className="lg:col-span-2">
            <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold flex items-center gap-2"><Settings2 className="size-4" />Admin Language Center</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {["Edit Translations", "Import Translation File", "Export Translation File", "Find Missing Keys", "Version History", "Quality Audit", "Approve Translations", "Sync AI Responses"].map((action) => (
                  <Button key={action} variant="outline" size="sm" className="h-auto py-3 flex-col gap-1 text-xs text-muted-foreground">
                    <Eye className="size-4" />
                    {action}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
