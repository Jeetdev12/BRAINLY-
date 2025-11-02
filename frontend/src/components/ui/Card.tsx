import axios from "axios";
import { useContent } from "../../hooks/useContent";
import { useEffect, useState, type JSX } from "react";
import toast from "react-hot-toast";
import { DeleteIcon } from "../../icons/DeleteIcon";
import { ShareIcon } from "../../icons/ShareIcon";
import { TwitterIcon } from "../../icons/TwitterIcon";
import { YoutubeIcon } from "../../icons/YoutubeIcon";
import { Document } from "../../icons/Documents";
import { BookOpen, Linkedin } from "lucide-react";

interface CardProps {
    title: string;
    link: string;
    type: "youtube" | "twitter" | "document" | "notes" | "text" | "linkedin" | "null";
    contentId?: string;
}

export default function Card({ title, link, type, contentId }: CardProps) {
    const [loading, setLoading] = useState(false);
    const { refresh } = useContent();


    console.log("card console:", title, link, type, contentId)

    // Extract YouTube video ID safely
    const youtubeMatch = link?.match(
        /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]+)/
    );
    const youtubeId = youtubeMatch ? youtubeMatch[1] : "";

    function extractLinkedInId(url: string): string {
        const match = url.match(/linkedin\.com\/posts\/([^/?]+)/);
        return match ? match[1] : "";
    }


    // Ensure Twitter embed loads properly
    useEffect(() => {
        if ((window as any).twttr && type === "twitter") {

            (window as any).twttr.widgets.load();
            console.log("windows link x:", link)
        }


    }, [type, link]);

    async function handleDelete(contentId?: string) {
        if (!contentId) return;
        const confirmDelete = confirm("Are you sure you want to delete this content?");
        if (!confirmDelete) return;

        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Unauthorized: Please log in again");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.delete(
                `${import.meta.env.VITE_BACKEND_URL}/api/v1/delete-content`,
                {
                    data: { contentId },
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            toast.success("Content deleted successfully!");
            console.log("Deleted:", response.data);
            await refresh();
        } catch (err) {
            console.error("Delete error:", err);
            toast.error("Failed to delete content");
        } finally {
            setLoading(false);
        }
    }

    const icons: Record<string, JSX.Element> = {
        youtube: <YoutubeIcon />,
        twitter: <TwitterIcon />,
        document: <Document />,
        notes: <BookOpen />,
        linkedin: <Linkedin />,
    };

    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-md w-full max-w-md overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 py-3 px-4 bg-gray-50">
                <div className="flex items-center gap-2 text-gray-700">
                    {icons[type]}
                    <p className="font-medium text-gray-900 truncate max-w-[180px] w-35">
                        {title}
                    </p>
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
                        <DeleteIcon className="w-4 h-4 text-red-500" />
                    </button>
                </div>
            </div>

            {/* Content Section */}
            <div className="flex-grow flex items-center justify-center bg-white p-4">
                <div className="w-full h-68  rounded-md overflow-auto border border-gray-100 flex items-center justify-center bg-gray-50 ">
                    {loading && (
                        <div className="animate-spin text-gray-600">Deleting...</div>
                    )}

                    {!loading && type === "youtube" && youtubeId && (
                        <iframe
                            className="w-full h-full"
                            src={`https://www.youtube.com/embed/${youtubeId}`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    )}

                    {!loading && type === "twitter" && (
                        <div className="pt-16 w-full">
                            <blockquote className="twitter-tweet w-full h-full ">
                                <a href={link.replace("x.com", "twitter.com")}></a>
                            </blockquote>
                        </div>
                    )}

                    {!loading && type === "document" && (
                        <iframe
                            src={link.replace("view?usp=sharing", "preview")}
                            className="w-full h-full border-none"
                        ></iframe>
                    )}

                    {!loading && type === "notes" && (
                        <div className="overflow-y-auto max-h-64 w-full p-3 text-center">
                            <p className="text-gray-700 text-sm whitespace-pre-wrap break-words">
                                {link
                                    ?.split(/(\s+)/)
                                    .map((word, i) =>
                                        /^https?:\/\//.test(word) ? (
                                            <a
                                                key={i}
                                                href={word}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 underline hover:text-blue-800"
                                            >
                                                {word}
                                            </a>
                                        ) : (
                                            word
                                        )
                                    ) || "Hello ..........."}
                            </p>
                        </div>
                    )}

                   
                    {!loading && type === "linkedin" && (
                        <div className="w-full h-64 flex items-center justify-center bg-gray-50">
                            <iframe
                                src={`https://www.linkedin.com/embed/feed/update/${extractLinkedInId(link)}`}
                                height="100%"
                                width="100%"
                                frameBorder="0"
                                allowFullScreen
                                title="LinkedIn Post"
                            ></iframe>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
