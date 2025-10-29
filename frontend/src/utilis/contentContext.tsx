import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import axios from "axios";

interface Content {
  _id: string;
  title: string;
  link: string;
  type: string;
  userId: string;
  tags: string[];
}

interface ContentContextType {
  contents: Content[];
  type: string;
  setType: (type: string) => void;
  refresh: () => Promise<void>;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [contents, setContents] = useState<Content[]>([]);
  const [type, setType] = useState<string>("");
    const [loading, setLoading] = useState(true);


  const token = localStorage.getItem("token");

  async function refresh() {
    try {
      setLoading(true);
      console.log("type2", type)
      const url = type
        ? `${import.meta.env.VITE_BACKEND_URL}/api/v1/filter/type?type=${type}`
        : `${import.meta.env.VITE_BACKEND_URL}/api/v1/content`;

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response)
      setContents(response.data.content || []);
    } catch (err: any) {
      console.error("Error fetching content:", err.message);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    refresh();
  }, [type]);

  return (
    <ContentContext.Provider value={{ contents, type, setType, refresh }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error("useContent must be used within a ContentProvider");
  }
  return context;
}
