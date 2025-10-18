import axios from "axios";
import { Logo } from "../../icons/Logo";
import { TwitterIcon } from "../../icons/TwitterIcon";
import { YoutubeIcon } from "../../icons/YoutubeIcon";
import { SidebarItems } from "./SidebarItems";
import { BACKEND_URL } from "../../utilis/config";
import { Document } from "../../icons/Documents";
import qs from "qs";




export default function SideBar() {


  async function handleClick(type: string): Promise<void> {
    console.log("type side:", type);

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found, please login first.");
      return;
    }
    const params: any = {
      filters: {
        type: {
          $eq: type,   // equals
        },
      }
    }
    const queryParams = qs.stringify(params)
  try {
        const response: any = await axios.post(
          `${BACKEND_URL}/api/v1/filter/type?${queryParams}`,
          {
            headers: { Authorization: `Bearer ${token}`
            },
          }
        );

        console.log("response sidebr:", response.data);
      } catch(error: any) {
        console.error("Error while fetching filter results:", error.response?.data || error.message);
      }
    }



    return (
      <div className="min-h-screen bg-white border-r-2 border-gray-200 w-48 md:w-62 top-0 left-0  pt-4">
        <div className="flex items-center  pl-6 text-2xl  ">
          <div className="text-purple-600 "><a href="/"><Logo /></a></div>
          <h1 className="font-semibold pl-2 ">Brainly</h1>
        </div>
        <div className=" pt-8 pl-6 w-38 text-gray-600 font-semibold">
          <SidebarItems onClick={() => handleClick("twitter")} className="mt-1 pl-2" text="Tweets" icon={<TwitterIcon className="p-0.5" />} />
          <SidebarItems onClick={() => handleClick("youtube")} className="mt-2 pl-2 " text="Youtube" icon={<YoutubeIcon />} />
          <SidebarItems onClick={() => handleClick("document")} className="mt-2 pl-2 " text="Documents" icon={<Document />} />
        </div>
      </div>
    )
  }