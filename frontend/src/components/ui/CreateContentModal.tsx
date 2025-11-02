import { useRef, useState } from "react";
import CrossIcon from "../../icons/CrossIcon";
import { Input } from "../Input";
import { Button } from "./Button";
import axios from "axios";

export const ContentType = {
  Youtube: "youtube",
  Twitter: "twitter",
  Document: "document",
  Notes: "notes",
  LinkedIn: "linkedin",
  Email: "email",
};

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
  const [noteText, setNoteText] = useState<string>("");
  const [loading, setLoading] = useState(false);

  async function addContent() {
    const title = titleRef.current?.value?.trim();
    const link = linkRef.current?.value?.trim();
    const token = localStorage.getItem("token");

    if (!title) {
      alert("Please enter a title");
      return;
    }

    if (type !== ContentType.Notes && !link) {
      alert("Please enter a valid link");
      return;
    }

    if (type === ContentType.Notes && !noteText.trim()) {
      alert("Please enter some text for your note");
      return;
    }

    if (!token) {
      alert("You must be logged in to add content");
      return;
    }

    try {
      setLoading(true);
      const payload =
        type === ContentType.Notes
          ? { title, content: noteText, type }
          : { title, link, type };

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/addcontent`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("response12", response, noteText)

      if (response.status === 200 || response.statusText === "OK") {
        alert("✅ Content added successfully!");
        if (titleRef.current) titleRef.current.value = "";
        if (linkRef.current) linkRef.current.value = "";
        setNoteText("");
        closeModal();

        setNoteText("");
        closeModal();
      }
    } catch (err: any) {
      console.error("❌ Error while adding content:", err);
      alert(err.message || "Error adding content");
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={closeModal}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-2xl p-6 w-[90%] max-w-md z-10 animate-fadeIn">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Add New Content
          </h2>
          <button
            onClick={closeModal}
            className="p-1.5 rounded-full hover:bg-gray-100 transition"
          >
            <CrossIcon />
          </button>
        </div>

        {/* Inputs */}
        <div className="space-y-4 mb-4">
          <div className="flex flex-col text-left">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Title
            </label>
            <Input placeholder="Enter a descriptive title" reference={titleRef} required />
          </div>

          {/* Conditional Link or Notes Field */}
          {type !== ContentType.Notes ? (
            <div className="flex flex-col text-left">
              <label className="text-sm font-medium text-gray-600 mb-1">
                Link
              </label>
              <Input
                placeholder="Paste your YouTube / Twitter / LinkedIn / Email link"
                reference={linkRef}
                required
              />
            </div>
          ) : (
            <div className="flex flex-col text-left">
              <label className="text-sm font-medium text-gray-600 mb-1">
                Note Content
              </label>
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 focus:ring focus:ring-indigo-200"
                placeholder="Write your note here..."
                rows={4}
              />
            </div>
          )}
        </div>

        {/* Type Selection */}
        <div className="mb-6">
          <label className="text-sm font-medium text-gray-600 mb-2 block">
            Content Type
          </label>
          <div className="grid grid-cols-3 gap-2">
            {Object.entries(ContentType).map(([key, value]) => (
              <Button
                key={key}
                onClick={() => setType(value)}
                text={key}
                variant={type === value ? "Primary" : "Secondary"}
              />
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-center">
          <Button
            onClick={addContent}
            text={loading ? "Submitting..." : "Submit"}
            variant="Primary"
            disabled={loading}
          />
        </div>
      </div>
    </div>
  );
}
