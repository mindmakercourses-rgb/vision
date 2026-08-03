"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { createClient } from "@/lib/supabase/server"
import { ACTIVE_ORG_COOKIE } from "@/lib/orgs"
import type { Role } from "@/lib/types"

type ActionResult = { ok: true; orgId?: string; token?: string } | { ok: false; error: string }

function slugify(input: string) {
  return (
    input
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 40) || "org"
  )
}

export async function createOrganization(name: string): Promise<ActionResult> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { ok: false, error: "You must be signed in." }

  const trimmed = name.trim()
  if (trimmed.length < 2) return { ok: false, error: "Organization name must be at least 2 characters." }

  // Make the slug unique with a short random suffix to avoid collisions.
  const slug = `${slugify(trimmed)}-${Math.random().toString(36).slice(2, 6)}`

  const { data, error } = await supabase.rpc("create_organization", {
    p_name: trimmed,
    p_slug: slug,
  })

  if (error) return { ok: false, error: "Could not create organization. Please try again." }

  const cookieStore = await cookies()
  cookieStore.set(ACTIVE_ORG_COOKIE, data as string, {
    path: "/",
    httpOnly: false,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 365,
  })

  revalidatePath("/app", "layout")
  return { ok: true, orgId: data as string }
}

export async function acceptInvitation(token: string): Promise<ActionResult> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { ok: false, error: "You must be signed in." }

  const clean = token.trim()
  if (!clean) return { ok: false, error: "Enter an invitation code." }

  const { data, error } = await supabase.rpc("accept_invitation", { p_token: clean })
  if (error) return { ok: false, error: "Invitation not found or already used." }

  const cookieStore = await cookies()
  cookieStore.set(ACTIVE_ORG_COOKIE, data as string, {
    path: "/",
    httpOnly: false,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 365,
  })

  revalidatePath("/app", "layout")
  return { ok: true, orgId: data as string }
}

export async function setActiveOrg(orgId: string): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set(ACTIVE_ORG_COOKIE, orgId, {
    path: "/",
    httpOnly: false,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 365,
  })
  revalidatePath("/app", "layout")
}

export async function inviteMember(orgId: string, email: string, role: Role): Promise<ActionResult> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { ok: false, error: "You must be signed in." }

  const clean = email.trim().toLowerCase()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean)) {
    return { ok: false, error: "Enter a valid email address." }
  }

  const { data, error } = await supabase.rpc("create_invitation", {
    p_org: orgId,
    p_email: clean,
    p_role: role,
  })
  if (error) return { ok: false, error: "Could not create invitation. Check your permissions." }

  revalidatePath("/app/settings/members")
  return { ok: true, token: data as string }
}

export async function updateMemberRole(orgId: string, userId: string, role: Role): Promise<ActionResult> {
  const supabase = await createClient()
  const { error } = await supabase
    .from("organization_members")
    .update({ role })
    .eq("org_id", orgId)
    .eq("user_id", userId)

  if (error) return { ok: false, error: "Could not update role. Check your permissions." }
  revalidatePath("/app/settings/members")
  return { ok: true }
}

export async function removeMember(orgId: string, userId: string): Promise<ActionResult> {
  const supabase = await createClient()
  const { error } = await supabase
    .from("organization_members")
    .delete()
    .eq("org_id", orgId)
    .eq("user_id", userId)

  if (error) return { ok: false, error: "Could not remove member. Check your permissions." }
  revalidatePath("/app/settings/members")
  return { ok: true }
}

export async function signOut(): Promise<void> {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath("/", "layout")
}
