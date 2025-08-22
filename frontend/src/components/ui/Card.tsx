import { DeleteIcon } from "../../icons/DeleteIcon";
import { ShareIcon } from "../../icons/ShareIcon";

interface CardProps {
    title: String,
    link: string,
    type: "youtube" | "twitter"
}

export default function Card({ title, link, type }: CardProps) {

    const linkId = link.split("/")[3]
    console.log(linkId)

    return (
        <div className=" bg-white rounded-md  border-2 border-slate-100 min-h-48 w-72 shadow-xl">
            <div className="flex w-full items-center justify-between bg-slate-300  py-1">
                <div className="flex items-center text-md">
                    {/* <div className="flex text-gray-500 pr-2 ">
                            <ShareIcon />
                        </div> */}
                    {title}
                </div>
                {/* <div className="flex items-center justify-center text-gray-500  ">
                        <div className="flex pr-2 w-10">
                            <a href={link} target="_blank">
                                <ShareIcon />
                            </a>
                        </div>
                        <div className="flex ">
                            <DeleteIcon/>
                        </div> 
                    </div> */}
            </div>


            <div className="container flex ">
                <div className="bg-gray-100 border-1 shadow-lg">
                    {type == "youtube" && <iframe className="w-full" src={`https://www.youtube.com/embed/${linkId}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}

                    {type == "twitter" && <blockquote className="twitter-tweet">
                        <a href="https://x.com/ShashiTharoor/status/1958554973328814574"></a>
                    </blockquote>}

                </div>

                <div className="grid grid-1 gap-0 bg-gray-200  w-10 h-38 ">
                    <div className="py-2 px-1 text-purple-600 ">
                    <div className="mb-1">
                        <a href={link} target="_blank">
                            <ShareIcon />
                        </a>
                    </div>
                    <div className="mb-1">
                        <DeleteIcon />
                    </div>
                    </div>
                </div>

            </div>

        </div>
    )
}