import { useEffect, type ReactElement } from "react";
import { Button } from "./Button";
import { useContent } from "../../utilis/contentContext";

interface SidebarItemProps {
    text: string;
    icon: ReactElement;
    className?: string;
    ContentType: string;
}

export function SidebarItems({ text, icon, className = "", ContentType }: SidebarItemProps) {
    const { type, setType, refresh } = useContent();

    useEffect(() => {
        console.log("type2si", type)

    }, [type])

    function handleClick() {
        console.log("Sidebar item clicked:", ContentType);
        setType(ContentType); // updates context or hook state
        refresh()
    }

    return (
        <div
            onClick={handleClick}
            className={`flex flex-row gap-4 items-center rounded-sm transition-all duration-100 hover:bg-gray-200 hover:cursor-pointer ${className}`}
        >
            <Button text={text} variant="none" startIcon={icon} />
        </div>
    );
}
