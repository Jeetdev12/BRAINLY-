
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"
import {
  BrainCircuit,
  Eye,
  EyeOff,
  Loader2,
  Mail,
  Lock,
  LogIn,
} from "lucide-react"

function InputField({
  label,
  icon,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  right,
}: {
  label: string
  icon: React.ReactNode
  type?: string
  placeholder: string
  value: string
  onChange: (v: string) => void
  error?: string
  right?: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-medium uppercase tracking-widest text-white/30">
        {label}
      </label>

      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25">
          {icon}
        </span>

        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full rounded-xl border bg-white/[0.03] pl-10 pr-10 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none transition-all
          ${
            error
              ? "border-red-500/40 focus:border-red-500/60"
              : "border-white/[0.07] focus:border-blue-500/40 focus:bg-white/[0.05]"
          }`}
        />

        {right && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2">
            {right}
          </span>
        )}
      </div>

      {error && <p className="text-[11px] text-red-400">{error}</p>}
    </div>
  )
}

export default function SignIn() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [serverError, setServerError] = useState("")

  function validate() {
    const e: Record<string, string> = {}

    if (!email.trim()) {
      e.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      e.email = "Enter a valid email"
    }

    if (!password) {
      e.password = "Password is required"
    }

    return e
  }

  async function handleSubmit() {
    const e = validate()

    if (Object.keys(e).length) {
      setErrors(e)
      return
    }

    setErrors({})
    setServerError("")

    try {
      setLoading(true)

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/signin`,
        {
          email,
          password,
        }
      )

      localStorage.setItem("token", response.data.token)

      navigate("/dashboard")
    } catch (err: any) {
      setServerError(
        err.response?.data?.message || "Invalid email or password"
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center px-4">
      // Background Glow 
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-blue-500/8 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-yellow-500/6 blur-3xl" />
      </div>

      <div className="relative w-full max-w-sm">
        <div className="rounded-2xl border border-white/[0.07] bg-gray-950/80 backdrop-blur-sm overflow-hidden">
          <div className="h-px w-full bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-yellow-500/50" />

          <div className="px-6 pt-6 pb-7 flex flex-col gap-5">
           // Logo
            <div className="flex flex-col items-center gap-2 mb-1">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-yellow-500 shadow-lg shadow-blue-500/20">
                <BrainCircuit className="h-5 w-5 text-white" />
              </div>

              <div className="text-center">
                <h1 className="text-base font-bold text-white tracking-tight">
                  Welcome Back
                </h1>

                <p className="text-[11px] text-white/30 mt-0.5">
                  Sign in to your Second Brain
                </p>
              </div>
            </div>

           // Form
            <div className="flex flex-col gap-3.5">
              <InputField
                label="Email"
                icon={<Mail className="h-3.5 w-3.5" />}
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={setEmail}
                error={errors.email}
              />

              <InputField
                label="Password"
                icon={<Lock className="h-3.5 w-3.5" />}
                type={showPass ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={setPassword}
                error={errors.password}
                right={
                  <button
                    type="button"
                    onClick={() => setShowPass((p) => !p)}
                    className="text-white/25 hover:text-white/60 transition-colors"
                  >
                    {showPass ? (
                      <EyeOff className="h-3.5 w-3.5" />
                    ) : (
                      <Eye className="h-3.5 w-3.5" />
                    )}
                  </button>
                }
              />
            </div>

            {/* Server Error */}
            {serverError && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/8 px-3 py-2.5 text-xs text-red-400">
                {serverError}
              </div>
            )}

            {/* Button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-yellow-500 py-2.5 text-sm font-semibold text-white hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn className="h-4 w-4" />
                  Sign In
                </>
              )}
            </button>

            {/* Footer */}
            <p className="text-center text-[11px] text-white/25">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
              >
                Create one
              </Link>
            </p>
          </div>

          <div className="h-px w-full bg-gradient-to-r from-yellow-500/50 via-blue-500/50 to-blue-500/0" />
        </div>
      </div>
    </div>
  )
}
