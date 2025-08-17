import { ShareIcon } from "../../icons/ShareIcon";

interface CardProps {
    title: String,
    link: string,
    type: "youtube" | "twitter"
}

export default function Card({ title, link, type }: CardProps) {


    return (
        <div className="">
            <div className=" p-4 bg-white rounded-md  border-2 border-slate-100 min-h-48 max-w-72">
                <div className="flex items-center justify-between ">
                    <div className="flex items-center text-md">
                        <div className="flex text-gray-500 pr-2 ">
                            <ShareIcon />
                        </div>
                        {title}
                    </div>
                    <div className="flex items-center text-gray-500  ">
                        <div className="flex pr-2">
                            <a href={link} target="_blank">
                                <ShareIcon />
                            </a>
                        </div>
                        <div className="flex">
                            <ShareIcon />
                        </div>
                    </div>
                </div>
                <div className="pt-4">
                    {type == "youtube" && <iframe className="w-full" src={link.replace("watch", "embed").replace("?v=","/")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}

                    {type == "twitter" && <blockquote className="twitter-tweet">
                        <a href={link.replace("x.com", "twitter.com")}></a>
                    </blockquote>}

                </div>
            </div>
        </div>
    )
}