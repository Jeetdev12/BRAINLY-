import { Logo } from "../../icons/Logo";
import { TwitterIcon } from "../../icons/TwitterIcon";
import { YoutubeIcon } from "../../icons/YoutubeIcon";
import { SidebarItems } from "./SidebarItems";




export default function SideBar() {

    return (
        <div className="min-h-screen bg-white border-r w-48 md:w-72 top-0 left-0 pl-6 pt-4">
            <div className="flex items-center text-2xl pt-6 ">
                <div className="text-purple-600 "><Logo /></div>
                <h1 className="font-semibold pl-2">Brainly</h1>

            </div>
            <div className=" pt-3 w-38  ">
                <SidebarItems className="text-gray-800  m-2" text="Twitter" icon={<TwitterIcon />} />
                <SidebarItems className="text-gray-800 m-2  pl-2 " text="Youtube" icon={<YoutubeIcon />} />
            </div>
        </div>
    )
}