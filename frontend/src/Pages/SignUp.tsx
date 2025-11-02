import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Input } from "../components/Input";
import { Button } from "../components/ui/Button";

export default function SignUp() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function signUp() {
        const username = usernameRef.current?.value?.trim();
        const email = emailRef.current?.value?.trim();
        const password = passwordRef.current?.value?.trim();

        if (!username || !email || !password) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            setLoading(true);
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/signup`, {
                username,
                email,
                password,
            });

            alert("Account created successfully!");
            navigate("/signin");
        } catch (err: any) {
            alert(err.response?.data?.message || "Sign-up failed.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen w-screen bg-gradient-to-r from-rose-100 via-orange-50 to-yellow-50 flex items-center justify-center shadow-xl">
            <div className="bg-white rounded min-h-64 min-w-96 p-6 shadow-xl">
                <div className="ml-2 text-start mt-4 mb-6">
                    <h1 className="font-bold text-2xl">Sign Up</h1>
                    <span>Create your second brain account 🧠</span>
                </div>

                <div className="text-center w-full p-4 space-y-4">
                    <Input
                        type="text"
                        reference={usernameRef}
                        placeholder="Enter your name"
                        className="w-full border-purple-600"
                    />

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
                        onClick={signUp}
                        loading={loading}
                        text={loading ? "Signing up..." : "Sign Up"}
                        fullWidth
                        className="flex justify-center py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md shadow-md" variant={"none"} />

                    <div className="text-center mt-3">
                        <a href="/signin" className="text-purple-600 hover:underline">
                            Already have an account? Sign in
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
