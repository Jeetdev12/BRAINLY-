import axios from "axios";
import { DeleteIcon } from "../../icons/DeleteIcon";
import { ShareIcon } from "../../icons/ShareIcon";
import { TwitterIcon } from "../../icons/TwitterIcon";
import { YoutubeIcon } from "../../icons/YoutubeIcon";
import { BACKEND_URL } from "../../utilis/config";
import { useContent } from "../../hooks/useContent";
import { useEffect, useState } from "react";
import { Document } from "../../icons/Documents";

interface CardProps {
    title: String,
    link: string,
    type: "youtube" | "twitter" |"document" |"null"
    key: any,
    contentId?: String
}

export default function Card({ title, link, type, contentId }: CardProps) {
    const [response, setResponse] = useState<any>()
    const {refresh} = useContent()

    const linkId = link.split("/")[3]
    console.log( link.replace("view?usp=sharing", "preview"))


    useEffect(()=>{
    refresh()
    },[response])


    async function handleDelete(contentId: String | undefined) {
        
     const response= await axios.delete(`${BACKEND_URL}/api/v1/content`, {
            data: {
                contentId: contentId,
            },
            headers: {
          'Authorization': localStorage.getItem("token")
        }
        })
             setResponse(response)
    //    await refresh()
       console.log(response)
    }

    let icons: any = {
        "youtube": <YoutubeIcon />,
        "twitter": <TwitterIcon />,
        "document": <Document/>
    }

    return (
        <div className=" bg-white rounded-md  border-2 border-white min-h-62 min-w-72 shadow-2xl">
            <div className="flex w-full items-center justify-between    border-b border-gray-200 py-2">

                <div className="flex items-center justify-start gap-2 pl-2  text-gray-600">
                    {icons[type]}
                    <p className="line-clamp-2as wrap text-md text-black">
                        {title}
                    </p>
                </div>

                <div className="flex items-center justify-end p pr-2 gap-3 text-gray-600 ">
                    <a href={link} target="_blank">
                        <ShareIcon />
                    </a>
                    <button className="bg-white cursor-pointer hover:bg-gray-200 p-0 m-0 rounded-full"  onClick={()=>handleDelete(contentId)} > {<DeleteIcon />} </button>
                </div>
            </div>


            <div className=" mt-4 px-4 min-w-48 min-h-32  flex ">
                <div className="  shadow-lg rounded-lg ">
                    {type == "youtube" && <iframe className="w-full rounded-md border-2 border-gray-200" src={`https://www.youtube.com/embed/${linkId}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}

                    {type == "twitter" && <blockquote className="twitter-tweet w-full rounded-md border-2 border-gray-200 ">
                        <a href="https://twitter.com/kamleshksingh/status/1959312965741789350"></a>
                    </blockquote>}

                    {type =="document"&&<iframe src={link.replace("view?usp=sharing", "preview")} className="border-none " width="100%" height="100%" ></iframe>
}


                </div>



            </div>

        </div>
    )
}