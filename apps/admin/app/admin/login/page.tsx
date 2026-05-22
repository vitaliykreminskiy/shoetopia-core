'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast, Toaster } from 'sonner'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const res = await fetch('/api/admin/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      router.push('/admin')
    } else {
      toast.error('Invalid password')
      setLoading(false)
    }
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#0a0a0a' }}>
      <Toaster position="bottom-right" theme="dark" />
      <form onSubmit={handleSubmit} style={{ background: '#1a1a1a', padding: '2rem', borderRadius: '8px', width: '320px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h1 style={{ color: '#fff', margin: 0, fontSize: '1.2rem' }}>Admin Login</h1>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          autoFocus
          style={{ padding: '0.6rem', borderRadius: '4px', border: '1px solid #333', background: '#111', color: '#fff', fontSize: '1rem' }}
        />
        <button
          type="submit"
          disabled={loading || !password}
          style={{ padding: '0.6rem', borderRadius: '4px', background: '#fff', color: '#000', fontWeight: 600, cursor: 'pointer', opacity: loading || !password ? 0.5 : 1 }}
        >
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  )
}
