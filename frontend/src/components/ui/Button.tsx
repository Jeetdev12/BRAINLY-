import type { ReactElement } from "react";


interface ButtonProps{
    varient:"Primary" | "Secondary",
    text:String, 
    startIcon:ReactElement
}

const varientClasses = {
    "Primary":"bg-purple-600 text-white",
    "Secondary":"bg-purple-200 text-purple-600"
}

const defaultStyles = "px-10 py-2 rounded-md m-2 font-light flex"

export function Button({varient, text, startIcon}:ButtonProps){
    return(
    <button className={ varientClasses[varient] + " "+ defaultStyles}>{startIcon}
  {text}
    </button>)

}