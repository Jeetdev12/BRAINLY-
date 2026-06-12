
import { useState } from "react"
import { jwtDecode } from "jwt-decode"
import axios from "axios"
import {
  BrainCircuit, PanelLeftClose, PanelLeftOpen,
  LogOut, Settings, X, Loader2, Check, Eye, EyeOff,
} from "lucide-react"

interface JWTPayload {
  _id: string
  username?: string
  email?: string
}

function getUserFromToken(): { username: string; email: string } {
  try {
    const token = localStorage.getItem("token")
    if (!token) return { username: "User", email: "" }
    const decoded = jwtDecode<JWTPayload>(token)
    return {
      username: decoded.username || "User",
      email:    decoded.email    || "",
    }
  } catch {
    return { username: "User", email: "" }
  }
}

function SettingsPanel({ onClose }: { onClose: () => void }) {
  const user = getUserFromToken()
  const [username, setUsername] = useState(localStorage.getItem("sb_username") || user.username)
  const [email, setEmail]       = useState(localStorage.getItem("sb_email")    || user.email)
  const [password, setPassword] = useState("")
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading]   = useState(false)
  const [saved, setSaved]       = useState(false)
  const [error, setError]       = useState("")

  async function handleSave() {
    if (!username.trim()) { setError("Username can't be empty"); return }
    setError("")
    setLoading(true)
    try {
      const token = localStorage.getItem("token")
      const payload: any = { username: username.trim(), email: email.trim() }
      if (password.trim()) payload.password = password

      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/update`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      )

      localStorage.setItem("sb_username", username.trim())
      localStorage.setItem("sb_email",    email.trim())

      setSaved(true)
      setPassword("")
      setTimeout(() => { setSaved(false); onClose() }, 1200)
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to save changes")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="border-t border-white/[0.05] px-3 py-3 space-y-2.5 bg-white/[0.01]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-medium uppercase tracking-widest text-white/30">Edit Profile</span>
        <button onClick={onClose} className="text-white/25 hover:text-white/60 transition-colors">
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Username */}
      <div>
        <label className="text-[10px] text-white/25 mb-1 block">Username</label>
        <input
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="w-full rounded-lg border border-white/[0.07] bg-white/[0.03] px-2.5 py-1.5 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/40 transition-all"
          placeholder="Your name"
        />
      </div>

      {/* Email */}
      <div>
        <label className="text-[10px] text-white/25 mb-1 block">Email</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full rounded-lg border border-white/[0.07] bg-white/[0.03] px-2.5 py-1.5 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/40 transition-all"
          placeholder="you@email.com"
        />
      </div>

      {/* New Password */}
      <div>
        <label className="text-[10px] text-white/25 mb-1 block">New Password</label>
        <div className="relative">
          <input
            type={showPass ? "text" : "password"}
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full rounded-lg border border-white/[0.07] bg-white/[0.03] px-2.5 py-1.5 pr-8 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/40 transition-all"
            placeholder="Leave blank to keep current"
          />
          <button
            onClick={() => setShowPass(p => !p)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition-colors"
          >
            {showPass ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
          </button>
        </div>
      </div>

      {/* Error */}
      {error && <p className="text-[10px] text-red-400">{error}</p>}

      {/* Save */}
      <button
        onClick={handleSave}
        disabled={loading || saved}
        className={`w-full flex items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-semibold transition-all disabled:opacity-60
          ${saved
            ? "bg-green-500/15 border border-green-500/25 text-green-400"
            : "bg-gradient-to-r from-blue-500 to-yellow-500 text-white hover:opacity-90"
          }`}
      >
        {loading ? <><Loader2 className="h-3 w-3 animate-spin" />Saving...</>
          : saved  ? <><Check className="h-3 w-3" />Saved!</>
          : "Save Changes"}
      </button>
    </div>
  )
}

export function Sidebar({
  collapsed, setCollapsed, activeFilter, setActiveFilter, counts, filters,
}: {
  collapsed: boolean
  setCollapsed: (v: boolean) => void
  activeFilter: string
  setActiveFilter: (v: string) => void
  counts: Record<string, number>
  filters: { key: string; label: string; Icon: React.ElementType }[]
}) {
  const [settingsOpen, setSettingsOpen] = useState(false)

  const decoded  = getUserFromToken()
  const userName = localStorage.getItem("sb_username") || decoded.username
  const userEmail = localStorage.getItem("sb_email")   || decoded.email
  const initial  = userName[0]?.toUpperCase() ?? "U"

  function handleSignOut() {
    localStorage.removeItem("token")
    localStorage.removeItem("sb_username")
    localStorage.removeItem("sb_email")
    window.location.href = "/signin"
  }

  return (
    <aside className={`fixed top-0 left-0 h-screen flex flex-col bg-gray-950 border-r border-white/[0.05] z-30 transition-all duration-300 ${collapsed ? "w-[60px]" : "w-[220px]"}`}>

      {/* Logo */}
      <div className="flex items-center justify-between px-3 py-4 border-b border-white/[0.05]">
        {!collapsed ? (
          <>
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-yellow-500">
                <BrainCircuit className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-semibold text-white tracking-tight">Second Brain</span>
            </div>
            <button onClick={() => setCollapsed(true)} className="text-white/25 hover:text-white/60 transition-colors">
              <PanelLeftClose className="h-4 w-4" />
            </button>
          </>
        ) : (
          <div className="mx-auto flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-yellow-500">
            <BrainCircuit className="h-4 w-4 text-white" />
          </div>
        )}
      </div>

      {collapsed && (
        <button onClick={() => setCollapsed(false)} className="mx-auto mt-3 text-white/25 hover:text-white/60 transition-colors">
          <PanelLeftOpen className="h-4 w-4" />
        </button>
      )}

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
        {filters.map((f) => {
          const isActive = activeFilter === f.key
          return (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              title={collapsed ? f.label : undefined}
              className={`w-full flex items-center gap-2.5 rounded-lg px-2.5 py-2 transition-all
                ${collapsed ? "justify-center" : ""}
                ${isActive ? "bg-white/[0.06] text-white" : "text-white/35 hover:text-white/65 hover:bg-white/[0.03]"}`}
            >
              <span className={`shrink-0 ${isActive ? "text-blue-400" : ""}`}>
                <f.Icon className="h-3.5 w-3.5" />
              </span>
              {!collapsed && (
                <>
                  <span className="flex-1 text-xs font-medium truncate text-left">{f.label}</span>
                  {counts[f.key] > 0 && (
                    <span className={`text-[10px] font-mono ${isActive ? "text-blue-400/70" : "text-white/20"}`}>
                      {counts[f.key]}
                    </span>
                  )}
                </>
              )}
            </button>
          )
        })}
      </nav>

      {/* Inline Settings Panel */}
      {settingsOpen && !collapsed && (
        <SettingsPanel onClose={() => setSettingsOpen(false)} />
      )}

      {/* User row */}
      <div className={`border-t border-white/[0.05] px-2 py-3 ${collapsed ? "flex flex-col items-center gap-2" : ""}`}>
        {!collapsed ? (
          <div className="flex items-center gap-2 px-1">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-yellow-500 text-[11px] font-bold text-white">
              {initial}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">{userName}</p>
              {userEmail && <p className="text-[10px] text-white/25 truncate">{userEmail}</p>}
            </div>
            <button
              onClick={() => setSettingsOpen(p => !p)}
              title="Settings"
              className={`transition-colors ${settingsOpen ? "text-blue-400" : "text-white/20 hover:text-white/60"}`}
            >
              <Settings className="h-3.5 w-3.5" />
            </button>
            <button onClick={handleSignOut} title="Sign out" className="text-white/20 hover:text-red-400 transition-colors">
              <LogOut className="h-3.5 w-3.5" />
            </button>
          </div>
        ) : (
          <>
            <div className="h-7 w-7 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-yellow-500 text-[11px] font-bold text-white" title={userName}>
              {initial}
            </div>
            <button
              onClick={() => { setCollapsed(false); setSettingsOpen(true) }}
              title="Settings"
              className="text-white/20 hover:text-white/60 transition-colors"
            >
              <Settings className="h-3.5 w-3.5" />
            </button>
            <button onClick={handleSignOut} title="Sign out" className="text-white/20 hover:text-red-400 transition-colors">
              <LogOut className="h-3.5 w-3.5" />
            </button>
          </>
        )}
      </div>
    </aside>
  )
}