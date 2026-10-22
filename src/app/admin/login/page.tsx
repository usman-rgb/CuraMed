'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Logo from '@/components/shared/Logo'
import { Lock, User, Eye, EyeOff, Loader2, ShieldCheck, ArrowRight } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (!username.trim() || !password.trim()) {
      setErrorMessage('Please enter both username and password')
      return
    }

    setStatus('loading')
    setErrorMessage('')

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        router.push('/admin')
        router.refresh()
      } else {
        setStatus('error')
        setErrorMessage(data.message || 'Invalid credentials')
      }
    } catch {
      setStatus('error')
      setErrorMessage('Network error occurred. Please try again.')
    }
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        
        {/* Card */}
        <div className="bg-white rounded-[32px] p-8 sm:p-10 shadow-[0_20px_50px_rgba(10,63,99,0.12)] border border-sky-100">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Logo />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-[#D4F4F0] text-[#185750] mb-3">
              <ShieldCheck className="w-4 h-4 text-[#13B4C6]" /> Authorized Staff Only
            </div>
            <h1 className="text-2xl font-black text-[#0A3F63]">
              Admin Portal
            </h1>
            <p className="text-xs sm:text-sm text-[#5A6D80] mt-1">
              Sign in with your administrator credentials to manage appointments and clinic services.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            
            {/* Username */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#0A3F63] mb-1.5">
                Admin Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  required
                  className="w-full rounded-2xl border border-sky-100 bg-[#EDF5F7]/40 pl-11 pr-4 py-3 text-sm text-[#0A3F63] placeholder-[#7F97AB] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#13B4C6]/30 focus:border-[#13B4C6] transition-all"
                />
                <User className="w-4 h-4 text-[#7F97AB] absolute left-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#0A3F63] mb-1.5">
                Admin Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                  className="w-full rounded-2xl border border-sky-100 bg-[#EDF5F7]/40 pl-11 pr-11 py-3 text-sm text-[#0A3F63] placeholder-[#7F97AB] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#13B4C6]/30 focus:border-[#13B4C6] transition-all"
                />
                <Lock className="w-4 h-4 text-[#7F97AB] absolute left-4 top-1/2 -translate-y-1/2" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7F97AB] hover:text-[#0A3F63] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {errorMessage && (
              <p className="text-red-600 text-xs font-semibold bg-red-50 p-3 rounded-xl border border-red-100">
                {errorMessage}
              </p>
            )}

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full text-sm font-bold
                           bg-[#13B4C6] hover:bg-[#0E9CAB] text-white h-12 px-6 shadow-md hover:shadow-lg
                           active:scale-[0.99] transition-all duration-200 disabled:opacity-50"
              >
                {status === 'loading' ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Verifying Credentials...</>
                ) : (
                  <>Access Dashboard <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </div>

          </form>

          {/* Helper hint for development */}
          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-xs text-[#5A6D80]">
              Demo Admin: <strong className="text-[#0A3F63]">admin</strong> / Password: <strong className="text-[#0A3F63]">admin123</strong>
            </p>
          </div>

        </div>

      </div>
    </div>
  )
}
