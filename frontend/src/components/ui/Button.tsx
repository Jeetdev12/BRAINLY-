import type { ReactElement } from "react";


interface ButtonProps {
    varient: "Primary" | "Secondary" | "none",
    text?: String ,
    startIcon?: ReactElement,
    onClick?: () => void
    fullWidth?: boolean,
    loading?: boolean
    className?:String
}

const varientClasses = {
    "Primary": "bg-purple-600 hover:bg-purple-700 text-white shadow-indigo-500/50 ",
    "Secondary": "bg-purple-200 hover:bg-purple-300 text-purple-600",
    "none":""
}

const defaultStyles = "flex justify-center items-center px-5 py-2 rounded-md m-2 font-light flex cursor-pointer  gap-3"

export function Button({ varient, text, startIcon, loading, onClick, fullWidth ,className}: ButtonProps) {
    return (
        <button onClick={onClick} className={`${varientClasses[varient]} ${defaultStyles} ${fullWidth ? "w-full" : ""} ${loading ? "opacity-50" : ""}  ${className}`} disabled={loading}   >{startIcon}
            {text}
        </button>)

}