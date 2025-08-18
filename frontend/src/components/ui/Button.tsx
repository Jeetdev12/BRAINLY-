import type { ReactElement } from "react";


interface ButtonProps{
    varient:"Primary" | "Secondary",
    text:String, 
    startIcon:ReactElement,
    onClick?:()=>void
}

const varientClasses = {
    "Primary":"bg-purple-600 text-white",
    "Secondary":"bg-gray-200 text-purple-600"
}

const defaultStyles = "px-8 py-2 rounded-md m-2 font-light flex cursor-pointer"

export function Button({varient, text, startIcon, onClick}:ButtonProps){
    return(
    <button onClick={onClick} className={ varientClasses[varient] + " "+ defaultStyles}>{startIcon}
  {text}
    </button>)

}