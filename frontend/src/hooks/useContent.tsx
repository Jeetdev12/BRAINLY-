import axios from "axios"
import { useEffect, useState } from "react"

export interface Content {
  _id: string
  title: string
  link?: string
  content?: string
  type: string
  userId: string
  tags: string[]
  readLater: boolean
  createdAt: string
  updatedAt?: string
}

export function useContent() {
  const [contents, setContents] = useState<Content[]>([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState<string | null>(null)

  const fetchContent = async (filterType?: string) => {
    const token = localStorage.getItem("token")

    if (!token) {
      setError("Not authenticated")
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)

      const url = filterType
        ? `${import.meta.env.VITE_BACKEND_URL}/api/v1/filter/type?type=${filterType}`
        : `${import.meta.env.VITE_BACKEND_URL}/api/v1/content`

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      })

      setContents(response.data.content || [])
    } catch (err: any) {
      if (err.response?.status === 401) {
        localStorage.removeItem("token")
        window.location.href = "/signin"
      }
      setError(err.response?.data?.message || err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchContent()
  }, [])

  return {
    contents,
    setContents,
    loading,
    error,
    refresh: fetchContent,
  }
}