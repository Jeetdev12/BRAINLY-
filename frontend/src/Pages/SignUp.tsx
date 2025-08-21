
import { useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../utilis/config";
import axios from "axios";
import { Input } from "../components/Input";
import { Button } from "../components/ui/Button";





export default function SignUp() {
     const usernameRef = useRef<HTMLInputElement>(null);
      const passwordRef = useRef<HTMLInputElement>(null);
      const navigate = useNavigate()

    async function signUp () { 
       const username = usernameRef.current?.value;
       const password = passwordRef.current?.value;
       await axios.post(`${BACKEND_URL}/api/v1/signup`,  {
                username,
                password
       })
       navigate("/signin")
    }


    return (
        <div className="min-h-screen w-screen bg-gray-200 flex items-center justify-center">

            <div className="bg-white border rounded min-w-48">
                <Input reference={usernameRef} placeholder="Enter your name " />
                <Input reference={passwordRef} placeholder="Enter your password "  />


                <div className="flex justify-center items-center">
                    <Button onClick={signUp} loading={false} varient={"Primary"} text={"Sign up"} startIcon={undefined} fullWidth={true} />
                </div>
            </div>

        </div>
    )
}