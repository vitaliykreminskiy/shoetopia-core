'use client'

import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'

export const SignOutButton = () => {
  const router = useRouter()

  const handleSignOut = async () => {
    await fetch('/api/admin/auth/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <button
      onClick={handleSignOut}
      className="flex items-center gap-1 text-xs text-neutral-400 hover:text-white transition-colors"
    >
      <LogOut size={12} /> Sign out
    </button>
  )
}
