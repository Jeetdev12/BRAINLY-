
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import {
  X,
  Youtube,
  Linkedin,
  Instagram,
  FileText,
  NotebookPen,
  Briefcase,
  Quote,
  Link2,
  Loader2,
  Sparkles,
} from "lucide-react";

export const ContentType = {
  Youtube: "youtube",
  LinkedIn: "linkedin",
  Instagram: "instagram",
  Job: "job",
  Document: "document",
  Notes: "notes",
  Quote: "quote",
};

const TYPE_CONFIG: Record<
  string,
  { icon: React.ReactNode; label: string; placeholder: string; color: string }
> = {
  youtube: {
    icon: <Youtube className="h-4 w-4" />,
    label: "YouTube",
    placeholder: "https://youtube.com/watch?v=...",
    color: "text-red-400",
  },
  linkedin: {
    icon: <Linkedin className="h-4 w-4" />,
    label: "LinkedIn",
    placeholder: "https://linkedin.com/posts/...",
    color: "text-blue-400",
  },
  instagram: {
    icon: <Instagram className="h-4 w-4" />,
    label: "Instagram",
    placeholder: "https://instagram.com/reel/...",
    color: "text-pink-400",
  },
  job: {
    icon: <Briefcase className="h-4 w-4" />,
    label: "Job",
    placeholder: "https://linkedin.com/jobs/... or any job link",
    color: "text-yellow-400",
  },
  document: {
    icon: <FileText className="h-4 w-4" />,
    label: "PDF / Doc",
    placeholder: "Paste a link to a PDF or document",
    color: "text-indigo-400",
  },
  notes: {
    icon: <NotebookPen className="h-4 w-4" />,
    label: "Note",
    placeholder: "",
    color: "text-green-400",
  },
  quote: {
    icon: <Quote className="h-4 w-4" />,
    label: "Quote",
    placeholder: "",
    color: "text-orange-400",
  },
};

function detectType(url: string): string | null {
  if (/youtube\.com|youtu\.be/.test(url)) return ContentType.Youtube;
  if (/linkedin\.com\/posts|linkedin\.com\/feed/.test(url)) return ContentType.LinkedIn;
  if (/instagram\.com/.test(url)) return ContentType.Instagram;
  if (/linkedin\.com\/jobs|indeed\.com|naukri\.com|glassdoor\.com/.test(url)) return ContentType.Job;
  if (/\.pdf$|arxiv\.org|docs\.google/.test(url)) return ContentType.Document;
  return null;
}

