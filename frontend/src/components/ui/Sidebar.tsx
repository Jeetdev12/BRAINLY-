import { Logo } from "../../icons/Logo";
import { TwitterIcon } from "../../icons/TwitterIcon";
import { YoutubeIcon } from "../../icons/YoutubeIcon";
import { SidebarItems } from "./SidebarItems";




export default function SideBar() {

    return (
        <div className="min-h-screen bg-white border-r-2 border-gray-200 w-48 md:w-62 top-0 left-0  pt-4">
            <div className="flex items-center  pl-2 text-2xl  ">
                <div className="text-purple-600 "><Logo /></div>
                <h1 className="font-semibold pl-2 ">Brainly</h1>
            </div>
            <div className=" pt-8 pl-6 w-38 text-gray-600 font-semibold">
                <SidebarItems className="mt-1" text="Tweets" icon={<TwitterIcon />} />
                <SidebarItems className="mt-2  " text="Youtube" icon={<YoutubeIcon />} />
            </div>
        </div>
    )
}