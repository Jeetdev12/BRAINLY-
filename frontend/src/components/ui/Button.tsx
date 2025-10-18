import type { ReactElement } from "react";


interface ButtonProps {
    variant: "Primary" | "Secondary" | "none",
    text?: String ,
    startIcon?: ReactElement,
    onClick?: () => void
    fullWidth?: boolean,
    loading?: boolean
    className?:String,
    disabled?:boolean,
    type?:any
}

const variantClasses = {
    "Primary": "bg-purple-600 hover:bg-purple-700 text-white shadow-indigo-500/50 flex justify-center items-center px-5 py-2 rounded-md m-2 font-light flex cursor-pointer  gap-3",
    "Secondary": "bg-purple-200 hover:bg-purple-300 text-purple-600 flex justify-center items-center px-5 py-2 rounded-md m-2 font-light flex cursor-pointer  gap-3",
    "none":""
}

const defaultStyles = "flex gap-2 items-center"

export function Button({ variant, text, startIcon, loading, onClick, fullWidth ,className,disabled,type}: ButtonProps) {
    return (
        <button type={type} disabled={disabled} onClick={onClick} className={`${variantClasses[variant]} ${defaultStyles}  ${fullWidth ? "w-full" : ""} ${loading ? "opacity-50" : ""}  ${className}`} >{startIcon}
            {text}
        </button>
        )

}