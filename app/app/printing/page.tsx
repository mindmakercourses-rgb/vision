"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Printer,
  FileText,
  Download,
  Eye,
  Wifi,
  WifiOff,
  Settings2,
  RotateCcw,
  QrCode,
  Receipt,
  Tag,
  Award,
  BarChart3,
  FileSpreadsheet,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Bot,
  Usb,
  Bluetooth,
  Network,
} from "lucide-react"

const PRINTERS = [
  { id: "1", name: "HP LaserJet Pro 400", type: "Laser", status: "online", default: true, color: true, duplex: true, paperSize: "A4", location: "Main Office" },
  { id: "2", name: "Epson TM-T88VI", type: "Receipt / Thermal", status: "online", default: false, color: false, duplex: false, paperSize: "80mm", location: "Reception" },
  { id: "3", name: "Zebra ZD421", type: "Label / Barcode", status: "online", default: false, color: false, duplex: false, paperSize: "Label", location: "Warehouse" },
  { id: "4", name: "Brother HL-L8360CDW", type: "Color Laser", status: "offline", default: false, color: true, duplex: true, paperSize: "A4", location: "Meeting Room" },
  { id: "5", name: "Microsoft Print to PDF", type: "Virtual PDF", status: "online", default: false, color: true, duplex: false, paperSize: "A4", location: "Virtual" },
]

const DOCUMENT_TYPES = [
  { id: "invoice", label: "Invoice", icon: FileText, color: "bg-blue-500" },
  { id: "quote", label: "Quotation", icon: FileSpreadsheet, color: "bg-teal-500" },
  { id: "contract", label: "Contract", icon: Award, color: "bg-purple-500" },
  { id: "receipt", label: "Receipt", icon: Receipt, color: "bg-green-500" },
  { id: "report", label: "Report", icon: BarChart3, color: "bg-orange-500" },
  { id: "label", label: "Label", icon: Tag, color: "bg-yellow-500" },
  { id: "certificate", label: "Certificate", icon: Award, color: "bg-pink-500" },
  { id: "qr", label: "QR / Barcode", icon: QrCode, color: "bg-indigo-500" },
]

const PRINT_HISTORY = [
  { doc: "Invoice #INV-2024-0041", user: "Ahmad Hassan", printer: "HP LaserJet Pro 400", time: "2m ago", status: "success", copies: 2 },
  { doc: "Sales Report — August 2024", user: "Sara Mohamed", printer: "Microsoft Print to PDF", time: "15m ago", status: "success", copies: 1 },
  { doc: "Customer Label — TechCorp", user: "Omar Khalil", printer: "Zebra ZD421", time: "1h ago", status: "success", copies: 10 },
  { doc: "Contract — Smart Buildings Co", user: "Ahmad Hassan", printer: "HP LaserJet Pro 400", time: "2h ago", status: "error", copies: 1 },
  { doc: "Receipt #RCP-0219", user: "Layla Nasser", printer: "Epson TM-T88VI", time: "3h ago", status: "success", copies: 1 },
]

const EXPORT_FORMATS = ["PDF", "Excel", "Word", "CSV", "PowerPoint", "Image"]

const PRINTER_TYPE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  "Laser": Printer,
  "Receipt / Thermal": Receipt,
  "Label / Barcode": Tag,
  "Color Laser": Printer,
  "Virtual PDF": FileText,
}

const CONN_ICONS = [
  { icon: Usb, label: "USB" },
  { icon: Network, label: "Network" },
  { icon: Wifi, label: "WiFi" },
  { icon: Bluetooth, label: "Bluetooth" },
]

