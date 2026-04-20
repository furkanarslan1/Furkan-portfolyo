'use client'

import { useTransition } from 'react'
import { logout } from '@/lib/actions/auth'
import { LogOut } from 'lucide-react'

export default function LogoutButton() {
  const [pending, startTransition] = useTransition()

  return (
    <button
      onClick={() => startTransition(() => logout())}
      disabled={pending}
      className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
    >
      <LogOut size={13} />
      {pending ? 'Çıkılıyor...' : 'Çıkış Yap'}
    </button>
  )
}