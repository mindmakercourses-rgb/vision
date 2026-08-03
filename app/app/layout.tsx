import type { ReactNode } from "react"
import { redirect } from "next/navigation"
import { getActiveOrg, getCurrentUser } from "@/lib/orgs"
import { createClient } from "@/lib/supabase/server"
import { VisionLogo } from "@/components/vision-logo"
import { SidebarNav } from "@/components/app/sidebar-nav"
import { OrgSwitcher } from "@/components/app/org-switcher"
import { UserMenu } from "@/components/app/user-menu"

export default async function AppLayout({ children }: { children: ReactNode }) {
  const user = await getCurrentUser()
  if (!user) redirect("/auth/login")

  const { orgs, active } = await getActiveOrg()
  if (!active) redirect("/onboarding")

  const supabase = await createClient()
  const { data: profile } = await supabase.from("profiles").select("full_name").eq("id", user.id).single()

  const fullName = profile?.full_name ?? ""
  const email = user.email ?? ""

  return (
    <div className="flex min-h-svh bg-background">
      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar md:flex">
        <div className="flex h-14 items-center border-b border-sidebar-border px-4">
          <VisionLogo />
        </div>
        <div className="p-3">
          <OrgSwitcher orgs={orgs} active={active} />
        </div>
        <SidebarNav />
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-border px-4 lg:px-6">
          <div className="flex items-center gap-3 md:hidden">
            <VisionLogo />
          </div>
          <div className="hidden md:block">
            <p className="text-sm text-muted-foreground">
              {active.name} <span className="text-muted-foreground/50">/ Dashboard</span>
            </p>
          </div>
          <UserMenu name={fullName} email={email} />
        </header>
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