export default function PrintingPage() {
  const [selectedPrinter, setSelectedPrinter] = useState("1")
  const [copies, setCopies] = useState(1)
  const [orientation, setOrientation] = useState<"portrait" | "landscape">("portrait")
  const [colorMode, setColorMode] = useState<"color" | "bw">("color")
  const [duplex, setDuplex] = useState(false)
  const [activeTab, setActiveTab] = useState<"print" | "history" | "agent">("print")

  const printer = PRINTERS.find((p) => p.id === selectedPrinter)!

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Enterprise Printing Center</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Print documents, reports, labels, receipts, and certificates across all connected printers.
          </p>
        </div>
        <div className="flex gap-2">
          <Badge className="gap-1.5 bg-green-100 text-green-700">
            <span className="size-1.5 rounded-full bg-green-500 inline-block animate-pulse" />
            Vision Print Agent Connected
          </Badge>
          <Button variant="outline" size="sm"><Settings2 className="size-4" />Print Agent</Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 rounded-lg border border-border bg-muted/40 p-1 w-fit">
        {(["print", "history", "agent"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-md px-4 py-1.5 text-sm font-medium capitalize transition-colors ${activeTab === tab ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
          >
            {tab === "agent" ? "Print Agent" : tab === "history" ? "Print History" : "Print Center"}
          </button>
        ))}
      </div>

      {activeTab === "print" && (
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left: Document type + settings */}
          <div className="space-y-4 lg:col-span-2">
            {/* Document Types */}
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">Select Document Type</CardTitle></CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-3 sm:grid-cols-4 lg:grid-cols-8">
                  {DOCUMENT_TYPES.map((dt) => (
                    <button key={dt.id} className="flex flex-col items-center gap-2 rounded-xl border border-border p-3 text-center text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-foreground">
                      <div className={`flex size-9 items-center justify-center rounded-lg ${dt.color}`}>
                        <dt.icon className="size-5 text-white" />
                      </div>
                      <span className="leading-tight">{dt.label}</span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Print Options */}
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">Print Options</CardTitle></CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Copies</label>
                  <Input type="number" min={1} max={999} value={copies} onChange={(e) => setCopies(Number(e.target.value))} className="h-8 text-sm" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Orientation</label>
                  <div className="flex gap-1">
                    {(["portrait", "landscape"] as const).map((o) => (
                      <button key={o} onClick={() => setOrientation(o)} className={`flex-1 rounded-md border py-1.5 text-xs font-medium capitalize transition-colors ${orientation === o ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:bg-muted"}`}>{o}</button>
                    ))}
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Color Mode</label>
                  <div className="flex gap-1">
                    {(["color", "bw"] as const).map((c) => (
                      <button key={c} onClick={() => setColorMode(c)} className={`flex-1 rounded-md border py-1.5 text-xs font-medium capitalize transition-colors ${colorMode === c ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:bg-muted"}`}>{c === "bw" ? "B&W" : "Color"}</button>
                    ))}
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Paper Size</label>
                  <div className="flex flex-wrap gap-1">
                    {["A4", "A3", "Letter", "Custom"].map((s) => (
                      <button key={s} className="rounded-md border border-border px-2.5 py-1 text-xs text-muted-foreground hover:border-primary/40 hover:bg-primary/5">{s}</button>
                    ))}
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Duplex</label>
                  <button onClick={() => setDuplex(!duplex)} className={`flex w-full items-center justify-between rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${duplex ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:bg-muted"}`}>
                    Double-sided printing
                    <span className={`size-4 rounded border text-xs flex items-center justify-center ${duplex ? "bg-primary text-white border-primary" : "border-border"}`}>{duplex ? "✓" : ""}</span>
                  </button>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Quality</label>
                  <div className="flex gap-1">
                    {["Draft", "Normal", "High"].map((q) => (
                      <button key={q} className={`flex-1 rounded-md border py-1.5 text-xs font-medium transition-colors ${q === "Normal" ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:bg-muted"}`}>{q}</button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Export before Print */}
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">Export Before Print</CardTitle></CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {EXPORT_FORMATS.map((f) => (
                    <Button key={f} variant="outline" size="sm" className="gap-1.5">
                      <Download className="size-3.5" />{f}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action buttons */}
            <div className="flex gap-3">
              <Button variant="outline" className="gap-2"><Eye className="size-4" />Print Preview</Button>
              <Button className="gap-2 flex-1"><Printer className="size-4" />Print Now</Button>
            </div>
          </div>

          {/* Right: Printer list */}
          <div className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-semibold">Available Printers</CardTitle>
                <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs"><RotateCcw className="size-3.5" />Refresh</Button>
              </CardHeader>
              <CardContent className="space-y-2">
                {PRINTERS.map((p) => {
                  const Icon = PRINTER_TYPE_ICONS[p.type] ?? Printer
                  return (
                    <button
                      key={p.id}
                      onClick={() => setSelectedPrinter(p.id)}
                      className={`w-full rounded-lg border p-3 text-left transition-colors ${selectedPrinter === p.id ? "border-primary bg-primary/5" : "border-border hover:bg-muted/40"}`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <div className={`flex size-8 items-center justify-center rounded-md ${p.status === "online" ? "bg-green-100 text-green-600" : "bg-muted text-muted-foreground"}`}>
                            <Icon className="size-4" />
                          </div>
                          <div>
                            <p className="text-xs font-semibold leading-tight flex items-center gap-1.5">
                              {p.name}
                              {p.default && <Badge className="h-4 px-1 text-[10px] bg-primary/10 text-primary border-0">Default</Badge>}
                            </p>
                            <p className="text-xs text-muted-foreground">{p.type} · {p.location}</p>
                          </div>
                        </div>
                        {p.status === "online"
                          ? <Wifi className="size-4 text-green-500 shrink-0 mt-0.5" />
                          : <WifiOff className="size-4 text-muted-foreground shrink-0 mt-0.5" />
                        }
                      </div>
                      <div className="mt-2 flex gap-1.5 flex-wrap">
                        {p.color && <span className="rounded border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground">Color</span>}
                        {p.duplex && <span className="rounded border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground">Duplex</span>}
                        <span className="rounded border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground">{p.paperSize}</span>
                      </div>
                    </button>
                  )
                })}
              </CardContent>
            </Card>

            {/* Connection types */}
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">Supported Connections</CardTitle></CardHeader>
              <CardContent className="grid grid-cols-2 gap-2">
                {CONN_ICONS.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2 rounded-lg border border-border p-2.5 text-xs text-muted-foreground">
                    <Icon className="size-4 text-primary" />{label}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeTab === "history" && (
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">Print History</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-2">
              {PRINT_HISTORY.map((h, i) => (
                <div key={i} className="flex items-center gap-3 rounded-lg border border-border px-4 py-3">
                  <div className={`flex size-7 shrink-0 items-center justify-center rounded-md ${h.status === "success" ? "bg-green-100" : "bg-red-100"}`}>
                    {h.status === "success"
                      ? <CheckCircle2 className="size-4 text-green-600" />
                      : <AlertTriangle className="size-4 text-red-500" />
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{h.doc}</p>
                    <p className="text-xs text-muted-foreground">{h.user} · {h.printer}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs font-medium">{h.copies} {h.copies === 1 ? "copy" : "copies"}</p>
                    <p className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="size-3" />{h.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "agent" && (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold flex items-center gap-2"><Bot className="size-4" />Vision Print Agent</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-xl border border-green-300 bg-green-50 dark:bg-green-950/20 dark:border-green-800 p-4 text-sm">
                <div className="flex items-center gap-2 font-semibold text-green-700 dark:text-green-400">
                  <span className="size-2 rounded-full bg-green-500 animate-pulse inline-block" />
                  Agent Online — v2.4.1
                </div>
                <p className="mt-1 text-xs text-green-600 dark:text-green-500">Connected via Secure WebSocket · Tenant validated · All printers reporting</p>
              </div>
              {[
                { label: "Platform", value: "Windows 11 Pro" },
                { label: "Printers Detected", value: "5 printers" },
                { label: "Online Printers", value: "4 / 5" },
                { label: "Print Queue", value: "0 pending" },
                { label: "Connection", value: "HTTPS + WSS (Encrypted)" },
                { label: "Last Sync", value: "Just now" },
              ].map((r) => (
                <div key={r.label} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{r.label}</span>
                  <span className="font-medium">{r.value}</span>
                </div>
              ))}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">Download Agent</Button>
                <Button size="sm" className="flex-1">Reconfigure</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">AI Print Assistant</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">The AI assistant automatically optimizes your print jobs for readability, layout, and paper efficiency.</p>
              {[
                { tip: "Use A4 landscape for this report to fit all table columns on one page.", action: "Apply" },
                { tip: "Reduce font size from 12pt to 10pt to save 2 pages.", action: "Apply" },
                { tip: "Enable duplex printing to reduce paper usage by 50%.", action: "Apply" },
                { tip: "Switch to draft mode — this document does not require high quality.", action: "Apply" },
              ].map((s, i) => (
                <div key={i} className="flex items-start justify-between gap-3 rounded-lg bg-muted/40 p-3 text-sm">
                  <p className="text-muted-foreground leading-snug">{s.tip}</p>
                  <Button variant="outline" size="sm" className="shrink-0 h-7 text-xs">{s.action}</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
