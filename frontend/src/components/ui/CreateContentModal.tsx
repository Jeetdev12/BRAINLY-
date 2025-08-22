import { useRef, useState } from "react"
import CrossIcon from "../../icons/CrossIcon"
import { Input } from "../Input"
import { Button } from "./Button"
import axios from "axios"
import { BACKEND_URL } from "../../utilis/config"

enum ContentType{
    Youtube="youtube",
    Twitter = "twitter",
}

export default function CreateContentModal({open, closeModal }) {
      const titleRef = useRef<HTMLInputElement>(null)
      const linkRef = useRef<HTMLInputElement>(null)
      const [type, setType] = useState(ContentType.Youtube)

      async function addContent() {
        const title = titleRef.current?.value;
        const link =  linkRef.current?.value;
        console.log(link)
        const response = await axios.post(`${BACKEND_URL}/api/v1/content`, {
            title,
            link,
            type 
        },{
           headers:{ Authorization:localStorage.getItem("token")}
        })
     closeModal()
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
                            <Input placeholder={"title"} reference={titleRef} />
                            <Input placeholder={"link"} reference={linkRef} />
                        </div>
                        <div className="flex">
                            <Button onClick={() => setType(ContentType.Youtube)} text={"Youtube"} varient={type === ContentType.Youtube ? "Primary" : "Secondary"} startIcon={undefined}/>
                            <Button onClick={() => setType(ContentType.Twitter)} text={"Twitter"} varient={type === ContentType.Twitter ? "Primary" : "Secondary"} startIcon={undefined}/>
                        </div>
                        <div className="flex justify-center">
                            <Button onClick={addContent} text={"add content"} varient="Primary" startIcon={undefined}  />
                        </div>
                    </span>
                </div>
            </div>

            </div>
            }
        </div>
    )
}


