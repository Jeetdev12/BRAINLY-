
import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/Input";
import { Button } from "../components/ui/Button";
import { BACKEND_URL } from "../utilis/config";


export default function SignIn() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [showPass, setShowPass] = useState<Boolean>(false)
    
        const navigate = useNavigate()

    async function signIn() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
            username,
            password
        })
        const jwt = response.data.message
        localStorage.setItem("token", jwt)
        navigate("/")

    }

    return (
        <div className="min-h-screen w-screen  bg-gradient-to-r from-rose-100 via-orange-50 to-yellow-50 flex items-center justify-center shadow-xl">

            <div className=" bg-white  rounded min-h-64  min-w-96 p-4 shadow-xl">

                <div className="ml-2 text-start  mt-6">
                    <h1 className="font-bold text-2xl">Sign in </h1>
                    <span>Welcome to your second brain !!</span>
                </div>

                <div className="mt-4">
                    <div className="text-center w-full p-4">
                        <form className="space-y-4">
                            <Input type="text" reference={usernameRef} placeholder="Enter your name " className="w-full border-purple-600" />
                            <Input type="email" autoComplete="email" reference={passwordRef} placeholder="Enter your Email " className="w-full border-purple-600" />

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
                                    onClick={() => setShowPass(prev => !prev)}
                                >
                                    {showPass ? "👁️" : "🙈"}
                                </button>
                            </div>


                        </form>
                    </div>

                    <div className="flex justify-center mt-6 px-24">
                        <Button onClick={signIn} loading={false} variant={"none"} text={"Sign in"} startIcon={undefined} fullWidth={true} className="px-2 w-auto py-2 bg-purple-600 hover:bg-purple-700 text-white shadow-indigo-500/50 flex justify-center px-12 rounded-md" />
                    </div>

                </div>
            </div >
        </div >
    )
}