import type { ReactElement } from "react"



export function SidebarItems({text , icon, className}:{
    text:string, icon:ReactElement, className:string
}){

    return(
        <div className={`flex gap-4 transition-all duration-100 hover:bg-gray-400  ${className}`} > 
{icon} {text}
        </div>
    )
}