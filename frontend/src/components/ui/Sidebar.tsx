import { useState } from "react";
import { Logo } from "../../icons/Logo";
import { TwitterIcon } from "../../icons/TwitterIcon";
import { YoutubeIcon } from "../../icons/YoutubeIcon";
import { Document } from "../../icons/Documents";
import { BookOpen, PanelLeft } from "lucide-react";
import { SidebarItems } from "./SidebarItems";
import { LinkedinIcon } from "../../icons/LinkedinIcon";
import UserIcon from "../../icons/UserIcon";

export default function SideBar() {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { text: "All Content", type: "all", icon: <BookOpen className="w-5 h-5" /> },
    { text: "Tweets", type: "twitter", icon: <TwitterIcon className="p-0.5" /> },
    { text: "YouTube", type: "youtube", icon: <YoutubeIcon /> },
    { text: "Documents", type: "document", icon: <Document /> },
    { text: "LinkedIn", type: "linkedin", icon: <LinkedinIcon /> },
  ];

  return (
    <div
      className={`flex flex-col justify-between min-h-screen bg-white border-r border-gray-200 pt-4 sticky top-0 left-0 transition-all duration-300 ${
        collapsed ? "w-16" : "w-56"
      }`}
    >
      {/* Top Section */}
      <div>
        {/* Header */}
        <div className="flex items-center justify-between px-3">
          {!collapsed && (
            <a href="/" className="flex items-center text-purple-600">
              <Logo />
              <h1 className="pl-2 font-semibold text-black">Brainly</h1>
            </a>
          )}

          {/* Toggle Button */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className= {`p-2 rounded-md hover:bg-gray-100 hover: ${<PanelLeft className="w-5 h-5 text-gray-600" />} transition`}>
            {collapsed ? <Logo/> :<PanelLeft className="w-5 h-5 text-gray-600" />}
          </button>
        </div>

        {/* Menu Items */}
        <div className="pt-8 text-gray-600 font-medium">
          {menuItems.map((item) => (
            <SidebarItems
              key={item.text}
              text={collapsed ? "" : item.text}
              icon={item.icon}
              ContentType={item.type === "all" ? "" : item.type}
              className={`flex items-center ${
                collapsed ? "justify-center" : "gap-3"
              } px-4 py-2 mx-2 rounded-lg cursor-pointer transition hover:bg-gray-100`}
            />
          ))}
        </div>
      </div>

      {/* Bottom User Section */}
      <div className="flex items-center justify-center px-2 py-4 border-t border-gray-200">
        {collapsed ? (
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-b from-purple-400 to-purple-700">
            <UserIcon />
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-b from-purple-400 to-purple-700">
              <UserIcon />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">
                Manjeet Yadav
              </p>
              <p className="text-xs text-gray-500">Frontend Developer</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}