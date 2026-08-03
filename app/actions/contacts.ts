'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { Contact } from '@/lib/types'

type ActionResult = { ok: true; data?: Contact } | { ok: false; error: string }

export async function createContact(orgId: string, contact: Partial<Contact>): Promise<ActionResult> {
  const supabase = await createClient()
  const user = await supabase.auth.getUser()

  if (!user.data.user) {
    return { ok: false, error: 'Not authenticated' }
  }

  const { data, error } = await supabase.from('contacts').insert({
    org_id: orgId,
    first_name: contact.first_name,
    last_name: contact.last_name,
    email: contact.email,
    phone: contact.phone,
    status: contact.status || 'prospect',
    lifecycle_stage: contact.lifecycle_stage || 'lead',
    owner_id: user.data.user.id,
  }).select().single()

  if (error) return { ok: false, error: error.message }

  revalidatePath('/app/contacts')
  return { ok: true, data }
}

export async function updateContact(contactId: string, updates: Partial<Contact>): Promise<ActionResult> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('contacts')
    .update({
      first_name: updates.first_name,
      last_name: updates.last_name,
      email: updates.email,
      phone: updates.phone,
      status: updates.status,
      lifecycle_stage: updates.lifecycle_stage,
      notes: updates.notes,
      updated_at: new Date().toISOString(),
    })
    .eq('id', contactId)
    .select()
    .single()

  if (error) return { ok: false, error: error.message }

  revalidatePath('/app/contacts')
  return { ok: true, data }
}

export async function deleteContact(contactId: string): Promise<ActionResult> {
  const supabase = await createClient()

  const { error } = await supabase.from('contacts').delete().eq('id', contactId)

  if (error) return { ok: false, error: error.message }

  revalidatePath('/app/contacts')
  return { ok: true }
}
