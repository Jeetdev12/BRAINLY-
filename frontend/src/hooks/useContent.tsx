import axios from "axios";
import { useEffect, useState } from "react";

export interface Content {
  _id: string;
  title: string;
  link: string;
  type: string;
  userId: string;
  tags: string[];
  __v?: number;
}

export interface UseContentResult {
  contents: Content[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export function useContent() {
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
   const [collection, setCollection] = useState<any>([])
  const [type, setType] = useState<any>()


  const token = localStorage.getItem("token");

  const fetchContent = async () => {
    if (!token) {
      setError("No token found, please login first.");
      setLoading(false);
      return;
    }

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
      setError(null);
    } catch (err: any) {
      console.error("Error fetching content:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCollection(contents)
    console.log("contentsuse", contents)
  }, [contents])

  useEffect(() => {
    fetchContent();
    console.log("settype", type)
  }, [type]);

  return {collection, contents, loading, error, type, setType, refresh: fetchContent };
}
