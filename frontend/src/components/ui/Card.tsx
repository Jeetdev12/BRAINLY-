import axios from "axios";
import { useContent } from "../../hooks/useContent";
import { useEffect, useMemo, useState, type JSX } from "react";
import toast from "react-hot-toast";
import { DeleteIcon } from "../../icons/DeleteIcon";
import { ShareIcon } from "../../icons/ShareIcon";
import { TwitterIcon } from "../../icons/TwitterIcon";
import { YoutubeIcon } from "../../icons/YoutubeIcon";
import { Document } from "../../icons/Documents";
import { BookOpen, Linkedin } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

interface CardProps {
  title: string;
  link: string;
  type: "youtube" | "twitter" | "document" | "notes" | "text" | "linkedin" | "null";
  contentId?: string;
  createdAt?: string;
}

export default function Card({ title, link, type, contentId, createdAt }: CardProps) {
  const [loading, setLoading] = useState(false);
  const { refresh } = useContent();

  // ✅ Precompute derived data with useMemo
  const youtubeId = useMemo(() => {
    const match = link?.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]+)/);
    return match ? match[1] : "";
  }, [link]);

  const linkedinId = useMemo(() => {
    const match = link?.match(/linkedin\.com\/posts\/([^/?]+)/);
    return match ? match[1] : "";
  }, [link]);

  // ✅ Load Twitter widgets once when needed
  useEffect(() => {
    if ((window as any).twttr && type === "twitter") {
      (window as any).twttr.widgets.load();
    }
  }, [type, link]);

  const icons: Record<string, JSX.Element> = {
    youtube: <YoutubeIcon />,
    twitter: <TwitterIcon />,
    document: <Document />,
    notes: <BookOpen />,
    linkedin: <Linkedin />,
  };

  const handleDelete = async () => {
    if (!contentId) return;
    if (!confirm("Are you sure you want to delete this content?")) return;

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Unauthorized: Please log in again");
      return;
    }

    try {
      setLoading(true);
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/v1/delete-content`, {
        data: { contentId },
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Content deleted successfully!");
      await refresh();
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Failed to delete content");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-md w-full max-w-md overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-200">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 py-3 px-4 bg-gray-50">
        <div className="flex items-center gap-2 text-gray-700 truncate">
          {icons[type]}
          <p
            className="font-medium text-gray-900 truncate max-w-[200px]"
            title={title}
          >
            {title}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            disabled={loading}
            className="p-1.5 rounded-full hover:bg-gray-200 disabled:opacity-50"
            onClick={() => navigator.share?.({ title, url: link })}
            title="Share"
          >
            <ShareIcon className="w-4 h-4" />
          </button>
          <button
            disabled={loading}
            onClick={handleDelete}
            className="p-1.5 rounded-full hover:bg-gray-200 disabled:opacity-50"
            title="Delete"
          >
            <DeleteIcon className="w-4 h-4 text-red-500" />
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-grow flex items-center justify-center bg-white p-4 relative">
        {loading ? (
          <div className="flex flex-col items-center text-gray-500 animate-pulse">
            <span className="text-sm">Deleting...</span>
          </div>
        ) : (
          <div className="w-full h-68 rounded-md overflow-hidden border border-gray-100 flex items-center justify-center bg-gray-50">
            {type === "youtube" && youtubeId && (
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${youtubeId}`}
                title="YouTube video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}

            {type === "twitter" && (
              <blockquote className="twitter-tweet w-full h-full">
                <a href={link.replace("x.com", "twitter.com")}></a>
              </blockquote>
            )}

            {type === "document" && (
              <iframe
                src={link.replace("view?usp=sharing", "preview")}
                className="w-full h-full border-none"
              ></iframe>
            )}

            {type === "notes" && (
              <div className="overflow-y-auto max-h-64 w-full p-3 text-left">
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
                    ) || "No notes available..."}
                </p>
              </div>
            )}

            {type === "linkedin" && linkedinId && (
              <iframe
                src={`https://www.linkedin.com/embed/feed/update/${linkedinId}`}
                height="100%"
                width="100%"
                frameBorder="0"
                allowFullScreen
                title="LinkedIn Post"
              ></iframe>
            )}

            {!youtubeId && !link && type !== "notes" && (
              <p className="text-gray-400 text-sm italic">No content available</p>
            )}
          </div>
        )}
      </div>

      {/* Footer Time */}
      <div className="text-gray-500 text-xs flex items-center justify-start pl-4 pb-3">
        
        {dayjs(createdAt).format("h:mm A · MMM D, YYYY")}
      </div>
    </div>
  );
}
