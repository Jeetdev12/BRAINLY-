import type { ReactElement } from "react"



export function SidebarItems({text , icon, className}:{
    text:string, icon:ReactElement, className:string
}){

    return(
        <div className={`flex flex-row gap-4 transition-all duration-100 hover:bg-gray-400 rounded-sm  items-center justify-center ${className}`} > 
{icon} {text}
        </div>
    )
}