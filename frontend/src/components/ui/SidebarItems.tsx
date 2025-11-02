import { useEffect, type ReactElement } from "react";
import { useContent } from "../../utilis/contentContext";

interface SidebarItemProps {
  text: string;
  icon?: ReactElement;
  className?: string;
  ContentType: string;
}

export function SidebarItems({
  text,
  icon,
  className = "",
  ContentType,
}: SidebarItemProps) {
  const { type, setType, refresh } = useContent();

  useEffect(() => {
    console.log("type2si", type);
  }, [type]);

  function handleClick() {
    console.log("Sidebar item clicked:", ContentType);
    setType(ContentType);
    refresh();
  }

  const isActive = type === ContentType;

  return (
    <div
      onClick={handleClick}
      className={`flex flex-row items-center gap-3 rounded-md px-3 py-2 transition-all duration-150 cursor-pointer 
        ${
          isActive
            ? "bg-purple-100 text-purple-700 font-semibold shadow-sm"
            : "hover:bg-gray-100 text-gray-700"
        } ${className}`}
    >
      {icon && <div className="w-5 h-5">{icon}</div>}
      <span>{text}</span>
    </div>
  );
}
