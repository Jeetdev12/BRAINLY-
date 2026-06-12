
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"
import { BrainCircuit, Eye, EyeOff, Loader2, User, Mail, Lock, Sparkles } from "lucide-react"
import { InputField } from "@/utilis/Constants"

export default function SignUp() {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [email, setEmail]       = useState("")
  const [password, setPassword] = useState("")
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading]   = useState(false)
  const [errors, setErrors]     = useState<Record<string, string>>({})
  const [serverError, setServerError] = useState("")

  function validate() {
    const e: Record<string, string> = {}
    if (!username.trim())          e.username = "Username is required"
    else if (username.length < 3)  e.username = "At least 3 characters"
    if (!email.trim())             e.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = "Enter a valid email"
    if (!password)                 e.password = "Password is required"
    else if (password.length < 6)  e.password = "At least 6 characters"
    return e
  }

  async function handleSubmit() {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setErrors({})
    setServerError("")

    try {
      setLoading(true)
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/signup`, {
        username, email, password,
      })
      navigate("/signin")
    } catch (err: any) {
      setServerError(err.response?.data?.message || "Something went wrong. Try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center px-4">

      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-blue-500/8 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-yellow-500/6 blur-3xl" />
      </div>

      <div className="relative w-full max-w-sm">

        {/* Card */}
        <div className="rounded-2xl border border-white/[0.07] bg-gray-950/80 backdrop-blur-sm overflow-hidden">
          <div className="h-px w-full bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-yellow-500/50" />

          <div className="px-6 pt-6 pb-7 flex flex-col gap-5">

            {/* Logo */}
            <div className="flex flex-col items-center gap-2 mb-1">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-yellow-500 shadow-lg shadow-blue-500/20">
                <BrainCircuit className="h-5 w-5 text-white" />
              </div>
              <div className="text-center">
                <h1 className="text-base font-bold text-white tracking-tight">Create your Second Brain</h1>
                <p className="text-[11px] text-white/30 mt-0.5">Save everything. Forget nothing.</p>
              </div>
            </div>

            {/* Fields */}
            <div className="flex flex-col gap-3.5">
              <InputField
                label="Username"
                icon={<User className="h-3.5 w-3.5" />}
                placeholder="yourname"
                value={username}
                onChange={setUsername}
                error={errors.username}
              />
              <InputField
                label="Email"
                icon={<Mail className="h-3.5 w-3.5" />}
                type="email"
                placeholder="you@email.com"
                value={email}
                onChange={setEmail}
                error={errors.email}
              />
              <InputField
                label="Password"
                icon={<Lock className="h-3.5 w-3.5" />}
                type={showPass ? "text" : "password"}
                placeholder="Min. 6 characters"
                value={password}
                onChange={setPassword}
                error={errors.password}
                right={
                  <button
                    type="button"
                    onClick={() => setShowPass(p => !p)}
                    className="text-white/25 hover:text-white/60 transition-colors"
                  >
                    {showPass ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                  </button>
                }
              />
            </div>

            {/* Server error */}
            {serverError && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/8 px-3 py-2.5 text-xs text-red-400">
                {serverError}
              </div>
            )}

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-yellow-500 py-2.5 text-sm font-semibold text-white hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20"
            >
              {loading
                ? <><Loader2 className="h-4 w-4 animate-spin" /> Creating account...</>
                : <><Sparkles className="h-4 w-4" /> Create Account</>
              }
            </button>

            {/* Footer link */}
            <p className="text-center text-[11px] text-white/25">
              Already have an account?{" "}
              <Link to="/signin" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                Sign in
              </Link>
            </p>
          </div>

          <div className="h-px w-full bg-gradient-to-r from-yellow-500/50 via-blue-500/50 to-blue-500/0" />
        </div>
      </div>
    </div>
  )
}
