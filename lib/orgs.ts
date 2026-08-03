import "server-only"
import { cookies } from "next/headers"
import { createClient } from "@/lib/supabase/server"
import type { OrgWithRole, Role } from "@/lib/types"

const ACTIVE_ORG_COOKIE = "vision_active_org"

/** Returns the current authenticated user or null. */
export async function getCurrentUser() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}

/** Returns all organizations the current user belongs to, with their role. */
export async function getUserOrgs(): Promise<OrgWithRole[]> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return []

  const { data, error } = await supabase
    .from("organization_members")
    .select("role, organizations(id, name, slug, created_by, created_at, updated_at)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: true })

  if (error || !data) return []

  return data
    .filter((row) => row.organizations)
    .map((row) => {
      const org = row.organizations as unknown as Omit<OrgWithRole, "role">
      return { ...org, role: row.role as Role }
    })
}

/**
 * Resolves the active organization for the current request.
 * Uses the active-org cookie when valid, otherwise falls back to the first org.
 */
export async function getActiveOrg(): Promise<{ orgs: OrgWithRole[]; active: OrgWithRole | null }> {
  const orgs = await getUserOrgs()
  if (orgs.length === 0) return { orgs, active: null }

  const cookieStore = await cookies()
  const activeId = cookieStore.get(ACTIVE_ORG_COOKIE)?.value
  const active = orgs.find((o) => o.id === activeId) ?? orgs[0]
  return { orgs, active }
}

export { ACTIVE_ORG_COOKIE }
