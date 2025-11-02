import { Logo } from "../../icons/Logo";
import { TwitterIcon } from "../../icons/TwitterIcon";
import { YoutubeIcon } from "../../icons/YoutubeIcon";
import { Document } from "../../icons/Documents";
import { BookOpen } from "lucide-react";
import { SidebarItems } from "./SidebarItems";
import { LinkedinIcon } from "../../icons/LinkedinIcon";

export default function SideBar() {

  const menuItems = [
    { text: "All Content", type: "all", icon: <BookOpen className="w-5 h-5" /> },
    { text: "Tweets", type: "twitter", icon: <TwitterIcon className="p-0.5" /> },
    { text: "YouTube", type: "youtube", icon: <YoutubeIcon /> },
    { text: "Documents", type: "document", icon: <Document /> },
    { text: "LinkedIn", type: "linkedin", icon: <LinkedinIcon /> }, // 👈 New option
  ];

  return (
    <div className="min-h-screen bg-white border-r border-gray-200 w-56 pt-4 sticky top-0 left-0">
      {/* Logo Section */}
      <div className="flex items-center pl-6 text-2xl">
        <a href="/" className="flex items-center text-purple-600">
          <Logo />
          <h1 className="font-semibold pl-2 text-black">Brainly</h1>
        </a>
      </div>

      {/* Sidebar Items */}
      <div className="pt-8 pl-2 text-gray-600 font-medium">
        {menuItems.map((item) => (
          <SidebarItems
            key={item.text}
            text={item.text}
            icon={item.icon}
            ContentType={item.type === "all" ? "" : item.type}
            className={`flex items-center gap-3 px-4 py-2 mx-2 rounded-lg cursor-pointer transition-all `}
          />
        ))}
      </div>
    </div>
  );
}
