'use client'

import Link from 'next/link'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { User } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'

const NavLogin = () => {
  const [user, setUser] = useState<User | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const supabase = createClientComponentClient()

  // Fetch session
  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user || null)
    }
    getSession()
  }, [])

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Not logged in
  if (!user) {
    return (
      <div className="flex items-center">
        <Link className="p-2 bg-blue-500 text-white rounded" href="/login">
          Login
        </Link>
        <Link className="p-2 bg-green-500 text-white rounded ml-2" href="/signup">
          Sign Up
        </Link>
      </div>
    )
  }

  // Logged in UI
  const initials = user.email?.charAt(0).toUpperCase() || 'U'

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-bold hover:ring-2 ring-gray-400"
      >
        {initials}
      </button>

      {menuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
          <Link
            href="/profile"
            className="block px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
            onClick={() => setMenuOpen(false)}
          >
            Profile
          </Link>
          <Link
            href="/settings"
            className="block px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
            onClick={() => setMenuOpen(false)}
          >
            Settings
          </Link>
          <Link
            href="/review"
            className="block px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
            onClick={() => setMenuOpen(false)} 
          >
            Reviews
          </Link>
          <button
            onClick={handleLogout}>
            Log out
          </button>
        </div>
      )}
    </div>
  )
}

export default NavLogin
