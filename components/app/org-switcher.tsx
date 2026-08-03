"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { setActiveOrg } from "@/app/actions/orgs"
import type { OrgWithRole } from "@/lib/types"
import { ROLE_LABELS } from "@/lib/types"
import { Check, ChevronsUpDown, Plus } from "lucide-react"

export function OrgSwitcher({ orgs, active }: { orgs: OrgWithRole[]; active: OrgWithRole }) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()

  function switchOrg(id: string) {
    if (id === active.id) return
    startTransition(async () => {
      await setActiveOrg(id)
      router.refresh()
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="flex w-full items-center gap-2 rounded-md border border-sidebar-border bg-sidebar-accent/40 px-2.5 py-2 text-left transition-colors hover:bg-sidebar-accent disabled:opacity-60"
        disabled={pending}
      >
        <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary text-xs font-semibold text-primary-foreground">
          {active.name.slice(0, 1).toUpperCase()}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{active.name}</p>
          <p className="truncate text-xs text-muted-foreground">{ROLE_LABELS[active.role]}</p>
        </div>
        <ChevronsUpDown className="size-4 shrink-0 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-60">
        <DropdownMenuLabel className="text-xs text-muted-foreground">Workspaces</DropdownMenuLabel>
        {orgs.map((org) => (
          <DropdownMenuItem key={org.id} onSelect={() => switchOrg(org.id)} className="gap-2">
            <div className="flex size-6 items-center justify-center rounded bg-accent text-xs font-semibold text-accent-foreground">
              {org.name.slice(0, 1).toUpperCase()}
            </div>
            <span className="flex-1 truncate">{org.name}</span>
            {org.id === active.id ? <Check className="size-4 text-primary" /> : null}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => router.push("/onboarding")} className="gap-2 text-muted-foreground">
          <Plus className="size-4" />
          New workspace
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
