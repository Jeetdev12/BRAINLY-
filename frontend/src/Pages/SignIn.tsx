
import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/Input";
import { Button } from "../components/ui/Button";


export default function SignIn() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
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
        <div className="min-h-screen w-screen bg-gray-200 flex items-center justify-center">

            <div className="bg-white border rounded min-w-48">
                <Input placeholder="Enter your name " reference={usernameRef} />
                <Input placeholder="Enter your password " reference={passwordRef} />


                <div className="flex justify-center items-center">
                    <Button onClick={signIn} loading={false} varient={"Primary"} text={"Sign In"} startIcon={undefined} fullWidth={true} />
                </div>
            </div>

        </div>
    )
}