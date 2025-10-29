import axios from "axios";
import { DeleteIcon } from "../../icons/DeleteIcon";
import { ShareIcon } from "../../icons/ShareIcon";
import { TwitterIcon } from "../../icons/TwitterIcon";
import { YoutubeIcon } from "../../icons/YoutubeIcon";
import { useContent } from "../../hooks/useContent";
import { useEffect, useState, type JSX } from "react";
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
    let token: any;

    useEffect(() => {
        token = localStorage.getItem("token")
    }, [])

    // Extract YouTube video ID safely
    const youtubeMatch = link?.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]+)/);
    const youtubeId = youtubeMatch ? youtubeMatch[1] : "";

    async function handleDelete(contentId?: string) {
        if (!contentId) return;
        try {
            setLoading(true);
            const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/v1/delete-content`, {
                data: { contentId },
                headers: {
                    Authorization: `Bearer ${token}`
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
        <div className="bg-white rounded-xl border border-gray-200 shadow-md w-full max-w-md overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 py-3 px-4 bg-gray-50">
                <div className="flex items-center gap-2 text-gray-700">
                    {icons[type]}
                    <p className="font-medium text-gray-900 truncate max-w-[180px]">{title}</p>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        disabled={loading}
                        className="p-1.5 rounded-full hover:bg-gray-200 disabled:opacity-50"
                    >
                        <ShareIcon className="w-4 h-4" />
                    </button>
                    <button
                        disabled={loading}
                        onClick={() => handleDelete(contentId)}
                        className="p-1.5 rounded-full hover:bg-gray-200 disabled:opacity-50"
                    >
                        <DeleteIcon className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Content Section */}
            <div className="flex-grow flex items-center justify-center bg-white p-4">
                <div className="w-full h-64 rounded-md overflow-hidden border border-gray-100 flex items-center justify-center bg-gray-50">
                    {type === "youtube" && youtubeId && (
                        <iframe
                            className="w-full h-full"
                            src={`https://www.youtube.com/embed/${youtubeId}`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                    )}

                    {type === "twitter" && (
                        <blockquote className="twitter-tweet w-full h-full overflow-auto">
                            <a href={link}></a>
                        </blockquote>
                    )}

                    {type === "document" && (
                        <iframe
                            src={link.replace("view?usp=sharing", "preview")}
                            className="w-full h-full border-none"
                        ></iframe>
                    )}

                    {type === "text" && (
                        <p className="text-gray-700 text-sm p-2 whitespace-pre-wrap text-center">
                            {link}
                        </p>
                    )}
                </div>
            </div>
        </div>

    );
}
