import type { ReactElement } from "react"



export function SidebarItems({text , icon, className}:{
    text:string, icon:ReactElement, className:string
}){

    return(
        <div className={`flex ${className}`} > 
{icon} {text}
        </div>
    )
}