export default function CreateContentModal({
  open,
  closeModal,
}: {
  open: boolean;
  closeModal: () => void;
}) {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState<string>(ContentType.Youtube);
  const [noteText, setNoteText] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);
  const [autoDetected, setAutoDetected] = useState(false);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") closeModal(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [closeModal]);

  // Auto-detect type from link
  function handleLinkChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    const detected = detectType(val);
    if (detected) {
      setType(detected);
      setAutoDetected(true);
    } else {
      setAutoDetected(false);
    }
  }

  function showToast(msg: string, ok: boolean) {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3000);
  }

  async function addContent() {
    const title = titleRef.current?.value?.trim();
    const link = linkRef.current?.value?.trim();
    const token = localStorage.getItem("token");

    if (!title) return showToast("Please enter a title", false);
    if (type !== ContentType.Notes && type !== ContentType.Quote && !link)
      return showToast("Please enter a valid link", false);
    if ((type === ContentType.Notes || type === ContentType.Quote) && !noteText.trim())
      return showToast("Please enter some text", false);
    if (!token) return showToast("You must be logged in", false);

    try {
      setLoading(true);
      const payload =
        type === ContentType.Notes || type === ContentType.Quote
          ? { title, content: noteText, type }
          : { title, link, type };

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/addcontent`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200 || response.statusText === "OK") {
        showToast("Saved to your Second Brain!", true);
        if (titleRef.current) titleRef.current.value = "";
        if (linkRef.current) linkRef.current.value = "";
        setNoteText("");
        setAutoDetected(false);
        setTimeout(closeModal, 1200);
      }
    } catch (err: any) {
      showToast(err.message || "Error adding content", false);
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  const isTextType = type === ContentType.Notes || type === ContentType.Quote;
  const activeConfig = TYPE_CONFIG[type];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={closeModal}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md z-10 rounded-2xl border border-white/[0.07] bg-gray-950 shadow-2xl overflow-hidden">

        {/* Top gradient bar */}
        <div className="h-px w-full bg-gradient-to-r from-blue-500/0 via-blue-500/60 to-yellow-500/60" />

        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-yellow-500">
              <Sparkles className="h-3.5 w-3.5 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white leading-none">Save to Brain</h2>
              <p className="text-[10px] text-white/30 mt-0.5">Links, notes, quotes — anything</p>
            </div>
          </div>
          <button
            onClick={closeModal}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-white/30 hover:text-white hover:bg-white/[0.06] transition-all"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="px-5 pb-5 space-y-4">
          {/* Type Selector */}
          <div>
            <label className="text-[10px] font-medium text-white/30 uppercase tracking-widest mb-2 block">
              Content Type
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {Object.entries(TYPE_CONFIG).map(([value, config]) => (
                <button
                  key={value}
                  onClick={() => { setType(value); setAutoDetected(false); }}
                  className={`
                    flex flex-col items-center gap-1 rounded-xl py-2.5 px-1 text-[10px] font-medium border transition-all
                    ${type === value
                      ? "border-white/15 bg-white/[0.06] text-white"
                      : "border-transparent text-white/30 hover:text-white/60 hover:bg-white/[0.03]"
                    }
                  `}
                >
                  <span className={type === value ? config.color : ""}>{config.icon}</span>
                  {config.label}
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="text-[10px] font-medium text-white/30 uppercase tracking-widest mb-1.5 block">
              Title
            </label>
            <input
              ref={titleRef}
              placeholder="Give it a name you'll remember..."
              className="w-full rounded-xl border border-white/[0.07] bg-white/[0.03] px-3.5 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/40 focus:bg-white/[0.05] transition-all"
            />
          </div>

          {/* Link or Text */}
          {!isTextType ? (
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[10px] font-medium text-white/30 uppercase tracking-widest">
                  Link
                </label>
                {autoDetected && (
                  <span className={`text-[10px] font-medium flex items-center gap-1 ${activeConfig.color}`}>
                    <Sparkles className="h-2.5 w-2.5" /> Auto-detected
                  </span>
                )}
              </div>
              <div className="relative">
                <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/20" />
                <input
                  ref={linkRef}
                  onChange={handleLinkChange}
                  placeholder={activeConfig.placeholder}
                  className="w-full rounded-xl border border-white/[0.07] bg-white/[0.03] pl-9 pr-3.5 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/40 focus:bg-white/[0.05] transition-all"
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="text-[10px] font-medium text-white/30 uppercase tracking-widest mb-1.5 block">
                {type === ContentType.Quote ? "Quote Text" : "Note Content"}
              </label>
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                rows={4}
                placeholder={
                  type === ContentType.Quote
                    ? "Paste the quote here..."
                    : "Write your thoughts..."
                }
                className="w-full rounded-xl border border-white/[0.07] bg-white/[0.03] px-3.5 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/40 focus:bg-white/[0.05] transition-all resize-none"
              />
            </div>
          )}

          {/* Submit */}
          <button
            onClick={addContent}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-yellow-500 py-2.5 text-sm font-semibold text-white hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Save to Second Brain
              </>
            )}
          </button>
        </div>

        {/* Bottom gradient bar */}
        <div className="h-px w-full bg-gradient-to-r from-yellow-500/60 via-blue-500/60 to-blue-500/0" />
      </div>

      {/* Toast */}
      {toast && (
        <div
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium shadow-xl transition-all
            ${toast.ok
              ? "border-green-500/20 bg-green-500/10 text-green-400"
              : "border-red-500/20 bg-red-500/10 text-red-400"
            }`}
        >
          {toast.msg}
        </div>
      )}
    </div>
  );
}
