import { Metadata } from 'next'
import { ContactsTable } from '@/components/app/contacts-table'

export const metadata: Metadata = {
  title: 'Contacts | Vision CRM',
  description: 'Manage your customer relationships. Add, edit, and organize all your contacts in one place.',
}

export default function ContactsPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Contacts</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Manage all your customer relationships. Search, filter, and take action quickly.
        </p>
      </div>
      <ContactsTable />
    </div>
  )
}
