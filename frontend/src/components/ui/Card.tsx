import axios from "axios";
import { DeleteIcon } from "../../icons/DeleteIcon";
import { ShareIcon } from "../../icons/ShareIcon";
import { TwitterIcon } from "../../icons/TwitterIcon";
import { YoutubeIcon } from "../../icons/YoutubeIcon";
import { BACKEND_URL } from "../../utilis/config";
import { useContent } from "../../hooks/useContent";
import { useState } from "react";
import { Document } from "../../icons/Documents";
import { BookOpen } from "lucide-react";

interface CardProps {
    title: string;
    link: string;
    type: "youtube" | "twitter" | "document" | "text" | "null";
    contentId?: string;
}

export default function Card({ title, link, type, contentId }: CardProps) {
    const [loading, setLoading] = useState(false);
    const { refresh } = useContent();

    // Extract YouTube video ID safely
    const youtubeMatch = link.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]+)/);
    const youtubeId = youtubeMatch ? youtubeMatch[1] : "";

    async function handleDelete(contentId?: string) {
        if (!contentId) return;
        try {
            setLoading(true);
            const response = await axios.delete(`${BACKEND_URL}/api/v1/content`, {
                data: { contentId },
                headers: {
                    Authorization: localStorage.getItem("token") || ""
                }
            });
            console.log("Deleted:", response.data);
           await refresh(); // refresh list after delete
        } catch (err) {
            console.error("Delete error:", err);
        } finally {
            setLoading(false);
        }
    }

    const icons: Record<string, JSX.Element> = {
        youtube: <YoutubeIcon />,
        twitter: <TwitterIcon />,
        document: <Document />,
        text: <BookOpen />
    };

    return (
        <div className="bg-white rounded-md border-2 border-white h-auto shadow-2xl">
            {/* Header */}
            <div className="flex w-full items-center justify-between border-b border-gray-200 py-2">
                <div className="flex items-center gap-2 pl-2 text-gray-600">
                    {icons[type]}
                    <p className="line-clamp-2 overflow-hidden text-md text-black">
                        {title}
                    </p>
                </div>
                <div className="flex items-center gap-3 pr-2 text-gray-600">
                    <a href={link} target="_blank" rel="noopener noreferrer">
                        <ShareIcon />
                    </a>
                    <button
                        disabled={loading}
                        className="bg-white cursor-pointer hover:bg-gray-200 p-1 rounded-full disabled:opacity-50"
                        onClick={() => handleDelete(contentId)}
                    >
                        <DeleteIcon />
                    </button>
                </div>
            </div>

            {/* Content Preview */}
            <div className="mt-4 px-4 flex">
                <div className="shadow-lg rounded-lg w-full">
                    {type === "youtube" && youtubeId && (
                        <iframe
                            className="w-full h-64 rounded-md border-2 border-gray-200"
                            src={`https://www.youtube.com/embed/${youtubeId}`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                    )}

                    {type === "twitter" && (
                        <blockquote className="twitter-tweet w-full rounded-md border-2 border-gray-200">
                            <a href={link}></a>
                        </blockquote>
                    )}

                    {type === "document" && (
                        <iframe
                            src={link.replace("view?usp=sharing", "preview")}
                            className="border-none w-full h-96 rounded-md"
                        ></iframe>
                    )}

                    {type === "text" && (
                        <p className="p-4 text-gray-700 whitespace-pre-wrap break-words">
                            {link}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
