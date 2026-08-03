'use client'

import { createContext, useContext, ReactNode } from 'react'
import { Organization } from '@/lib/types'

interface AppContextType {
  org: Organization | null
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppContextProvider({ children, org }: { children: ReactNode; org: Organization | null }) {
  return <AppContext.Provider value={{ org }}>{children}</AppContext.Provider>
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within AppContextProvider')
  }
  return context
}
