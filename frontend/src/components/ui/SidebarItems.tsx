import type { ReactElement } from "react"
import { Button } from "./Button"

interface itemsProps {
    
    text: string, icon: ReactElement, className: string,onClick?: () => void
}

export function SidebarItems({ text, icon, className ,onClick}: itemsProps) {

    return (
        <div className={`flex flex-row gap-4 transition-all duration-100 hover:bg-gray-200 rounded-sm  items-center  ${className}`} >
            {/* {icon} {text} */}
            <Button onClick={onClick} text={text} variant="none" startIcon={icon}/>
        </div>
    )
}