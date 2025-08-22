import type { ReactElement } from "react";


interface ButtonProps{
    varient:"Primary" | "Secondary",
    text:String, 
    startIcon:ReactElement,
    onClick?:()=>void
    fullWidth?:boolean,
    loading?:boolean
}

const varientClasses = {
    "Primary":"bg-purple-600 hover:bg-purple-700 text-white shadow-indigo-500/50 ",
    "Secondary":"bg-gray-300 hover:bg-gray-400 text-purple-600"
}

const defaultStyles = "flex justify-center items-center px-8 py-2 rounded-md m-2 font-light flex cursor-pointer ring"

export function Button({varient, text, startIcon,loading, onClick,fullWidth}:ButtonProps){
    return(
    <button onClick={onClick} className={ `${varientClasses[varient]} ${defaultStyles} ${fullWidth ? "w-full":""} ${loading? "opacity-50":""}`} disabled={loading}   >{startIcon}
  {text}
    </button>)

}