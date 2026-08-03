'use client'

import { useCallback, useOptimistic, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import useSWR from 'swr'
import { createClient } from '@/lib/supabase/client'
import { Contact } from '@/lib/types'

const fetcher = async (key: string) => {
  const [, orgId, search, status] = key.split('|')
  const supabase = createClient()
  
  const { data, error } = await supabase.rpc('list_org_contacts', {
    p_org: orgId,
    p_search: search || null,
    p_status: status || null,
    p_limit: 100,
    p_offset: 0,
  })

  if (error) throw error
  return data || []
}

export function useContacts(orgId: string) {
  const searchParams = useSearchParams()
  const search = searchParams.get('search') || ''
  const status = searchParams.get('status') || ''

  const key = `contacts|${orgId}|${search}|${status}`
  const { data = [], isLoading, mutate } = useSWR(key, fetcher)

  return {
    contacts: data as Contact[],
    isLoading,
    mutate,
    isEmpty: data.length === 0,
  }
}
