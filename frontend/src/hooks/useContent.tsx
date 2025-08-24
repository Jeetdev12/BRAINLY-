import axios from "axios";
import { BACKEND_URL } from "../utilis/config";
import { useEffect, useState } from "react";



export function useContent() {
    const [contents, setContent] = useState<any>([])


    async function refresh() {
        try {
            const response = await axios.get(`${BACKEND_URL}/api/v1/content`, {
                headers: { Authorization: localStorage.getItem("token") }
            })
            setContent(response.data.content)
        } catch (error: any) {
            return error.message
        }
    }

    useEffect(() => {
        refresh()
        // let Interval = setInterval(() => {
        //     refresh()
        // }, 10 * 1000)

        // return () => {
        //     clearInterval(Interval);
        // }

    }, [])

    return { contents, refresh }
}