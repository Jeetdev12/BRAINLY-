import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/Input";
import { Button } from "../components/ui/Button";
import { BACKEND_URL } from "../utilis/config";

export default function SignIn() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function signIn() {
    const email = emailRef.current?.value?.trim();
    const password = passwordRef.current?.value?.trim();

    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
        email,
        password,
      });

      const jwt = response.data.message;
      localStorage.setItem("token", jwt);
      navigate("/");
    } catch (err: any) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-screen bg-gradient-to-r from-rose-100 via-orange-50 to-yellow-50 flex items-center justify-center">
      <div className="bg-white rounded min-h-64 min-w-96 p-6 shadow-xl">
        <div className="text-start mb-6">
          <h1 className="font-bold text-2xl">Sign In</h1>
          <span>Welcome to your second brain!</span>
        </div>

        <div className="space-y-4">
          <Input
            type="email"
            reference={emailRef}
            placeholder="Enter your email"
            className="w-full border-purple-600"
          />

          <div className="relative">
            <Input
              type={showPass ? "text" : "password"}
              reference={passwordRef}
              placeholder="Enter your password"
              className="w-full border-purple-600 pr-10"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPass((prev) => !prev)}
            >
              {showPass ? "👁️" : "🙈"}
            </button>
          </div>

          <Button
          type="submit"
            onClick={signIn}
            loading={loading}
            variant="none"
            text={loading ? "Signing in..." : "Sign In"}
            fullWidth
            className="flex justify-center py-2 bg-purple-600 hover:bg-purple-700 text-white shadow-md rounded-md"
          />
        </div>

          <div className="text-center mt-4">
            <a href="/signup" className="text-purple-600">
              Don’t have an account? Sign up
            </a>
          </div>
      </div>
    </div>
  );
}
