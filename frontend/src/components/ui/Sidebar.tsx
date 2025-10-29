import { Logo } from "../../icons/Logo";
import { TwitterIcon } from "../../icons/TwitterIcon";
import { YoutubeIcon } from "../../icons/YoutubeIcon";
import { SidebarItems } from "./SidebarItems";
import { Document } from "../../icons/Documents";
import { useContent } from "../../hooks/useContent";

export default function SideBar() {
  const { type } = useContent();

  return (
    <div className="min-h-screen bg-white border-r-2 border-gray-200 w-48 md:w-62 top-0 left-0 pt-4 sticky">
      <div className="flex items-center pl-6 text-2xl">
        <a href="/" className="flex items-center text-purple-600">
          <Logo />
          <h1 className="font-semibold pl-2 text-black">Brainly</h1>
        </a>
      </div>

      <div className="pt-8 pl-6 w-38 text-gray-600 font-semibold">
        <SidebarItems
          
          className="mt-1 pl-2 hover:bg-gray-200 hover:text-purple-600 hover:cursor-pointer transition-colors"
          text="Tweets"
          icon={<TwitterIcon className="p-0.5" />}
          ContentType="twitter"
        />
        <SidebarItems

          className="mt-2 pl-2 hover:cursor-pointer hover:text-purple-600 transition-colors"
          text="Youtube"
          icon={<YoutubeIcon />}
          ContentType="youtube"
        />
        <SidebarItems
     
          className="mt-2 pl-2 hover:cursor-pointer hover:text-purple-600 transition-colors"
          text="Documents"
          icon={<Document />}
          ContentType="document"
        />
      </div>
    </div>
  );
}
