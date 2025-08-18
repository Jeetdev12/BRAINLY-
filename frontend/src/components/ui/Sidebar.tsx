import { TwitterIcon } from "../../icons/TwitterIcon";
import { YoutubeIcon } from "../../icons/YoutubeIcon";
import { SidebarItems } from "./SidebarItems";




export default function SideBar(){

    return(
        <div className="min-h-screen bg-white border-r w-72 top-0 left-0">
            <div className="p-2 text-gray-800">
      <SidebarItems  className="text-gray-800" text="Twitter" icon={<TwitterIcon/>}/>
      </div>
      <div className="p-2">
      <SidebarItems className="text-gray-800" text="Youtube" icon={<YoutubeIcon/>}/>
      </div>
        </div>
    )
}