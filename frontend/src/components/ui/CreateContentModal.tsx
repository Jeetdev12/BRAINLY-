import { useRef, useState } from "react";
import CrossIcon from "../../icons/CrossIcon";
import { Input } from "../Input";
import { Button } from "./Button";
import axios from "axios";
export const  ContentType = {
  Youtube : "youtube",
  Twitter : "twitter",
  Document : "document",
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
  const [type, setType] = useState<any>(ContentType.Youtube);
  const [loading, setLoading] = useState(false);

  async function addContent() {
    const title = titleRef.current?.value?.trim();
    const link = linkRef.current?.value?.trim();
    const token = localStorage.getItem("token");

    if (!title || !link) {
      alert("Please fill in all fields");
      return;
    }

    if (!token) {
      alert("You must be logged in to add content");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.BACKEND_URL}/api/v1/addcontent`,
        { title, link, type },
        {
          headers: { authorization: `${token}` }, // lowercase key for Express
        }
      );

      if (response.status === 200 || response.statusText === "OK") {
        alert("✅ Content added successfully!");
        titleRef.current!.value = "";
        linkRef.current!.value = "";
        closeModal();
      }
    } catch (err: any) {
      console.error("❌ Error while adding content:", err);
      alert(err.response?.data?.message || "Error adding content");
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={closeModal}
      ></div>

      {/* Modal content */}
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

        {/* Inputs with Labels */}
        <div className="space-y-4 mb-4">
          <div className="flex flex-col text-left">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Title
            </label>
            <Input
              placeholder="Enter a descriptive title"
              reference={titleRef}
              required
            />
          </div>

          <div className="flex flex-col text-left">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Link
            </label>
            <Input
              placeholder="Paste your YouTube / Twitter / Document link"
              reference={linkRef}
              required
            />
          </div>
        </div>

        {/* Type Selection */}
        <div className="mb-6">
          <label className="text-sm font-medium text-gray-600 mb-2 block">
            Content Type
          </label>
          <div className="grid grid-cols-3 gap-2">
            <Button
              onClick={() => setType(ContentType.Youtube)}
              text="YouTube"
              variant={type === ContentType.Youtube ? "Primary" : "Secondary"}
            />
            <Button
              onClick={() => setType(ContentType.Twitter)}
              text="Twitter"
              variant={type === ContentType.Twitter ? "Primary" : "Secondary"}
            />
            <Button
              onClick={() => setType(ContentType.Document)}
              text="Document"
              variant={type === ContentType.Document ? "Primary" : "Secondary"}
            />
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
