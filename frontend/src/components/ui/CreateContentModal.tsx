import { useRef, useState } from "react"
import CrossIcon from "../../icons/CrossIcon"
import { Input } from "../Input"
import { Button } from "./Button"
import axios from "axios"
import { BACKEND_URL } from "../../utilis/config"

enum ContentType {
    Youtube = "youtube",
    Twitter = "twitter",
    Document = "document",
}


export default function CreateContentModal({ open, closeModal }: { open: boolean, closeModal: () => void }) {
    const titleRef = useRef<HTMLInputElement>(null)
    const linkRef = useRef<HTMLInputElement>(null)
    const [type, setType] = useState(ContentType.Youtube)

    async function addContent() {

        if(!titleRef || !linkRef) return ;
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;
        console.log(link)

        try {
                
            if(!title || !link) return
            const response: any = await axios.post(`${BACKEND_URL}/api/v1/content`, {
                title,
                link,
                type
            }, {
                headers: { Authorization: localStorage.getItem("token") }
            })

            if (response.statusText == 'OK') {
                alert("Content added successfully...")
            }
            console.log("response:", response)
            closeModal()

        } catch (err: any) {
            console.log("Error occured while adding content ", err.message)
        }

    }

    return (
        <div>
            {open && <div>
                <div className="min-h-screen min-w-screen top-0 left-0 fixed bg-slate-500 opacity-60 flex items-center justify-center">

                </div>
                <div className="min-h-screen min-w-screen top-0 left-0 fixed flex items-center justify-center">
                    <div className="flex flex-cols justify-center p-4">
                        <span className=" bg-white p-2">
                            <div className="flex justify-end">
                                <div onClick={closeModal} className="  flex cursor-pointer gap-12  p-1">
                                    Add Content     <div className="hover:bg-slate-200"><CrossIcon /></div>
                                </div>

                            </div>
                            <div className="pl-4 w-full pt-2">
                                <Input placeholder={"Enter title here"} reference={titleRef} required/>
                                <Input placeholder={"Enter link of content "} reference={linkRef} required/>
                            </div>
                            <div className="grid grid-cols-2">
                                <Button onClick={() => setType(ContentType.Youtube)} text={"Youtube"} variant={type === ContentType.Youtube ? "Primary" : "Secondary"} startIcon={undefined} />
                                <Button onClick={() => setType(ContentType.Twitter)} text={"Twitter"} variant={type === ContentType.Twitter ? "Primary" : "Secondary"} startIcon={undefined} />
                                <Button onClick={() => setType(ContentType.Document)} text={"Document"} variant={type === ContentType.Document ? "Primary" : "Secondary"} startIcon={undefined} />

                            </div>
                            <div className="flex justify-center">
                                <Button onClick={addContent} text={"Submit"} variant="Primary" startIcon={undefined} />
                            </div>
                        </span>
                    </div>
                </div>

            </div>
            }
        </div>
    )
}


